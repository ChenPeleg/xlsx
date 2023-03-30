# Cell class

Example:This example shows the information stored for a cell whose address in the grid is C6, whose style index is '6', and whose value metadata index is '15'. The cell contains a formula as well as a calculated result of that formula.

```xml
<c r="C6" s="1" vm="15">  
  <f>CUBEVALUE("xlextdat9 Adventure Works",C$5,$A6)</f>  
  <v>2838512.355</v>  
</c>
```

### Inline strings

While a cell can have a formula element f and a value element v, when the cell's type t is inlineStr then only the element is is allowed as a child element.

Example:

Here is an example of expressing a string in the cell rather than using the shared string table.

```xml
<row r="1" spans="1:1">  
  <c r="A1" t="inlineStr">  
    <is><t>This is inline string example</t></is>  
  </c>  
</row>  
```