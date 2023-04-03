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
