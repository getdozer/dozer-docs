---
description: Connects to JS/TS files, allowing you to ingest data from any API-based data source.
---

# Deno

 Dozer's Deno connector plays a vital role in facilitating real-time data ingestion from various API-based data sources. This connector empowers developers to craft custom JavaScript/TypeScript code for gathering data from any API source and subsequently ingesting it to Dozer after processing. Users simply need to specify the file path responsible for ingesting data into Dozer. This ingested data can then be merged with other data sources downstream, enabling the creation of real-time applications.

### Configuration
The following configuration block can be used in `dozer-config.yaml` to define a new Deno Connection:

```yaml
connections:
  - name: deno_conn
    config: !JavaScript
      bootstrap_path: ./ingest.js
```


### Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                           | 
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `bootstrap_path`             | String               | The path to the JS/TS file which ingests data into Dozer                                                                                                                                                                                    |


## How it works?

Your code runs within an embedded Deno runtime in Dozer. Dozer incorporates a custom Deno operator known as `ingest`. Users can employ this operator to ingest JSON data into Dozer. If you intend to ingest streaming data, it is recommended that you dispatch a `SnapshottingDone` message to Dozer once the snapshot has been successfully completed.

```javascript
const snapshot_msg = { typ: "SnapshottingDone", old_val: null, new_val: null };
        await Deno[Deno.internal].core.ops.ingest(snapshot_msg);
```

Henceforth, you have the option to send an `Insert` / `Update` / `Delete` message to Dozer for each record you wish to ingest, employing a comparable approach. Here is the message interface used to send data to Dozer:

#### Message Interface

- `typ` : The type of message. It can be `SnapshottingDone`, `Insert`, `Update`, or `Delete`.
- `old_val` : The old JSON record. It is only required for `Update` and `Delete` messages.
- `new_val` : The new JSON record. It is required for `Insert` and `Update` messages.



Directly ingesting JSON data provides you with maximum flexibility and control on your data.

Following is the schema for the ingested data:

| **Table Name** | **Column**             | 
|--------------------|----------------------|
| `json_records`             |               Field: `value`, Type: `Json` | 

You can use this table to join with other tables in Dozer and build real-time applications.

## Trying it out

To test a Deno sample, clone the `dozer-samples` GitHub repo and follow the steps described [here](https://github.com/getdozer/dozer-samples/tree/main/connectors/javascript).


