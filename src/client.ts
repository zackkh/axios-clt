import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Configuration interface for the AxiosClient class
interface AxiosClientConfig<Aliases = Record<string, string>> {
    config: AxiosRequestConfig; // Configuration options for Axios
    aliases: Aliases; // Aliases for URL paths
}

// AxiosClient class for making HTTP requests
export default class AxiosClient<Aliases = Record<string, string>> {
    private client: AxiosInstance; // Axios HTTP client instance
    private aliases: Aliases; // Aliases for URL paths

    // Constructor for initializing the AxiosClient
    constructor(options: AxiosClientConfig<Aliases>) {
        const { config, aliases } = options;

        // Create an Axios instance with the provided configuration
        this.client = axios.create({
            ...config,
            // proxy: false,
            // withCredentials: true,
            // paramsSerializer: { indexes: null },
        });

        this.aliases = aliases;
    }

    // Function for making a GET request
    async get<T>(
        path: string & keyof Aliases, // URL path, possibly with an alias
        params?: any, // Request parameters
        config?: AxiosRequestConfig // Additional request configuration
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, params);
        const response = await this.client.get<T>(url, config);
        return response;
    }

    // Function for making a POST request
    async post<T>(
        path: string & keyof Aliases, // URL path, possibly with an alias
        data?: any, // Request data
        config?: AxiosRequestConfig // Additional request configuration
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, data);
        const response = await this.client.post<T>(url, data, config);
        return response;
    }

    // Function for making a PUT request
    async put<T>(
        path: string & keyof Aliases, // URL path, possibly with an alias
        data?: any, // Request data
        config?: AxiosRequestConfig // Additional request configuration
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, data);
        const response = await this.client.put<T>(url, data, config);
        return response;
    }

    // Function for making a PATCH request
    async patch<T>(
        path: string & keyof Aliases, // URL path, possibly with an alias
        data?: any, // Request data
        config?: AxiosRequestConfig // Additional request configuration
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, data);
        const response = await this.client.patch<T>(url, data, config);
        return response;
    }

    // Function for making a DELETE request
    async delete<T>(
        path: string & keyof Aliases, // URL path, possibly with an alias
        params?: any, // Request parameters
        config?: AxiosRequestConfig // Additional request configuration
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, params);
        const response = await this.client.delete<T>(url, config);
        return response;
    }

    // Private function to resolve the actual URL path with aliases
    private resolvePath(path: string & keyof Aliases, params?: any): string {
        const aliasedPath = (this.aliases[path] || path) as string;
        return this.interpolateParams(aliasedPath, params);
    }

    // Private function to interpolate path parameters
    private interpolateParams(
        path: string, // URL path with placeholders
        params?: object | FormData // Request parameters
    ): string {
        if (!params) {
            return path;
        }

        // Replace placeholders in the URL with actual parameter values
        return path.replace(/:(\w+)/g, (_: string, key: string) => {
            const value =
                // Determine the parameter value based on the input type (object or FormData)
                params instanceof FormData ? params.get(key) : params[key];
            return value ? encodeURIComponent(value) : "";
        });
    }
}
