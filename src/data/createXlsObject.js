import { resolve } from "node:path";

import { buildSheetXml } from "../functions/buildSheetXml.js";
import { writeFileSync } from "node:fs";
import { xlsContent } from "./xlsxBuilder.js";
import { unlink } from "node:fs/promises";
import { xlsxFiles } from "./xlsxFiles.js";
import { buildStyleSheets } from "./BuildStyles.js";

/** @param {import("../types/worksheet.types.js").Sheet[]} sheets */
export const createFileObjectFromSheets = (...sheets) => {
  sheets = sheets.map((s) => ({
    ...s,
    rows: s.rows.map((r) => ({ ...r, cells: r.cells.map((c) => ({ ...c })) })),
  }));
  const xmlFilesObject = {
    ...xlsxFiles,
    workbookXml: { ...xlsxFiles.workbookXml },
    workbookRels: { ...xlsxFiles.workbookRels },
  };
  const allStyles = [];

  sheets.forEach((s) =>
    s.rows.forEach((r) =>
      r.cells.forEach((c) => {
        const styleProps = Object.keys(c.style);
        if (styleProps.length) {
          const stringifiedStyle = JSON.stringify(c.style);
          if (!allStyles.includes(stringifiedStyle)) {
            allStyles.push(stringifiedStyle);
          }
          c.style = { ...c.style };
          c.style.styleId = allStyles.indexOf(stringifiedStyle).toString();
        }
      })
    )
  );
  xmlFilesObject.styles.content = buildStyleSheets(
    allStyles.map((s) => JSON.parse(s))
  );

  const sheetNames = sheets.map((s) => s.name);
  xmlFilesObject.workbookXml.content = xlsContent.buildWorkbookXml(sheetNames);
  xmlFilesObject.workbookRels.content =
    xlsContent.buildRelationsXml(sheetNames);
  const genericSheet = {
    ...xmlFilesObject.sheet1,
    url: [...xmlFilesObject.sheet1.url],
  };
  sheets.forEach((sheet, index) => {
    const sheetIndex = `sheet${index + 1}`;
    const sheetAsString = buildSheetXml(sheet);
    xmlFilesObject[sheetIndex] = {};
    xmlFilesObject[sheetIndex].url = [
      ...genericSheet.url.slice(0, -1),
      `${sheetIndex}.xml`,
    ];

    xmlFilesObject[sheetIndex].content = genericSheet.content.replace(
      "<sheetData/>",
      sheetAsString
    );
  });
  return xmlFilesObject;
};
