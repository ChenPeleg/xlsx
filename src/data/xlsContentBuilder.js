import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { xlsxFiles } from "./xlsxXmlFiles.js";
import { resolve } from "node:path";

export const xlsContentBuilder = {
  /**
   * @param {string[]} sheetNames
   * @returns {string}
   */
  buildWorkbookXml(sheetNames = ["sheet_1"]) {
    const allSheets = sheetNames
      .map(
        (name, i) =>
          `<sheet state="visible" name="${name}" sheetId="${i + 1}" r:id="rId${
            i + 4
          }" />`
      )
      .join("\n");
    return xlsxFiles.workbookXml.content.replace(
      '<sheet state="visible" name="sheet_1" sheetId="1" r:id="rId4" />',
      allSheets
    );
  },
  buildRelationsXml(sheetNames = ["sheet_1"]) {
    const allSheets = sheetNames
      .map(
        (name, i) =>
          `<Relationship Id="rId${
            i + 4
          }" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${
            i + 1
          }.xml"/>`
      )
      .join("\n");
    return xlsxFiles.workbookRels.content.replace(
      '<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>',
      allSheets
    );
  },
  /**
   * @param {Record<string, { url: string[]; content: string }>} fileObject
   * @param {any} tempDir
   */
  copyFilesToTempDir(fileObject, tempDir) {
    for (const file in fileObject) {
      const dir = resolve(tempDir, ...fileObject[file].url.slice(0, -1));
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(
        resolve(tempDir, ...fileObject[file].url),
        fileObject[file].content,
        { flag: "w", encoding: "utf8" }
      );
    }
  },
};
