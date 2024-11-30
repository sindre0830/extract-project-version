import * as fs from "fs";
import * as core from "@actions/core";
import type { ActionInputs } from "./types";

export function getInputs(): ActionInputs {
  return {
    filePath: core.getInput("file_path", { required: true }),
    regex: core.getInput("regex"),
  };
}

export function getRegex(filePath: string, regex: string): RegExp {
  if (regex != null && regex.length > 0) {
    return new RegExp(regex);
  }

  // determine regex based on file extension
  switch (true) {
    case filePath.endsWith(".csproj"):
      return /<Version>(.*?)<\/Version>/;

    case filePath.endsWith("package.json"):
      return /"version":\s*"(.*?)"/;

    default:
      throw new Error(
        `No regex provided, and no default regex available for file: ${filePath}`,
      );
  }
}

export function extractVersion(filePath: string, regex: RegExp): string {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");

    const match = fileContent.match(regex);
    if (match == null || match.length < 2) {
      throw new Error(`No version found in file: ${filePath}`);
    }

    return match[1];
  } catch (error) {
    throw new Error(
      `Failed to extract version from file: ${filePath}. Error: ${(error as Error).message}`,
    );
  }
}
