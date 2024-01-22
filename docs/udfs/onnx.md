# ONNX

ONNX, or Open Neural Network Exchange, is an open-source format designed to represent machine learning models. It provides a standardized way to describe models so that they can be easily exchanged between different deep learning frameworks. ONNX is supported by various frameworks such as PyTorch, TensorFlow, Microsoft Cognitive Toolkit (CNTK), and others, allowing interoperability and flexibility in deploying models across different platforms.

Dozer supports ONNX models and allows you to deploy them as APIs. This enables you to use your models in production without having to write any additional code. For instance, you can use a pre-trained model to predict probabilities of a particular event, such as a customer credit score, or other use cases.

## Configuration

Add the following block to your YAML file to register ONNX models.

```yaml
sql : |
    SELECT torch_jit(col1, col2) INTO output FROM input;
```

```yaml
udfs:
    - name: torch_jit
      config: !Onnx
        path: ./model.onnx
```

`torch_jit` is the function which would run the ONNX model on `col1, col2` as input returning the output in output` column.

### Parameters  

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                           |
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `path`             | String               | Path to the ONNX model.                                                                                                                                                                                    |
## Running the ONNX Model

### Pre-requisites

- Enabling ONNX feature while building Dozer.
  ```bash
  cargo install --path dozer-cli --features onnx --locked
  ```
- Installing ONNX runtime.
  ```bash
    pip install onnxruntime
    ```

Run App to start ingesting data into Dozer.

```bash
dozer run app
```
### To use ONNX on Dozer Cloud

```
dozer cloud deploy -c dozer-config.yaml -c model.onnx
```

## Trying it out

To test a ONNX sample, clone the `dozer-samples` GitHub repo and follow the steps described [here](https://github.com/getdozer/dozer-samples/tree/main/usecases/onnx)