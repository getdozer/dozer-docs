## Configuring UDF on ONNX placeholder
Open Neural Network Exchange [(ONNX)](https://onnx.ai/) is an open format built to represent machine learning models. . Using ONNX, you can make transformations, and write User Defined Functions (UDFs) in the Dozer configuration file to perform SQL transformation. Let's set these configurations step by step.

#### Write the ONNX model
You can write the ONNX models, by using pre-trained models, and services, or by converting models from various frameworks. For more details about the ONNX models follow this [ONNX tutorial](https://github.com/onnx/models).

To convert the model in ONNX format you can use the Pytorch library. 
Install Pytorch in your system, in order to use its functionalities.
You can organize the models in a separate folder, named model. In this folder, put the Python file. 

The first step, is to run the Python file, with this command:
```bash
python3 onnx_modeling.py
```
where onnx_modeling.py is the model in Python. As a result, it generates the .onnx file that contains data in ONNX format.

#### Configure the UDFs in Dozer
In the ```dozer_config.yaml``` file, you can configure the udfs, similar to this structure:

``` bash
udfs:
  - name: torch_jit
    config: !Onnx
      path: ./model/sum.onnx
```
The ```config: !Onnx``` supports the transformation from an ONNX model to a UDFs schema. 
The ```path``` refers to the ```.onnx``` file, and the ```torch_jit``` corresponds to the name of the transformation performed.

#### Perform the SQL transformation
In the ```dozer_config.yaml``` file, you can perform the SQL transformation, similar to this structure:

```SQL
sql: |
  SELECT torch_jit(col1, col2, col3, col4) INTO res
  FROM onnx_test;

```
This transformation is based on the UDFs structure. The result will be put in the endpoint named ```res```.

Check the [use case](https://github.com/getdozer/dozer-samples/tree/main/usecases/onnx) in Dozer for more implementation details of this UDFs transformation.
