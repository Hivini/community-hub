# Event Endpoints

## Get all community events
**`GET /api/community/{id}/event`**
- **id**: The community ID.
### Example
**Request**
```http
GET http://localhost:3000/api/community/1/event
```
*Headers*
```http
Authorization: "Bearer TOKEN_HERE"
```
**Response**
```json
[
    {
        "id": 2,
        "description": "Another event",
        "eventDate": "2021-11-01 18:52:00"
    },
    {
        "id": 3,
        "description": "Another event 2",
        "eventDate": "2021-11-01 20:00:00"
    }
]
```

## Get a single community event
**`GET /api/community/{id}/event/{eventId}`**
- **id**: The community ID.
- **eventId**: The event ID.
### Example
**Request**
```http
GET http://localhost:3000/api/community/1/event/2
```
*Headers*
```http
Authorization: "Bearer TOKEN_HERE"
```
**Response**
```json
{
    "id": 2,
    "description": "Another event",
    "eventDate": "2021-11-01 18:52:00"
}
```

## Insert event
**`POST /api/community/{id}/event`**
- **id**: The community ID.
### Example
**Request**
```
POST http://localhost:3000/api/community/1/event
```
*Headers*
```
Authorization: "Bearer TOKEN_HERE"
```
*Body*
```json
{
    "description": "This is an event",
    "datetime": "2021-11-22 21:00:00"
}
```
**Response**
```json
{
    "id": 7,
    "description": "This is an event.",
    "eventDate": "2021-11-01 21:00:00"
}
```

## Update event
**`PUT /api/community/{id}/event/{eventId}`**
- **id**: The community ID.
- **eventId**: The event ID.
### Example
**Request**
```http
PUT http://localhost:3000/api/community/1/event/3
```
*Headers*
```http
Authorization: "Bearer TOKEN_HERE"
```
*Body*
```json
{
    "description": "New Description cool",
    "datetime": "2021-11-01 18:52:00"
}
```
**Response**
```json
{
    "id": 3,
    "description": "New Description cool",
    "eventDate": "2021-11-01 18:52:00"
}
```

## Delete event
**`DELETE /api/community/{id}/event/{eventId}`**
- **id**: The community ID.
- **eventId**: The event ID.
### Example

**Request**
```http
DELETE http://localhost:3000/api/community/1/event/4
```
*Headers*
```http
Authorization: "Bearer TOKEN_HERE"
```
**Response**
```
Event with id '3' has been deleted successfully.
```