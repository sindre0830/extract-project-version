import * as core from "@actions/core";
import { getInputs, getRegex, extractVersion } from "./utils";

export async function execute(): Promise<void> {
  const inputs = getInputs();
  const regex = getRegex(inputs.filePath, inputs.regex);

  const version = extractVersion(inputs.filePath, regex);

  core.setOutput("version", version);
}

async function run(): Promise<void> {
  try {
    await execute();
  } catch (error) {
    core.setFailed(`${error instanceof Error ? error.message : error}`);
  }
}

void run();
