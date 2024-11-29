import * as core from "@actions/core";
import { getInputs, performLogic } from "./utils";

export async function execute(): Promise<void> {
  const inputs = getInputs();
  const result = performLogic(inputs);
  core.setOutput("bool3", result);
}

async function run(): Promise<void> {
  try {
    await execute();
  } catch (error) {
    core.setFailed(
      `Action failed with error: ${error instanceof Error ? error.message : error}`,
    );
  }
}

void run();
