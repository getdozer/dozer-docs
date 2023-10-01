---
description: Allows a new Dozer instance to use all tables from an upstream Dozer instance
---

# Dozer instance

The Dozer connector allows ingesting data on a Dozer instance from another Dozer instance.

## Configuration

To use the Dozer connector the config parameter of the connection must be set to `!Dozer`.
The following configuration block can be used in `dozer-config.yaml` to define a new Dozer connection:

```yaml
connections:
- config: !Dozer
    url: localhost:50053
  name: upstream
```

## Parameters

* **url**: the host and the port where will get the incoming data
