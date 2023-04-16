## Xml styles

Origin

- [Open Xml Styles](http://officeopenxml.com/SSstyles.php)

### Font example

```xml
 <fonts count="3">
 <font>
     <sz val="10.0" />
     <color rgb="FF000000" />
     <name val="Arial" />
     <scheme val="minor" />
 </font>
 <font>
     <b />
     <color theme="1" />
     <name val="Arial" />
     <scheme val="minor" />
 </font>
 <font>
     <color theme="1" />
     <name val="Arial" />
     <scheme val="minor" />
 </font>
```

For fonts:

- name - font family
- sz - font size (in pixels)

Fills example:

```xml
<fill>
 <patternFill patternType="solid">
 <fgColor rgb="FFFFFF00"/>
 <bgColor indexed="64"/>
 </patternFill>
</fill>

```

## the confusing part:
Every cell will have a reference to one <xf> in the <cellXfs> collection. This is direct formatting for the cell. To apply a style to the cell, the <xf> references the style using the xfId attribute. The xfId attribute is an index into the <cellStyleXFs> collection, which collects the cell styles available to the user. The <cellStyleXFs> contains one <xf> for each style. Each such <xf> is tied to its name via an index (in its xfId attribute) from the <cellStyles> collection.

example :
```xml
    <cellStyleXfs count="1">
        <xf numFmtId="0" fontId="0" fillId="0" borderId="0" />
    </cellStyleXfs>
    <cellXfs count="5">
        <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" />
        <xf numFmtId="0" fontId="1" fillId="0" borderId="0" xfId="0" applyFont="1" />
        <xf numFmtId="0" fontId="0" fillId="2" borderId="0" xfId="0" applyFill="1" />
        <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1">
            <alignment horizontal="center" />
        </xf>
        <xf numFmtId="0" fontId="2" fillId="0" borderId="0" xfId="0" applyFont="1" />
    </cellXfs>
```