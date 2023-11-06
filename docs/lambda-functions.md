# Lambda Functions

Dozer offers support for Lambda functions or Change Data Functions (CDFs) that serve as triggers for notifications and alerts when specific conditions are satisfied. For instance, you can initiate an alert when a user's account balance falls below a specified threshold. Dozer actively monitors the cache logs for a particular endpoint, and when an activity occurs, it triggers the Lambda function. This can subsequently be employed to dispatch email, Slack or text message notifications to the user.

Currently, Dozer supports Lambda functions written in `JavaScript`, providing developers with maximum flexibility to customise their triggers.

## Configuration

Add the following block to your YAML file to register lambda functions.

```yaml
lambdas:
  - !JavaScript
    endpoint: alerts
    module: ./lambdas/log.js
```

### Parameters

| **Parameter Name** | **Type**             | **Description**                                                                                                                                                                                                                                                           |
|--------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `endpoint`             | String               | The endpoint to monitor for changes.                                                                                                                                                                                    |
| `module`             | String               | The path to the JS file which contains the lambda function. The default export of this module will be considered as the lambda function.                                                                                                                                                                                  |


### Lambda Function Interface

```javascript
function log (event) {
    // your code here
}

export default log;
```

## Running the Lambda Function

- Run App to start ingesting data into Dozer.
```bash
dozer run app
```

- Run Lambda Functions to start monitoring the cache logs and trigger the lambda function whenever an activity happens.
```bash
dozer run lambda
```

That's it! You have successfully configured and run a Lambda function in Dozer.

## Trying it out

To test a Lambda sample, clone the `dozer-samples` GitHub repo and follow the steps described [here](https://github.com/getdozer/dozer-samples/tree/main/connectors/javascript)
