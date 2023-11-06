# Axios HTTP Client

**AxiosClient** is a JavaScript class that provides a convenient wrapper around the popular Axios HTTP client library. It simplifies making HTTP requests and offers additional features to handle path resolution, parameter interpolation, and more.

Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Features <a id="features"></a>

- Create a flexible Axios client instance with custom configurations.

- Resolve API endpoints with path parameters and aliases.

- Interpolate parameters into API paths for easy request building.
  Supports HTTP methods like **GET**, **POST**, **PUT**, **PATCH**, and **DELETE**.

- Handle response data with promises, making asynchronous requests easy.

## Installation <a id="installation"></a>

To use AxiosClient in your project, you can install it via npm or yarn:

```bash
yarn add axios-clt
```

```javascript
import { AxiosClient } from "axios-clt";

const client = new AxiosClient({
    config: {
        baseURL: "<https://api.example.com>",
        // Add other Axios configuration options here
    },
    aliases: {
        users: "/users",
        user: "/users/:id",
        // Define aliases for common API paths
    },
});
```

## Usage <a id="usage"></a>

Here's an example of how to use the AxiosClient to make a GET request:

```javascript
// Fetch a list of users
const response = await client.get("users");
console.log(response.data); // Handle the response data as needed

// Fetch a single user
const response = await client.get("user", { id: 123 });
console.log(response.data); // Handle the response data as needed
```

You can use the AxiosClient for other HTTP methods like POST, PUT, PATCH, and DELETE by calling the respective methods on the client instance.

## API Reference <a id="api-reference"></a>

### `AxiosClient(options)`

- `options` (Object) - Configuration options for the Axios client instance.
  - `config` (Object) - Axios configuration options (e.g., `baseURL`, `timeout`).
  - `aliases` (Object) - Aliases for common API paths.

### `client.get(path, params, config)`

- Makes a GET request to the specified path.

### `client.post(path, data, config)`

- Makes a POST request to the specified path.

### `client.put(path, data, config)`

- Makes a PUT request to the specified path.

### `client.patch(path, data, config)`

- Makes a PATCH request to the specified path.

### `client.delete(path, params, config)`

- Makes a DELETE request to the specified path.

### `client.resolvePath(path, params)`

- Resolves the path with optional path parameters and aliases.

### `client.interpolateParams(path, params)`

- Interpolates parameters into the path string.

## Contributing <a id="contributing"></a>

If you find a bug or want to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and ensure tests pass.
4. Submit a pull request with a clear description of your changes.

## License <a id="license"></a>

This project is licensed under the MIT License. See the [LICENSE](https://github.com/zackkh/axios-clt/blob/master/LICENSE) file for details.

## Author <a id="author"></a>

Zakaria Khonchafi - [LinkedIn](https://www.linkedin.com/in/zakaria-khonchafi/) | [Twitter](https://www.twitter.com/zakaria_kh0)
