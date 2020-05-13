# ASAI CMM - Marketing (Backend)

## Getting Started

### Install & Run

Clone this repo!

```
git clone <repo>
cd <repo>
```

Install the dependencies and run the server, inside your terminal **execute**:

```
cd server
yarn install
yarn start
```

## Endpoints

### Marketing

#### Create marketing report (POST)

`**POST** {{url}}/marketing`

##### Request

```json
{
  "client_id": 1,
  "loyalty_id": 4,
  "offer_id": 1,
  "sale_id": 9
}
```

##### Response

Should return http status code.

#### List all marketing reports (GET)

`**GET** {{url}}/marketing`

##### Request

Shouldn't add any body to the request.

##### Response

```json
{
  "marketing": {
    "id": 9,
    "client_id": 5,
    "loyalty_id": 4,
    "offer_id": 1,
    "sale_id": 9,
    "name": "empresa 3",
    "address": "asdsa",
    "phone": "23",
    "email": "da@df",
    "preferredComunicationMethod": "phone",
    "description": "description",
    "details": "Details",
    "purchase_date": "2020-05-07T23:00:00.000Z",
    "discount_percentage": 5,
    "seller_id": 1
  }
}
```

#### List a specific marketing report (GET)

`**GET** {{url}}/marketing/:id`

##### Request

Shouldn't add any body to the request.

##### Response

```json
[
  {
    "id": 9,
    "client_id": 5,
    "loyalty_id": 4,
    "offer_id": 1,
    "sale_id": 9,
    "name": "empresa 3",
    "address": "asdsa",
    "phone": "23",
    "email": "da@df",
    "preferredComunicationMethod": "phone",
    "description": "description",
    "details": "Details",
    "purchase_date": "2020-05-07T23:00:00.000Z",
    "discount_percentage": 5,
    "seller_id": 1
  },
  ...
]
```

### Loyalty

#### Create loyalty (POST)

`**POST** {{url}}/loyalty`

##### Request

```json
{
  "name": "client",
  "description": "description"
}
```

##### Response

Should return http status code.

#### List all loyalties (GET)

`**GET** {{url}}/loyalty`

##### Request

Shouldn't add any body to the request.

##### Response

```json
{
  "loyalties": [
    {
      "id": 1,
      "name": "empresa 1",
      "description": "descrição da empresa"
    },
    {
      "id": 2,
      "name": "hello",
      "description": "world"
    }
  ]
}
```

#### List a specific loyalties (GET)

`**GET** {{url}}/loyalty/:id`

##### Request

Shouldn't add any body to the request.

##### Response

```json
{
  "loyalty": {
    "id": 1,
    "name": "empresa 1",
    "description": "descrição da empresa"
  }
}
```

#### Edit loyalty (PATCH)

`**GET** {{url}}/loyalty/:id`

##### Request

```json
{
  "name": "client",
  "description": "description"
}
```

##### Response

Should return http status code.
