# CSV

CSV (Comma Separated Values) is a simple file format used to store tabular data, such as a spreadsheet or database. Files in the CSV format can be imported to and exported from programs that store data in tables, such as Microsoft Excel or OpenOffice Calc.

## Configuration

```yaml
-  !Table
    name: zones
    config: !CSV
        path: {{file_path}} 
        extension: .csv
```
<!-- # header: false
        # separator: ';'
        # ingestion_type: append-only
 -->

 #### Parameters

 * **path**: the path to the CSV file.
 * **extension**: the extension of the CSV file.