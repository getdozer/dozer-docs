# CSV

CSV (Comma Separated Values) is a simple file format used to store tabular data, such as a spreadsheet or database. Files in the CSV format can be imported to and exported from programs that store data in tables, such as Microsoft Excel or OpenOffice Calc.

## Configuration

```yaml
-  !Table
    name: zones
    config: !CSV
        path: {{file_path}} 
        extension: .csv
        marker_file: true
        marker_extension: .marker
```
<!-- # header: false
        # separator: ';'
        # ingestion_type: append-only
 -->

#### Parameters

* **path**: the path to the CSV file.
* **extension**: the extension of the CSV file.
* **marker_file** (optional): a boolean value indicating whether to use marker files or not. If set to true, the connector will only ingest files for which exists a marker file with the same name and the marker extension. If set to false, the connector will ingest all files in the folder.
* **marker_extension** (optional): the extension of the marker files. This parameter is only used if marker_file is set to true.