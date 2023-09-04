---
description: Connects to MySQL, leveraging MySQL native CDC functionalities.
---

# MySQL
To use Dozer's MySQL connector, a specific server URL format is required. This URL consolidates details about the server's location, authentication specifics, the target database name, and any other optional parameters that refine the connection.

### Configuration
```yaml
connections:
  - config: !MySQL
      url: mysql://root:mysql@localhost:3306/orders
    name: orders
```

The above configuration establishes a MySQL connector. This connector will loads data from a MySQL database named `orders` located on a server at `localhost:3306`. It uses the username `root` and the password `mysql` for authentication.

You can enhance the connection URL by appending additional URL query parameters. For a complete guide, follow this [link](https://dev.mysql.com/doc/refman/8.0/en/connecting-using-uri-or-key-value-pairs.html).

## Trying it out

To test a MySQL sample, clone the `dozer-samples` GitHub repo and follow the steps described [here](https://github.com/getdozer/dozer-samples/tree/main/connectors/mysql).