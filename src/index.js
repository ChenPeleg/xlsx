import { runApp } from "./core/main.js";

async function main() {
  await runApp(null, { tempDir: "temp" });
  console.log("success!");
}

main();
