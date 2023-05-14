import { main } from "./core/xlsx-main.js";

async function example() {
  await main({ name: "empty", sheets: [] }, { tempDir: "temp", outDir: "out" });
  console.log("success!");
}

example();
