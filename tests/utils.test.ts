import * as fs from "fs";
import * as core from "@actions/core";
import type { ActionInputs } from "../src/types";
import { extractVersion, getInputs, getRegex } from "../src/utils";

jest.mock("@actions/core");
jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  readFileSync: jest.fn(),
}));

describe("Utils", () => {
  describe("getInputs", () => {
    it("should correctly parse inputs", () => {
      const mockPath = "./path/to/project.csproj";
      const mockRegex = "<Version>(.*?)</Version>";

      (core.getInput as jest.Mock)
        .mockReturnValueOnce(mockPath)
        .mockReturnValueOnce(mockRegex);

      const inputs: ActionInputs = getInputs();

      expect(inputs.filePath).toBe(mockPath);
      expect(inputs.regex).toBe(mockRegex);
      expect(core.getInput).toHaveBeenCalledWith("file_path", {
        required: true,
      });
      expect(core.getInput).toHaveBeenCalledWith("regex");
    });
  });

  describe("getRegex", () => {
    it("should return custom regex if provided", () => {
      const mockRegex = "<Version>(.*?)</Version>";
      const regex = getRegex("./path/to/project.csproj", mockRegex);

      expect(regex).toEqual(new RegExp(mockRegex));
    });

    it("should return default regex for .csproj files", () => {
      const regex = getRegex("./path/to/project.csproj", "");

      expect(regex).toEqual(/<Version>(.*?)<\/Version>/);
    });

    it("should return default regex for package.json files", () => {
      const regex = getRegex("./path/to/package.json", "");

      expect(regex).toEqual(/"version":\s*"(.*?)"/);
    });

    it("should throw an error for unsupported files without a custom regex", () => {
      expect(() => getRegex("./path/to/unknown.file", "")).toThrow(
        "No regex provided, and no default regex available for file: ./path/to/unknown.file",
      );
    });
  });

  describe("extractVersion", () => {
    it("should correctly extract version from .csproj file", () => {
      const mockFileContent = `
        <Project Sdk="Microsoft.NET.Sdk">
          <PropertyGroup>
            <Version>1.2.3</Version>
          </PropertyGroup>
        </Project>
      `;
      const mockPath = "./path/to/project.csproj";

      (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

      const regex = /<Version>(.*?)<\/Version>/;
      const version = extractVersion(mockPath, regex);

      expect(version).toBe("1.2.3");
      expect(fs.readFileSync).toHaveBeenCalledWith(mockPath, "utf8");
    });

    it("should throw an error if no version is found in .csproj file", () => {
      const mockFileContent = `
        <Project Sdk="Microsoft.NET.Sdk">
          <PropertyGroup>
            <!-- No version here -->
          </PropertyGroup>
        </Project>
      `;
      const mockPath = "./path/to/project.csproj";

      (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

      const regex = /<Version>(.*?)<\/Version>/;

      expect(() => extractVersion(mockPath, regex)).toThrow(
        `No version found in file: ${mockPath}`,
      );
    });

    it("should correctly extract version from package.json file", () => {
      const mockFileContent = `{
        "name": "example-package",
        "version": "1.2.3"
      }`;
      const mockPath = "./path/to/package.json";

      (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

      const regex = /"version":\s*"(.*?)"/;
      const version = extractVersion(mockPath, regex);

      expect(version).toBe("1.2.3");
      expect(fs.readFileSync).toHaveBeenCalledWith(mockPath, "utf8");
    });

    it("should throw an error if no version is found in package.json file", () => {
      const mockFileContent = `
        "name": "example-package"
      `;
      const mockPath = "./path/to/project.csproj";

      (fs.readFileSync as jest.Mock).mockReturnValue(mockFileContent);

      const regex = /"version":\s*"(.*?)"/;

      expect(() => extractVersion(mockPath, regex)).toThrow(
        `No version found in file: ${mockPath}`,
      );
    });

    it("should throw an error if the file cannot be read", () => {
      const mockPath = "./path/to/project.csproj";

      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error("File not found");
      });

      const regex = /<Version>(.*?)<\/Version>/;

      expect(() => extractVersion(mockPath, regex)).toThrow(
        `Failed to extract version from file: ${mockPath}. Error: File not found`,
      );
    });
  });
});
