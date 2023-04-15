import { run } from "node:test";
import path from "path";
import { readdir } from "fs";

function getConclusions(resultsAsText) {
  const resultArr = resultsAsText.split("\n");
  const resultRows = resultArr.slice(-9);

  const conclusions = {
    tests: "",
    pass: "",
    fail: "",
    cancelled: "",
    skipped: "",
    todo: "",
    duration_ms: "",
  };
  Object.keys(conclusions).forEach((key) => {
    const correspondingData = resultRows.find((r) => r.includes(`# ${key}`));
    if (correspondingData) {
      conclusions[key] = correspondingData.replace(`# ${key}`, "").trim();
    }
  });

  return { conclusionsText: resultRows.join("\n"), conclusions };
}

const reformatMainData = (text, passed) => {
  text = text.replace(/# tests[\s\S]*# todo/g, "");
  const lines = text.split("\n");
  const argumentsForLineRemoval = [
    passed ? "# Subtest" : "TAP version",
    " stdout: |-",
    "exitCode: 1",
    `failureType: 'subtestsFailed'`,
    "...",
    "1..1",
    "---",
    "duration_ms",
    "TAP version",
  ];
  const removedRedundant = lines.filter(
    (l) => !argumentsForLineRemoval.some((a) => l.includes(a))
  );
  const currentPath = path.resolve("").replace(/\\/g, "\\\\");

  const formatUrl = removedRedundant.map((l) => {
    l = l.replace(currentPath, "");
    l = l.replace(/\\/g, " ");
    l = l.replace("not ok ", paint("failed X ", "red"));
    l = l.replace("ok ", paint("passed ✔ ", "green"));
    return l;
  });
  let finalArr = formatUrl;

  if (!passed) {
    let paintErrorLines = 0;
    finalArr = finalArr
      .map((l, i) => {
        if (formatUrl[i + 1] && formatUrl[i + 1].includes("passed")) {
          return "";
        }
        if (l.includes("ERR_TEST_FAILURE")) {
          return "\n";
        }
        l = l.replace("# Subtest", "Description");
        if (l.includes("Expected")) {
          paintErrorLines = 8;
          l = paint(`${l}`, "yellow");
        }
        if (paintErrorLines > 0) {
          --paintErrorLines;
          l = paint(`${l}`, "yellow");
        }
        if (l.includes(" stack: |-")) {
          paintErrorLines = 0;
        }
        return l;
      })
      .filter((l) => l);
  }
  return finalArr.join("\n");
};

/**
 * @param {string} resultsAsText
 * @returns String
 */
const printTestResult = (resultsAsText, passed = true) => {
  try {
    const conclusionsObj = getConclusions(resultsAsText);
    const textWithoutConclusions = resultsAsText.replace(
      conclusionsObj.conclusionsText,
      ""
    );
    const mainData = reformatMainData(textWithoutConclusions, passed);
    logToConsole(mainData);
    writeFinalResults(conclusionsObj.conclusions);
  } catch (err) {
    logToConsole(resultsAsText);
  }
};

const getTestFiles = (fullPath) => {
  return new Promise((resolve, reject) => {
    readdir(fullPath, (error, files) => {
      if (error) reject(error);
      resolve(files);
    });
  });
};

/**
 * @param testFiles
 * @returns {Promise<{ data: string; pass: boolean }>}
 */
const getTapDataAsync = (testFiles) => {
  let allData = "";

  let pass = true;
  return new Promise((resolve, reject) => {
    const stream = run({
      files: testFiles,
    });
    stream.on("data", (data) => (allData += data.toString()));
    stream.on("test:fail", (data) => (pass = false));
    stream.on("close", (data) => resolve({ data: allData, pass }));
    stream.on("error", (err) => reject(err));
  });
};

const testRunner = async (testType = "integration") => {
  const testFilesPath = `test/${testType}`;

  console.log("test files path", path.resolve(testFilesPath));

  try {
    const testFiles = (await getTestFiles(path.resolve(testFilesPath)))
      .filter((f) => f.includes("test.js"))
      .map((p) => path.resolve(testFilesPath, p));

    const result = await getTapDataAsync(testFiles);
    if (result) {
      printTestResult(result.data, result.pass);
      if (result.pass) {
        return true;
      }
    }
  } catch (err) {
    console.error("mainRunner Error:", err);
  }
  process.exit(1);
};

const testFolder = ["integration", "e2e"].includes(process.argv[2])
  ? process.argv[2]
  : undefined;

testRunner(testFolder).then();
/** Utility functions */
function paint(text, argsOptions = undefined) {
  const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    hideCursor: "\u001B[?25l",
    fg: {
      black: "\x1b[30m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      white: "\x1b[37m",
    },
    bg: {
      BGblack: "\x1b[40m",
      BGred: "\x1b[41m",
      BGgreen: "\x1b[42m",
      BGyellow: "\x1b[43m",
      BGblue: "\x1b[44m",
      BGmagenta: "\x1b[45m",
      BGcyan: "\x1b[46m",
      BGwhite: "\x1b[47m",
    },
  };

  let options =
    typeof argsOptions === "object"
      ? { ...argsOptions }
      : { color: argsOptions };

  const fg = options && options.color ? colors.fg[options.color] : "";
  const bg = options && options.background ? colors.bg[options.background] : "";
  const reset = colors.reset;
  return `${fg}${bg}${text}${reset}`;
}
function logToConsole(...args) {
  console["log"](...args);
}

/**
 * @typedef {{
 *   todo: string;
 *   duration_ms: string;
 *   fail: string;
 *   tests: string;
 *   pass: string;
 *   cancelled: string;
 *   skipped: string;
 * }} Conclusions
 */
/** @param {Conclusions} conclusions */
function writeFinalResults(conclusions) {
  const { skipped, fail, pass } = conclusions;
  if (+skipped) {
    logToConsole(
      paint(
        `${skipped} Tests ${paint(" SKIPPED ", {
          color: "white",
          background: "BGyellow",
        })}`
      )
    );
  }
  if (+fail) {
    logToConsole(
      paint(
        `${fail} Tests ${paint(" FAILED ", {
          color: "white",
          background: "BGred",
        })}`
      )
    );
  }
  logToConsole(
    paint(
      `no  ${pass} Tests ${paint(" PASSED ", {
        color: "white",
        background: "BGgreen",
      })}`,
      { background: "BGblack" }
    )
  );
}
