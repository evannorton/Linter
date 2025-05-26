const { ESLint } = require("eslint");
const { resolve, join } = require("path");

const eslint = new ESLint({
  cwd: resolve(join()),
  resolvePluginsRelativeTo: join(__dirname, ".."),
  fix: true
});

eslint.lintFiles(process.argv[3]).then((results) => {
  ESLint.outputFixes(results).then(() => {
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
});