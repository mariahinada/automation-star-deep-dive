# E-commerce REST API

A lightweight e-commerce REST API built with JavaScript and Express. Users can register, log in to receive a JWT token, and perform authenticated checkouts with cash or credit card payment methods.

## Description

This API provides in-memory user and product management for an e-commerce checkout flow. Authentication is handled via JSON Web Tokens (JWT). Checkout supports two payment methods — cash and credit card — with a 10% discount applied when paying with cash.

The project follows a layered architecture with separate **Routes**, **Middleware**, **Controllers**, **Services**, and **Models** under the `src` folder.

## Installation

1. Clone the repository and switch to the feature branch:

```bash
git clone <repository-url>
cd automation-star-deep-dive
git checkout feature/ecommerce-api
```

2. Install dependencies:

```bash
npm install
```

## How to Run

Start the server:

```bash
npm start
```

The API runs at `http://localhost:3000` by default. You can change the port with the `PORT` environment variable.

Swagger documentation is available at:

```
http://localhost:3000/api/swagger
```

## Rules

- **Authentication**: Only authenticated users (valid JWT) can perform checkout.
- **Payment methods**: Checkout accepts only `cash` or `credit_card`.
- **Cash discount**: Paying with `cash` applies a **10% discount** on the order subtotal.
- **In-memory storage**: All data is stored in memory. Restarting the server resets users and products to their initial seed values (except newly registered users are lost on restart).
- **Endpoints**: The API exposes login, register, checkout, healthcheck, and a Swagger documentation endpoint.

## Existent Data

### Users (password for all: `password123`)

| ID | Email               | Name           |
|----|---------------------|----------------|
| 1  | alice@example.com   | Alice Johnson  |
| 2  | bob@example.com     | Bob Smith      |
| 3  | carol@example.com   | Carol Williams |

### Products

| ID | Name                 | Price   | Stock |
|----|----------------------|---------|-------|
| 1  | Wireless Headphones  | $79.99  | 50    |
| 2  | USB-C Hub            | $34.99  | 100   |
| 3  | Mechanical Keyboard  | $129.99 | 30    |

## How to Use the REST API

### 1. Health Check

```bash
curl http://localhost:3000/api/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2026-06-30T12:00:00.000Z"
}
```

### 2. Register

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "mypassword",
    "name": "New User"
  }'
```

### 3. Login

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'
```

**Response:**

```json
{
  "token": "<JWT_TOKEN>",
  "user": {
    "id": 1,
    "email": "alice@example.com",
    "name": "Alice Johnson"
  }
}
```

### 4. Checkout (authenticated)

Replace `<JWT_TOKEN>` with the token from login.

**Cash payment (10% discount):**

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "items": [
      { "productId": 1, "quantity": 2 },
      { "productId": 2, "quantity": 1 }
    ],
    "paymentMethod": "cash"
  }'
```

**Credit card payment (no discount):**

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{
    "items": [
      { "productId": 3, "quantity": 1 }
    ],
    "paymentMethod": "credit_card"
  }'
```

**Example response:**

```json
{
  "message": "Checkout completed successfully",
  "userId": 1,
  "order": {
    "items": [
      {
        "productId": 1,
        "name": "Wireless Headphones",
        "price": 79.99,
        "quantity": 2,
        "lineTotal": 159.98
      }
    ],
    "paymentMethod": "cash",
    "subtotal": 159.98,
    "discount": 16,
    "total": 143.98
  }
}
```

### 5. Swagger Documentation

Open in a browser or visit:

```
http://localhost:3000/api/swagger
```
