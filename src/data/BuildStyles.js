import { xlsxFiles } from "./xlsxFiles.js";

/** @param {import("../types/style.types.js").CellStyle[]} allStyles */
export const buildStyleSheets = (allStyles) => {
  const allStylesContainers = {
    background: [],
    color: [],
    font: [],
    bold: [],
    border: [],
  };
  const styleIdModel = {};

  const stylesWithIds = allStyles.map((s) => ({ ...styleIdModel }));
  let styleXml = googleSheetStyles; // xlsxFiles.styles.content;
  allStyles.forEach((s, i) => {
    for (const prop in s) {
      const trait = s[prop];
      if (!allStylesContainers[prop].includes(trait)) {
        allStylesContainers[prop].push(trait);
      }
      stylesWithIds[i][prop] = allStylesContainers[prop].indexOf(trait);
    }
  });

  const fills = allStylesContainers.background.map((bg) => buildFill(bg));
  if (fills.length) {
    styleXml = styleXml.replace(
      `<fills count="2"><patternFill patternType="none" /></fill><fill><patternFill patternType="lightGray" /></fill>`,
      `<fills count="${
        fills.length + 2
      }" ><fill><patternFill patternType="none" /></fill><fill><patternFill patternType="lightGray" /></fill> 
     ${fills.join("")}`
    );
  }
  let cellXfs = stylesWithIds.map((stl) => {
    // @ts-ignore
    let { background, color, fontSize, bold, border } = stl;
    background = `fillId="${+background + 2}" applyFill="1"`;
    return `
    <xf numFmtId="0" fontId="0" ${background} borderId="0" xfId="0" />`;
  });
  if (cellXfs.length) {
    styleXml = styleXml.replace(
      `<cellXfs count="1"><xf/>`,
      `<cellXfs count="${
        cellXfs.length + 1
      }"><xf borderId="0" fillId="0" fontId="0" numFmtId="0" xfId="0">
      </xf> ${cellXfs.join("")}`
    );
  }

  // const fonts = allStylesContainers.font.map((f) => buildFont(f));
  // styleXml = styleXml.replace(
  //   `<fonts count="2">`,
  //   `<fonts count="${fonts.length}">`
  // );

  return styleXml;
};
const googleSheetStyles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
    xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006">
    <fonts count="2">
        <font>
            <sz val="10.0" />
            <color rgb="FF000000" />
            <name val="Arial" />
            <scheme val="minor" />
        </font>
        <font>
            <color theme="1" />
            <name val="Arial" />
            <scheme val="minor" />
        </font>
        <font/> 
    </fonts>
    <fills count="2"><patternFill patternType="none" /></fill><fill><patternFill patternType="lightGray" /></fill>
        
    </fills>
    <borders count="1">
        <border />
    </borders>
    <cellStyleXfs count="1">
        <xf borderId="0" fillId="0" fontId="0" numFmtId="0" applyAlignment="1" applyFont="1" />
    </cellStyleXfs>
    <cellXfs count="1"><xf/>
        <xf borderId="0" fillId="0" fontId="0" numFmtId="0" xfId="0">
        </xf> 
    </cellXfs>
    <cellStyles count="1">
        <cellStyle xfId="0" name="Normal" builtinId="0" />
    </cellStyles>
    <dxfs count="0" />
</styleSheet>`;
const buildColorAtt = (color) => {
  if (colorMap[color.toLowerCase()]) {
    color = colorMap[color.toLowerCase()];
  }
  return `rgb="FF${color.replace("#", "")}"`;
};
const buildFill = (color) => {
  const colorAtt = buildColorAtt(color);
  return `<fill><patternFill patternType="solid"><fgColor ${colorAtt} />
  <bgColor ${colorAtt} /></patternFill></fill>`;
};
/**
 * @param {{
 *   size?: number;
 *   bold?: boolean;
 *   color?: string;
 * }} font
 * @returns {string}
 */
const buildFont = (font) => {
  let { size, bold, color } = font;
  const sizeStr = size ? `<sz val="${size}.0" />` : "";
  const colorAtt = color
    ? `<color ${buildColorAtt(color)} />`
    : `<color theme="1" />`;
  return `<font> ${bold ? "</b>" : ""} 
  <sz val="10.0" />
  <color rgb="FF000000" />
  <name val="Arial" />
  <scheme val="minor" />
</font>`;
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
