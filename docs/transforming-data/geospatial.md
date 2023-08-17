# Geospatial Support

Dozer provides geospatial support using the `POINT` data type, which represents a coordinate in a 2D space. Rfere to [this section](/transforming-data/data-types#other) for more details.

## Geospatial Functions

### DISTANCE()
Computes the distance between two geospatial points A and B using one of the specified methods.

#### Syntax
```
DISTANCE(A, B, [GEODESIC or HAVERSINE or VINCENTY])
```

#### Arguments
| Name       | Type     | Description                                                               |
|------------|----------|---------------------------------------------------------------------------|
| A          | `POINT`  | The first `POINT` type, representing the starting coordinate.              |
| B          | `POINT`  | The second `POINT` type, representing the ending coordinate.               |
| method     | `STRING` | An optional argument specifying the method of distance calculation. Valid methods are: `GEODESIC`, `HAVERSINE`, and `VINCENTY`. If not specified, a default method is used. |

**Method Details:**  
- **GEODESIC:** Calculates the shortest distance between two points on the surface of an ellipsoidal Earth. It's regarded as the most accurate for long distances on the earth's surface.
  
- **HAVERSINE:** Computes the distance between two points on the surface of a sphere. It's a simpler and faster approach but assumes the Earth is a perfect sphere, which may lead to minor inaccuracies.

- **VINCENTY:** Uses more complex iterative solutions and accounts for the ellipsoidal shape of the Earth. Though often very accurate, it may be slower and does not always converge for nearly antipodal points.

#### Returns
The calculated distance between point A and point B using the specified method. The distance is expressed in the unit consistent with the spatial reference system of the input coordinates.