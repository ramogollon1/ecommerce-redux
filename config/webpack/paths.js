const path = require("path");
const fs = require("fs");

const appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  appIndexJs: resolveApp("src/app/index.jsx"),
  appSrc: resolveApp("src/app"),
  appBuild: resolveApp("build"),
  appConfig: resolveApp("config"),
};
