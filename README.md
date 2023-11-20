# Currency Exchange API

This Currency Exchange API provides information about various currencies, including their codes, numbers, and exchange rates.

## Usage

### Get All Currencies Rates
Endpoint: `/api/v1/currencies/today`

- **Method:** GET
- **Description:** Retrieves a list of all available currencies with their respective code.


**Response:**

```json
{
  "currencies": [
    { "code": "RSD"},
    { "code": "EUR"},
    { "code": "AUD"},
    { "code": "CAD"},
    // ...
  ]
}
```

### Get All Currencies
Endpoint: `/api/v1/currencies`

- **Method:** GET
- **Description:** Retrieves a list of all available currencies with their respective codes, numbers, and exchange rate.


**Response:**

```json
{
  "currencies": [
    { "code": "RSD", "number": "1", "course": "1,000" },
    { "code": "EUR", "number": "978", "course": "117,1900" },
    { "code": "AUD", "number": "36", "course": "69,8266" },
    { "code": "CAD", "number": "124", "course": "78,4877" },
    // ...
  ]
}
```

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn
- Express
- Axios
- Cheerio

### Installation

1. Clone the repository:

```bash
git clone https://github.com/owlCoder/currency-exchange-api.git
```

2. Install dependencies:

```bash
cd currency-exchange-api
npm install
```

### Running the Server

Start the server:

```bash
npm start
```

The server will start running on `http://localhost:4200`.

## API Endpoints

### `GET /api/v1/currencies`

Retrieves a list of all available currencies with their code.

### `GET /api/v1/currencies/today`

Retrieves a list of all available currencies with their codes, numbers, and exchange rates.

## Error Handling

If an error occurs during the API call, it will return a JSON response with an error message and a status code 500.

## License

This project is licensed under the GPL 3.0 License. See the [LICENSE](LICENSE) file for details.
```
