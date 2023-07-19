/** @type {import("@commitlint/types").UserConfig} */
const config = {
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["chore", "docs", "feat", "fix", "refactor", "style", "test"],
    ],
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing",
        enum: {
          feat: {
            description: "A new feature",
            title: "Features",
          },
          fix: {
            description: "A bug fix",
            title: "Bug Fixes",
          },
          docs: {
            description: "Documentation only changes",
            title: "Documentation",
          },
          style: {
            description:
              "Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)",
            title: "Styles",
          },
          refactor: {
            description:
              "A code change that neither fixes a bug nor adds a feature",
            title: "Code Refactoring",
          },
          test: {
            description: "Adding missing tests or correcting existing tests",
            title: "Tests",
          },
          chore: {
            description: "Other changes that don't modify src or test files",
            title: "Chores",
          },
        },
      },
      scope: {
        description:
          "What is the scope of this change (e.g. component or file name)",
      },
      subject: {
        description:
          "Write a short, imperative tense description of the change",
      },
      body: {
        description: "Provide a longer description of the change",
      },
    },
  },
}

export default config
