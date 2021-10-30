# Auth Endpoints

## Register User
**`POST /api/auth/register`**
### Example
Request
```http
POST http://localhost:3000/api/auth/register
```
```json
{
    "email": "test@gmail.com",
    "password": "cool1234",
    "name": "test2"
}
```
Response
```json
User sucessfully registered.
```

## Login User
**`POST /api/auth/login`**
### Example
Request
```http
POST http://localhost:3000/api/auth/login
```
```json
{
    "email": "test@gmail.com",
    "password": "cool1234",
}
```
Response
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImludmFsaWQxQGdtYWlsLmNvbSIsImlhdCI6MTYzNTU2NTI4NCwiZXhwIjoxNjM1NTc5Njg0fQ.wrVpgjngS_6bHS0Wpff5F0VbwYXYuQDNqSHnWPs5uc8"
}
```