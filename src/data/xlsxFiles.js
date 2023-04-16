export const xlsxFiles = {
  rels: {
    url: ["_rels", ".rels"],
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
  },
  workbookRels: {
    url: ["xl", "_rels", "workbook.xml.rels"],
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>`,
  },
  theme1: {
    url: ["xl", "theme", "theme1.xml"],
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
        xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" name="Sheets">
        <a:themeElements>
            <a:clrScheme name="Sheets">
                <a:dk1>
                    <a:srgbClr val="000000"/>
                </a:dk1>
                <a:lt1>
                    <a:srgbClr val="FFFFFF"/>
                </a:lt1>
                <a:dk2>
                    <a:srgbClr val="000000"/>
                </a:dk2>
                <a:lt2>
                    <a:srgbClr val="FFFFFF"/>
                </a:lt2>
                <a:accent1>
                    <a:srgbClr val="4285F4"/>
                </a:accent1>
                <a:accent2>
                    <a:srgbClr val="EA4335"/>
                </a:accent2>
                <a:accent3>
                    <a:srgbClr val="FBBC04"/>
                </a:accent3>
                <a:accent4>
                    <a:srgbClr val="34A853"/>
                </a:accent4>
                <a:accent5>
                    <a:srgbClr val="FF6D01"/>
                </a:accent5>
                <a:accent6>
                    <a:srgbClr val="46BDC6"/>
                </a:accent6>
                <a:hlink>
                    <a:srgbClr val="1155CC"/>
                </a:hlink>
                <a:folHlink>
                    <a:srgbClr val="1155CC"/>
                </a:folHlink>
            </a:clrScheme>
            <a:fontScheme name="Sheets">
                <a:majorFont>
                    <a:latin typeface="Arial"/>
                    <a:ea typeface="Arial"/>
                    <a:cs typeface="Arial"/>
                </a:majorFont>
                <a:minorFont>
                    <a:latin typeface="Arial"/>
                    <a:ea typeface="Arial"/>
                    <a:cs typeface="Arial"/>
                </a:minorFont>
            </a:fontScheme>
            <a:fmtScheme name="Office">
                <a:fillStyleLst>
                    <a:solidFill>
                        <a:schemeClr val="phClr"/>
                    </a:solidFill>
                    <a:gradFill rotWithShape="1">
                        <a:gsLst>
                            <a:gs pos="0">
                                <a:schemeClr val="phClr">
                                    <a:lumMod val="110000"/>
                                    <a:satMod val="105000"/>
                                    <a:tint val="67000"/>
                                </a:schemeClr>
                            </a:gs>
                            <a:gs pos="50000">
                                <a:schemeClr val="phClr">
                                    <a:lumMod val="105000"/>
                                    <a:satMod val="103000"/>
                                    <a:tint val="73000"/>
                                </a:schemeClr>
                            </a:gs>
                            <a:gs pos="100000">
                                <a:schemeClr val="phClr">
                                    <a:lumMod val="105000"/>
                                    <a:satMod val="109000"/>
                                    <a:tint val="81000"/>
                                </a:schemeClr>
                            </a:gs>
                        </a:gsLst>
                        <a:lin ang="5400000" scaled="0"/>
                    </a:gradFill>
                    <a:gradFill rotWithShape="1">
                        <a:gsLst>
                            <a:gs pos="0">
                                <a:schemeClr val="phClr">
                                    <a:satMod val="103000"/>
                                    <a:lumMod val="102000"/>
                                    <a:tint val="94000"/>
                                </a:schemeClr>
                            </a:gs>
                            <a:gs pos="50000">
                                <a:schemeClr val="phClr">
                                    <a:satMod val="110000"/>
                                    <a:lumMod val="100000"/>
                                    <a:shade val="100000"/>
                                </a:schemeClr>
                            </a:gs>
                            <a:gs pos="100000">
                                <a:schemeClr val="phClr">
                                    <a:lumMod val="99000"/>
                                    <a:satMod val="120000"/>
                                    <a:shade val="78000"/>
                                </a:schemeClr>
                            </a:gs>
                        </a:gsLst>
                        <a:lin ang="5400000" scaled="0"/>
                    </a:gradFill>
                </a:fillStyleLst>
                <a:lnStyleLst>
                    <a:ln w="6350" cap="flat" cmpd="sng" algn="ctr">
                        <a:solidFill>
                            <a:schemeClr val="phClr"/>
                        </a:solidFill>
                        <a:prstDash val="solid"/>
                        <a:miter lim="800000"/>
                    </a:ln>
                    <a:ln w="12700" cap="flat" cmpd="sng" algn="ctr">
                        <a:solidFill>
                            <a:schemeClr val="phClr"/>
                        </a:solidFill>
                        <a:prstDash val="solid"/>
                        <a:miter lim="800000"/>
                    </a:ln>
                    <a:ln w="19050" cap="flat" cmpd="sng" algn="ctr">
                        <a:solidFill>
                            <a:schemeClr val="phClr"/>
                        </a:solidFill>
                        <a:prstDash val="solid"/>
                        <a:miter lim="800000"/>
                    </a:ln>
                </a:lnStyleLst>
                <a:effectStyleLst>
                    <a:effectStyle>
                        <a:effectLst/>
                    </a:effectStyle>
                    <a:effectStyle>
                        <a:effectLst/>
                    </a:effectStyle>
                    <a:effectStyle>
                        <a:effectLst>
                            <a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0">
                                <a:srgbClr val="000000">
                                    <a:alpha val="63000"/>
                                </a:srgbClr>
                            </a:outerShdw>
                        </a:effectLst>
                    </a:effectStyle>
                </a:effectStyleLst>
                <a:bgFillStyleLst>
                    <a:solidFill>
                        <a:schemeClr val="phClr"/>
                    </a:solidFill>
                    <a:solidFill>
                        <a:schemeClr val="phClr">
                            <a:tint val="95000"/>
                            <a:satMod val="170000"/>
                        </a:schemeClr>
                    </a:solidFill>
                    <a:gradFill rotWithShape="1">
                        <a:gsLst>
                            <a:gs pos="0">
                                <a:schemeClr val="phClr">
                                    <a:tint val="93000"/>
                                    <a:satMod val="150000"/>
                                    <a:shade val="98000"/>
                                    <a:lumMod val="102000"/>
                                </a:schemeClr>
                            </a:gs>
                            <a:gs pos="50000">
                                <a:schemeClr val="phClr">
                                    <a:tint val="98000"/>
                                    <a:satMod val="130000"/>
                                    <a:shade val="90000"/>
                                    <a:lumMod val="103000"/>
                                </a:schemeClr>
                            </a:gs>
                            <a:gs pos="100000">
                                <a:schemeClr val="phClr">
                                    <a:shade val="63000"/>
                                    <a:satMod val="120000"/>
                                </a:schemeClr>
                            </a:gs>
                        </a:gsLst>
                        <a:lin ang="5400000" scaled="0"/>
                    </a:gradFill>
                </a:bgFillStyleLst>
            </a:fmtScheme>
        </a:themeElements>
    </a:theme>`,
  },
  sheet1: {
    url: ["xl", "worksheets", "sheet1.xml"],
    content: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main"><sheetPr><outlinePr summaryBelow="0" summaryRight="0"/></sheetPr><sheetViews><sheetView workbookViewId="0"/></sheetViews><sheetFormatPr customHeight="1" defaultColWidth="12.63" defaultRowHeight="15.75"/><sheetData/><drawing r:id="rId1"/></worksheet>`,
  },
  sharedStrings: {
    url: [],
    content: ``,
  },
  styles: {
    url: [],
    content: ``,
  },
  workbookXml: {
    url: [],
    content: ``,
  },
  content_types: {
    url: [],
    content: ``,
  },
};
