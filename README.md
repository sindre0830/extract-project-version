# Extract Project Version

**Extract Project Version** is a versatile GitHub Action designed to extract version information from project files, such as `.csproj` and `package.json`, using predefined patterns. It also supports custom regex for other file types, making it adaptable to a wide range of project setups.

This action is particularly useful in release workflows, where it ensures that the version defined in your project file has been properly updated before proceeding with tagging or deployment. By automating this step, it helps enforce versioning standards, reduces the risk of errors, and simplifies the release process.

## Motivation

This action was created to address the challenges of enforcing consistent versioning in project files, particularly in environments with strict branch policies. In many organizations, it’s not always feasible to allow GitHub Actions to bypass these policies, making manual checks for version updates both error-prone and time-consuming.

With this action, teams can automatically verify that the project file version matches the new tag being created. This ensures that proper versioning practices are followed, reducing the risk of oversight and streamlining release workflows where accuracy and consistency are essential.

---

## Usage Guide

To use this action in your workflow, reference it in a step using the `uses` keyword followed by the action reference `sindre0830/extract-project-version@v1`. Here's an example of how to include it in a workflow:

```yaml
name: Release Workflow

on:
  push:
    tags:
      - 'v*'

jobs:
  verify:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Extract version from project file
        id: get-version
        uses: sindre0830/extract-project-version@v1
        with:
          file_path: './path/to/project.csproj'
          regex: '<Version>(.*?)</Version>' # optional custom regex

      - name: Verify version matches the tag
        run: |
          if [[ "${{ github.ref }}" != "refs/tags/v${{ steps.get-version.outputs.version }}" ]]; then
            echo "Version mismatch: Expected ${{ github.ref }} but found v${{ steps.get-version.outputs.version }}."
            exit 1
          fi
```

### Inputs

| Name        | Description                                                     | Type     | Default/Required |
|-------------|-----------------------------------------------------------------|----------|------------------|
| `file_path` | Path to the file containing the version information to extract. | `string` | Required         |
| `regex`     | Custom regex pattern to extract the version.                    | `string` | Optional         |

### Outputs

| Name      | Description                                                                                     |
|-----------|-------------------------------------------------------------------------------------------------|
| `version` | The version extracted from the specified project file. If the file is missing or the version cannot be found, the action will fail with an error. |

### Supported Project Files

The following project files are supported out of the box and do not require a custom regex:

| Project File   | Default Regex                   |
|----------------|---------------------------------|
| `*.csproj`     | `<Version>(.*?)<\/Version>`     |
| `package.json` | `"version":\s*"(.*?)"`          |

---

## Development Guide

### Prerequisites

- Node.js v23 or later

### Setup

1. Install dependencies:

   ```bash
   npm install
   npm i -g @vercel/ncc
   ```

### Commands

| Command         | Description                                         | Script                                                                                   |
|------------------|-----------------------------------------------------|------------------------------------------------------------------------------------------|
| `npm run build`  | Compiles TypeScript files and prepares the action for publishing. | `tsc && ncc build`                                                                       |
| `npm run test`   | Executes unit tests using Jest.                     | `jest --config config/jest.config.js`                                                    |
| `npm run lint`   | Fixes linting issues in the source and test directories. | `npx @biomejs/biome check --config-path ./config/biome.json --write ./src ./tests`       |
| `npm run lint-check` | Reports linting issues without making changes.      | `npx @biomejs/biome check --config-path ./config/biome.json ./src ./tests`               |

### Managing Dependencies

- To add a dependency:

  ```bash
  npm install package-name
  ```

- To add a development dependency:

  ```bash
  npm install package-name --save-dev
  ```

### Upgrading Node Packages

1. Update the package version in `package.json` or run:

   ```bash
   npm install package-name@latest
   ```

2. Reset `package-lock.json` if necessary:

   ```bash
   rm package-lock.json
   npm install
   ```

   This regenerates the lock file with the latest versions allowed by `package.json`.
