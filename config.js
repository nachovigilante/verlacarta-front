const fs = require("fs");
const path = require("path");
const successColor = "\x1b[32m%s\x1b[0m";
const checkSign = "\u{2705}";
require("dotenv").config({ path: "src/.env" });

const envFile = `export const environment = {
    apiKey: '${process.env.MAPBOX_API_KEY}',
    backendUrl: '${process.env.BACKEND_URL}',
};
`;

const targetPath = path.join(__dirname, "./src/environments/environment.ts");

// First create the folder if it doesn't exist
if (!fs.existsSync(path.join(__dirname, "./src/environments"))) {
    fs.mkdirSync(path.join(__dirname, "./src/environments"));
}

// Then write the file
fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(
            successColor,
            `${checkSign} Successfully generated environment.development.ts`,
        );
    }
});
