# Backend API Documentation

## Endpoint

**POST** `/users/register`

Registers a new user in the system.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "string, required, min 3 characters",
    "lastName": "string, optional, min 3 characters"
  },
  "email": "string, required, valid email, min 5 characters",
  "password": "string, required, min 6 characters"
}
```

### Example

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

## Description

- **Registers a new user** with the provided full name, email, and password.
- The password is securely hashed before storage.
- Returns a JWT token and the created user object (excluding the password).

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "jwt_token_string",
    "user": {
      "_id": "user_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "password": "hashed_password"
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Error message",
        "param": "field_name",
        "location": "body"
      }
    ]
  }
  ```

---

## Status Codes

- `201 Created` – User registered successfully.
- `400 Bad Request` – Validation failed (see errors array for details).

---