import { resolve } from "node:path";

import { buildSheetXml } from "../functions/buildSheetXml.js";
import { writeFileSync } from "node:fs";
import { xlsContent } from "./xlsxBuilder.js";
import { unlink } from "node:fs/promises";
import { xlsxFiles } from "./xlsxFiles.js";
/**
 * A basic class to describe a worksheet cell
 *
 * @param {any} value
 * @returns {import("../types/worksheet.types.js").Cell}
 */
const CellClass = (value, options) => {
  /** @type {"empty" | "string" | "number"} */
  let dataType = "empty";
  if (isNaN(value)) {
    dataType = "string";
  } else if (!value) {
    dataType = "empty";
  }
  return {
    dataType,
    value,
    style: {},
  };
};

/**
 * @param {any} data
 * @param {import("../types/config.type.js").XlsConfig} config
 * @returns {Promise<Record<string, { url: string[]; content: string }>>}
 */
export const editData = async (data, config) => {
  const cell1 = CellClass(4234);
  const cell2 = CellClass("I am a text");
  cell1.style.background = "red";
  cell2.style.background = "blue";
  const cells = [cell1, cell2, CellClass(12)];
  const rows = [{ cells }, { cells }, { cells }];
  const worksheet = { rows, name: "worksheet1" };

  const worksheet2 = { ...worksheet };
  worksheet2.name = "second";

  return createFileObjectFromSheets(worksheet, worksheet2);
};
/** @param {import("../types/worksheet.types.js").Sheet[]} sheets */
const createFileObjectFromSheets = (...sheets) => {
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
  buildStyleSheets(allStyles.map((s) => JSON.parse(s)));

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
/** @param {import("../types/style.types.js").CellStyle[]} allStyles */
const buildStyleSheets = (allStyles) => {
  const allStylesContainers = {
    background: [],
    color: [],
    fontSize: [],
    bold: [],
    border: [],
  };
  const styleIdModel = {
    background: -1,
    color: -1,
    fontSize: -1,
    bold: -1,
    border: -1,
  };
  const stylesWithIds = allStyles.map((s) => ({ ...styleIdModel }));
  allStyles.forEach((s, i) => {
    for (const prop in s) {
      const trait = s[prop];
      if (!allStylesContainers[prop].includes(trait)) {
        trait;
      }
      stylesWithIds[i][prop] = allStylesContainers[prop].indexOf(trait);
    }
  });
};
