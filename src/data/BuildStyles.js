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
  const styleIdModel = {};
  // @ts-ignore
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

  const fills = allStylesContainers.background.map((bg) => buildFill(bg));
  if (fills.length) {
    styleXml = styleXml.replace(
      "<fills/>",
      `<fills count="${fills.length}"> ${fills.join("")}</fills>`
    );
  }

  const numFmts = `<fonts count="1" x14ac:knownFonts="1"><font>
  <sz val="11"/>
  <color theme="1"/>
  <name val="Arial"/>
  <family val="2"/>
  <charset val="177"/>
  <scheme val="minor"/>
</font></fonts>`;
  const fonts = `<fonts count="1"><font>
<sz val="11"/> 
<color rgb="FFFF0000"/>
<name val="Arial"/>
<family val="2"/>
<charset val="177"/>
<scheme val="minor"/>
</font></fonts>`;
  styleXml = styleXml.replace("<fonts/>", fonts);
  styleXml = styleXml.replace(
    "<cellStyleXfs/>",
    `<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
</cellStyleXfs>`
  );

  styleXml = styleXml.replace(
    "<borders/>",
    `<borders count="1">
  <border>
      <left/>
      <right/>
      <top/>
      <bottom/>
      <diagonal/>
  </border></borders>`
  );
  styleXml = styleXml.replace("<numFmts/>", "");
  let cellXfs = stylesWithIds.map((stl) => {
    // @ts-ignore
    let { background, color, fontSize, bold, border } = stl;
    background = `fillId="${+background}" applyFill="1"`;
    return `
    <xf numFmtId="0" fontId="0" ${background}/>`;
  });
  styleXml = styleXml.replace(
    "<cellStyles/>",
    `<cellStyles count="${cellXfs.length + 1}">
    ${cellXfs.map(
      (c, i) =>
        `<cellStyle name="styeName_${i}" xfId="${i}" builtinId="${i + 100}"/>`
    )}
    <cellStyle name="Normal" xfId="0" builtinId="0"/>
</cellStyles>`
  );
  if (cellXfs.length) {
    styleXml = styleXml.replace(
      "<cellXfs/>",
      `<cellXfs count="${cellXfs.length}">${cellXfs.join("")}</cellXfs>`
    );
  }
  return styleXml;
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
