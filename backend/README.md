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
      "password": "securepassword"
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

## Endpoint

**POST** `/users/login`

Authenticates a user and returns a JWT token.

---

## Request Body

Send a JSON object with the following structure:

```json
{
  "email": "string, required, valid email",
  "password": "string, required, min 6 characters"
}
```

### Example

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

---

## Description

- **Authenticates a user** using the provided email and password.
- Returns a JWT token and the user object (excluding the password) if authentication is successful.

---

## Responses

### Success

- **Status Code:** `200 OK`
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
      "password": "securepassword"
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

### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "massage": "invalid email or password"
  }
  ```

---

## Status Codes

- `200 OK` – User authenticated successfully.
- `400 Bad Request` – Validation failed (see errors array for details).
- `401 Unauthorized` – Invalid email or password.

---

## Endpoint

**GET** `/users/profile`

Returns the authenticated user's profile information.

---

## Description

- Requires authentication via JWT token (sent as a cookie or in the `Authorization` header as `Bearer <token>`).
- Returns the user's profile data.

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "_id": "user_id",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // other user fields if present
  }
  ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

## Endpoint

**GET** `/users/logOut`

Logs out the authenticated user.

---

## Description

- Requires authentication via JWT token (sent as a cookie or in the `Authorization` header as `Bearer <token>`).
- Blacklists the current JWT token and clears the authentication cookie.

---

## Responses

### Success

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "massage": "Logged Out"
  }
  ```

### Unauthorized

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Unauthorized"
  }
  ```

---

# Captain API Documentation

## Endpoint

### POST `/captains/register`

Registers a new captain in the system.

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
  "password": "string, required, min 6 characters",
  "vehicle": {
    "color": "string, required, min 3 characters",
    "plate": "string, required, min 3 characters",
    "capacity": "number, required, min 1",
    "vehicleType": "string, required, one of ['car', 'motorcycle', 'auto']"
  }
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
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

---

## Description

- **Registers a new captain** with the provided full name, email, password, and vehicle details.
- The password is securely hashed before storage.
- Returns a JWT token and the created captain object (excluding the password).

---

## Responses

### Success

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "jwt_token_string",
    "captain": {
      "_id": "captain_id",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "status": "inactive",
      "location": {
        "lat": null,
        "lng": null
      }
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

### Conflict

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "captain is already exist"
  }
  ```

---

## Status Codes

- `201 Created` – Captain registered successfully.
- `400 Bad Request` – Validation failed (see errors array for details).
- `401 Unauthorized` – Captain already exists.

---

## Validation Rules

- **`fullName.firstName`**: Must be at least 3 characters long.
- **`email`**: Must be a valid email address.
- **`password`**: Must be at least 6 characters long.
- **`vehicle.color`**: Must be at least 3 characters long.
- **`vehicle.plate`**: Must be at least 3 characters long.
- **`vehicle.capacity`**: Must be a number greater than or equal to 1.
- **`vehicle.vehicleType`**: Must be one of the following: `car`, `motorcycle`, `auto`.

---

## Notes

- The `status` field is set to `inactive` by default.
- The `location` field is optional and defaults to `null` for both `lat` and `lng`.