const { ESLint } = require("eslint");
const { resolve, join } = require("path");

const eslint = new ESLint({
  cwd: resolve(),
  resolvePluginsRelativeTo: join(__dirname, ".."),
  extensions: [".ts"]
});

eslint.lintFiles(process.argv[3]).then((results) => {
  let errorCount = 0;
  for (const result of results) {
    for (const message of result.messages) {
      errorCount++;
      console.error(`${result.filePath}:${message.line}:${message.column} ${message.message} (${message.ruleId})`);
    }
  }
  if (errorCount > 0) {
    process.exit(1);
  }
});