# Extract Project Version

**Extract Project Version** is a flexible GitHub Action that extracts version information from project files, such as `.csproj` and `package.json`, using predefined patterns. It also allows users to specify custom regex for additional file types, making it adaptable to various project setups. Ideal for release workflows, this action ensures that the version in your project file has been properly updated before proceeding with tagging or deployment.

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

---

### Inputs

| Name        | Description                                                     | Type     | Default/Required |
|-------------|-----------------------------------------------------------------|----------|------------------|
| `file_path` | Path to the file containing the version information to extract. | `string` | Required         |
| `regex`     | Custom regex pattern to extract the version.                    | `string` | Optional         |

---

### Outputs

| Name      | Description                                                                                     |
|-----------|-------------------------------------------------------------------------------------------------|
| `version` | The version extracted from the specified project file. If the file is missing or the version cannot be found, the action will fail with an error. |

---

## Development Guide

### Prerequisites
- Node.js v23 or later.

### Setup
1. Install dependencies:
   ```bash
   npm install
   npm i -g @vercel/ncc
   ```

### Commands
- **Build the project**:
  ```bash
  npm run build
  ```
  Compiles TypeScript files and prepares the action for publishing.

- **Run tests**:
  ```bash
  npm run test
  ```
  Executes unit tests using Jest.

- **Format code**:
  ```bash
  npm run format
  ```
  Applies Prettier formatting to TypeScript files.

- **Check formatting**:
  ```bash
  npm run format-check
  ```
  Verifies that all TypeScript files follow the Prettier configuration.

- **Lint code**:
  ```bash
  npm run lint
  ```
  Fixes linting issues in the source and test directories.

- **Check for linting issues**:
  ```bash
  npm run lint-check
  ```
  Reports linting issues without making changes.

---

### Installing Dependencies
To install dependencies, use:
```bash
npm install package-name
```

To install as a dev dependency (used only during development):
```bash
npm install package-name --save-dev
```
**Use Case**: Dev dependencies are useful for tools like linters, formatters, and testing frameworks that are not required in production.

---

### Upgrading Node Packages
To upgrade a package and overwrite the `package-lock.json`:
1. Update the package version in `package.json` or run:
   ```bash
   npm install package-name@latest
   ```
2. If `package-lock.json` needs to be reset, run:
   ```bash
   rm package-lock.json
   npm install
   ```
   This regenerates the lock file with the latest versions allowed by `package.json`.
