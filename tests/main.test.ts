import * as core from "@actions/core";
import { execute } from "../src/main";
import { getInputs } from "../src/utils";

jest.mock("@actions/core");
jest.mock("../src/utils", () => ({
  ...jest.requireActual("../src/utils"),
  getInputs: jest.fn(),
}));

describe("Main orchestration (execute)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should execute main logic and set output based on inputs", async () => {
    (getInputs as jest.Mock).mockReturnValue({ bool1: true, bool2: false });

    await execute();

    expect(core.setOutput).toHaveBeenCalledWith("bool3", false);
  });

  it("should set output to true when bool1 and bool2 are the same", async () => {
    (getInputs as jest.Mock).mockReturnValue({ bool1: true, bool2: true });

    await execute();

    expect(core.setOutput).toHaveBeenCalledWith("bool3", true);
  });
});
