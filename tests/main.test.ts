import * as core from "@actions/core";
import { execute } from "../src/main";
import { getInputs, getRegex, extractVersion } from "../src/utils";

jest.mock("@actions/core");
jest.mock("../src/utils", () => ({
  ...jest.requireActual("../src/utils"),
  getInputs: jest.fn(),
  getRegex: jest.fn(),
  extractVersion: jest.fn(),
}));

describe("Main orchestration (execute)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should execute main logic and set output with the version", async () => {
    const mockInputs = {
      filePath: "./path/to/project.csproj",
      regex: "",
    };
    const mockRegex = /<Version>(.*?)<\/Version>/;
    const mockVersion = "1.2.3";

    (getInputs as jest.Mock).mockReturnValue(mockInputs);
    (getRegex as jest.Mock).mockReturnValue(mockRegex);
    (extractVersion as jest.Mock).mockReturnValue(mockVersion);

    await execute();

    expect(getInputs).toHaveBeenCalled();
    expect(getRegex).toHaveBeenCalledWith(
      mockInputs.filePath,
      mockInputs.regex,
    );
    expect(extractVersion).toHaveBeenCalledWith(mockInputs.filePath, mockRegex);
    expect(core.setOutput).toHaveBeenCalledWith("version", mockVersion);
  });

  it("should fail if no version is found", async () => {
    const mockInputs = {
      filePath: "./path/to/project.csproj",
      regex: "",
    };
    const mockRegex = /<Version>(.*?)<\/Version>/;

    (getInputs as jest.Mock).mockReturnValue(mockInputs);
    (getRegex as jest.Mock).mockReturnValue(mockRegex);
    (extractVersion as jest.Mock).mockImplementation(() => {
      throw new Error("No version found in file: ./path/to/project.csproj");
    });

    await expect(execute()).rejects.toThrow(
      "No version found in file: ./path/to/project.csproj",
    );

    expect(getInputs).toHaveBeenCalled();
    expect(getRegex).toHaveBeenCalledWith(
      mockInputs.filePath,
      mockInputs.regex,
    );
    expect(extractVersion).toHaveBeenCalledWith(mockInputs.filePath, mockRegex);
    expect(core.setOutput).not.toHaveBeenCalled();
  });

  it("should fail if an error occurs during execution", async () => {
    const mockInputs = {
      filePath: "./path/to/project.csproj",
      regex: "",
    };
    const mockRegex = /<Version>(.*?)<\/Version>/;

    (getInputs as jest.Mock).mockReturnValue(mockInputs);
    (getRegex as jest.Mock).mockReturnValue(mockRegex);
    (extractVersion as jest.Mock).mockImplementation(() => {
      throw new Error("File read error");
    });

    await expect(execute()).rejects.toThrow("File read error");

    expect(getInputs).toHaveBeenCalled();
    expect(getRegex).toHaveBeenCalledWith(
      mockInputs.filePath,
      mockInputs.regex,
    );
    expect(extractVersion).toHaveBeenCalledWith(mockInputs.filePath, mockRegex);
    expect(core.setOutput).not.toHaveBeenCalled();
  });
});
