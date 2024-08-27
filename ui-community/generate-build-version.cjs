const fs = require("fs");
const os = require("os");
const path = require("path");
require("dotenv").config();

function setEnvValue(key, value) {
  const filename = "./.env.local";
  if (fs.existsSync(filename)) {
    const ENV_VARS = fs.readFileSync(filename, "utf8").split(os.EOL);

    const target = ENV_VARS.indexOf(
      ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
      })
    );

    ENV_VARS.splice(target, 1, `${key}=${value}`);
    fs.writeFileSync(filename, ENV_VARS.join(os.EOL));
  }
}

// Read the current version from meta.json
const metaPath = path.join(__dirname, "public", "meta.json");
const metaData = require(metaPath);

const currentBuildVersion = process.env.VITE_BUILD_VERSION;
console.log("current build version: ", currentBuildVersion);
const environment = process.env.VITE_DEPLOYMENT_ENVIRONMENT;
if (environment === "local") {
  // Determine the desired version update type (default: patch)
  const updateType = process.argv[2] || "patch";
  console.log("update type: ", updateType);
  const versionParts = currentBuildVersion.split(".");
  let [major, minor, patch] = versionParts.map(Number);

  // Update the version based on the specified update type
  switch (updateType) {
    case "major":
      major++;
      minor = 0;
      patch = 0;
      break;
    case "minor":
      minor++;
      patch = 0;
      break;
    case "patch":
    default:
      patch++;
  }

  // Update the version in meta.json
  const newVersion = `${major}.${minor}.${patch}`;
  metaData.version = newVersion;
  //update .env.local with new version
  setEnvValue("VITE_BUILD_VERSION", newVersion);
  //update process.env with new version if necessary
  console.log(`Version updated from ${currentBuildVersion} to ${newVersion}`);
} else {
  metaData.version = currentBuildVersion;
}

fs.writeFileSync(metaPath, JSON.stringify(metaData, null, 2));
