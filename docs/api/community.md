# Community Endpoints
- [Community Endpoints](#community-endpoints)
  - [Get all communities](#get-all-communities)
    - [Example](#example)
  - [Get single community](#get-single-community)
    - [Example](#example-1)
  - [Insert community](#insert-community)
    - [Example](#example-2)
  - [Update community](#update-community)
    - [Example](#example-3)
  - [Delete community](#delete-community)
    - [Example](#example-4)

## Get all communities
**`GET /api/community`**
### Example
Request
```http
GET http://localhost:3000/api/community
```
Response
```json
[
    {
        "id": 11,
        "name": "Test Community 6",
        "lat": 37.4210687,
        "lon": -122.0855917,
        "currency": "USD",
        "city": "Mountain View"
    },
    {
        "id": 12,
        "name": "Test Community",
        "lat": 37.4210687,
        "lon": -122.0855917,
        "currency": "USD",
        "city": "Mountain View"
    }
]
```

## Get single community
**`GET /api/community/{id}`**

### Example
Request
```http
GET http://localhost:3000/api/community/11
```
Response
```json
{
    "id": 11,
    "name": "Test Community 6",
    "lat": 37.4210687,
    "lon": -122.0855917,
    "currency": "USD",
    "city": "Mountain View"
}
```

## Insert community
**`POST /api/community`**
### Example
Request

```http
POST http://localhost:3000/api/community
```

```json
{
    "name": "Test Community",
    "lat": 37.4210687,
    "lon": -122.0855917,
    "currency": "USD",
    "city": "Mountain View"
}
```
Response
```json
{
    "id": 12,
    "name": "Test Community",
    "lat": 37.4210687,
    "lon": -122.0855917,
    "currency": "USD",
    "city": "Mountain View"
}
```

## Update community
**`PUT /api/community/{id}`**
### Example

Request
```http
PUT http://localhost:3000/api/community/11
```
```json
{
    "name": "Test Community 8",
    "lat": 37.4210687,
    "lon": -122.0855917,
    "currency": "USD",
    "city": "Mountain View"
}
```
Response
```json
{
    "id": 11,
    "name": "Test Community 8",
    "lat": 37.4210687,
    "lon": -122.0855917,
    "currency": "USD",
    "city": "Mountain View"
}
```

## Delete community
**`DELETE /api/community/{id}`**
### Example

Request
```http
DELETE http://localhost:3000/api/community/11
```
Response
```
Community with id '11' has been deleted successfully.
```

