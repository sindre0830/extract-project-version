# [Action Name]

[Provide a concise description of what this GitHub Action does.]

---

## Usage Guide

To use this action in your workflow, reference it in a step using the `uses` keyword followed by the action reference `your-organization/your-action-name@v1`. Here's an example of how to include it in a workflow:

```yaml
name: Example Workflow

on:
  push:
    branches:
      - main

jobs:
  example_job:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Use this action
        uses: your-organization/your-action-name@v1
        with:
          input_name: "example"
```

---

### Inputs

| Name          | Description                           | Type     | Default/Required |
|---------------|---------------------------------------|----------|------------------|
| `input_name`  | [Description of the input]            | `string` | Required         |
| `another_input` | [Description of another input]       | `string` | `default_value`  |

---

### Outputs

| Name           | Description                         |
|----------------|-------------------------------------|
| `output_name`  | [Description of the output]         |
| `another_output` | [Description of another output]    |

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
