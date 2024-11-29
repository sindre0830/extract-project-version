import * as core from "@actions/core";
import { ActionInputs } from "./types";

export function getInputs(): ActionInputs {
  return {
    bool1: core.getBooleanInput("bool1"),
    bool2: core.getBooleanInput("bool2"),
  };
}

export function performLogic(inputs: ActionInputs): boolean {
  return inputs.bool1 === inputs.bool2;
}
