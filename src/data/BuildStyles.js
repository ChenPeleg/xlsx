import { xlsxFiles } from "./xlsxFiles.js";

/** @param {import("../types/style.types.js").CellStyle[]} allStyles */
export const buildStyleSheets = (allStyles) => {
  const allStylesContainers = {
    background: [],
    color: [],
    fontSize: [],
    bold: [],
    border: [],
  };
  const styleIdModel = {
    // background: -1,
    // color: -1,
    // fontSize: -1,
    // bold: -1,
    // border: -1,
  };
  const stylesWithIds = allStyles.map((s) => ({ ...styleIdModel }));
  let styleXml = xlsxFiles.styles.content;
  allStyles.forEach((s, i) => {
    for (const prop in s) {
      const trait = s[prop];
      if (!allStylesContainers[prop].includes(trait)) {
        allStylesContainers[prop].push(trait);
      }
      stylesWithIds[i][prop] = allStylesContainers[prop].indexOf(trait);
    }
  });
  console.log(
    JSON.stringify(stylesWithIds),
    JSON.stringify(allStylesContainers)
  );
  const cellStyleXfs = `<cellStyleXfs count="1">
        <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
    </cellStyleXfs>`;
  const fills = allStylesContainers.background.map((bg) => buildFill(bg));
  if (fills) {
    styleXml = styleXml.replace();
  }
};
const buildFill = (color) => {
  if (colorMap[color.toLowerCase()]) {
    color = colorMap[color.toLowerCase()];
  }

  return `<fill><patternFill patternType="solid"><fgColor rgb="FF${color.replace(
    "#",
    ""
  )}"/>
  <bgColor indexed="64"/></patternFill></fill>`;
};
const colorMap = {
  black: "#000000",
  white: "#FFFFFF",
  red: "#FF0000",
  lime: "#00FF00",
  blue: "#0000FF",
  brown: "#A52A2A",
  yellow: "#FFFF00",
  cyan: "#00FFFF",
  fuchsia: "#FF00FF",
  silver: "#C0C0C0",
  gray: "#808080",
  maroon: "#800000",
  olive: "#808000",
  green: "#008000",
  purple: "#800080",
  teal: "#008080",
  navy: "#000080",
};
