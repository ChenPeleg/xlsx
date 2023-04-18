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
  allStyles.forEach((s, i) => {
    for (const prop in s) {
      const trait = s[prop];
      if (!allStylesContainers[prop].includes(trait)) {
        allStylesContainers[prop].push(trait);
      }
      stylesWithIds[i][prop] = allStylesContainers[prop].indexOf(trait);
    }
  });
  console.log(JSON.stringify(stylesWithIds));
  const cellStyleXfs = `<cellStyleXfs count="1">
        <xf numFmtId="0" fontId="0" fillId="0" borderId="0"/>
    </cellStyleXfs>`;

  /**
   * @param {string} argb
   * @returns
   */
  const buildFill = (argb) =>
    `<fill><patternFill patternType="solid"><fgColor rgb="${argb}"/>
    <bgColor indexed="64"/></patternFill></fill>`;
};
