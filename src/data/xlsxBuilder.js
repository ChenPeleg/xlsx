import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { xlsxFiles } from "./xlsxFiles.js";
import { resolve } from "node:path";

export class xlsContent {
  /**
   * @param {number} sheetIndex
   * @returns
   */
  static sheetFile(sheetIndex) {
    return ["xl", "worksheets", `sheet${sheetIndex}.xml`];
  }

  static workbookXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
        xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
        xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:mv="urn:schemas-microsoft-com:mac:vml"
        xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main"
        xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"
        xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
        xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main">
        <workbookPr />
        <sheets>
            <sheet state="visible" name="sheet_1" sheetId="1" r:id="rId4" />
        </sheets>
        <definedNames />
        <calcPr />
    </workbook>`;
  static rels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
  <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`;
  static styles = `<stylesheet xmls="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <numFmts />
  <fonts />
  <fills />
  <borders />
  <cellStyleXfs />
  <cellXfs />
  <cellStyles />
  <dxfs />
  <tableStyles />
</stylesheet>`;
  /**
   * @param {string[]} sheetNames
   * @returns {string}
   */
  static buildWorkbookXml(sheetNames = ["sheet_1"]) {
    const allSheets = sheetNames
      .map(
        (name, i) =>
          `<sheet state="visible" name="${name}" sheetId="${i + 1}" r:id="rId${
            i + 4
          }" />`
      )
      .join("\n");
    return xlsContent.workbookXml.replace(
      '<sheet state="visible" name="sheet_1" sheetId="1" r:id="rId4" />',
      allSheets
    );
  }
  static buildRelationsXml(sheetNames = ["sheet_1"]) {
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
    return xlsContent.rels.replace(
      '<Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>',
      allSheets
    );
  }
  static copyFilesToTempDir(tempDir) {
    for (const file in xlsxFiles) {
      const dir = resolve(tempDir, ...xlsxFiles[file].url.slice(0, -1));
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(
        resolve(tempDir, ...xlsxFiles[file].url),
        xlsxFiles[file].content,
        { flag: "w" }
      );
    }
  }
}
