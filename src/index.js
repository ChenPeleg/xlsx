import { runApp } from "./core/xlsx-main.js";

async function main() {
  await runApp(null, { tempDir: "temp", outDir: "out" });
  console.log("success!");
}

main();
