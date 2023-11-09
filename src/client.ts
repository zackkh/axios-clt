import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Configuration interface for the AxiosClient class
interface AxiosClientConfig<Aliases = Record<string, string>> {
    // Configuration options for Axios
    config: AxiosRequestConfig;
    // Aliases for URL paths
    aliases: Aliases;
}

// AxiosClient class for making HTTP requests
export default class AxiosClient<Aliases = Record<string, string>> {
    private client: AxiosInstance;
    private aliases: Aliases;

    // Constructor for initializing the AxiosClient
    constructor(options: AxiosClientConfig<Aliases>) {
        const { config, aliases } = options;

        // Create an Axios instance with the provided configuration
        this.client = axios.create({
            ...config,
        });

        this.aliases = aliases;
    }

    /**
     * Function for making a GET request
     * @param path - Path alias
     * @param params - Request parameters
     * @param config - Additional request configuration
     * @returns axios response
     */
    async get<T>(
        path: string & keyof Aliases,
        params?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, params);
        const response = await this.client.get<T>(url, config);
        return response;
    }

    /**
     * Function for making a POST request
     * @param path - Path alias
     * @param data - Request data
     * @param config - Additional request configuration
     * @returns axios response
     */
    async post<T>(
        path: string & keyof Aliases,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, data);
        const response = await this.client.post<T>(url, data, config);
        return response;
    }

    /**
     * Function for making a PUT request
     * @param path - Path alias
     * @param data - Request data
     * @param config - Additional request configuration
     * @returns axios response
     */
    async put<T>(
        path: string & keyof Aliases,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, data);
        const response = await this.client.put<T>(url, data, config);
        return response;
    }

    /**
     * Function for making a PATCH request
     * @param path - Path alias
     * @param data - Request data
     * @param config - Additional request configuration
     * @returns axios response
     */
    async patch<T>(
        path: string & keyof Aliases,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, data);
        const response = await this.client.patch<T>(url, data, config);
        return response;
    }

    /**
     * Function for making a POST request
     * @param path - Path alias
     * @param params - Request parameters
     * @param config - Additional request configuration
     * @returns axios response
     */
    async delete<T>(
        path: string & keyof Aliases,
        params?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        const url = this.resolvePath(path, params);
        const response = await this.client.delete<T>(url, config);
        return response;
    }

    /**
     * Private function to resolve the actual URL path with aliases
     * @param path - Path alias
     * @param params - Request parameters
     * @returns interpolated path
     */
    private resolvePath(path: string & keyof Aliases, params?: any): string {
        const aliasedPath = (this.aliases[path] || path) as string;
        return this.interpolateParams(aliasedPath, params);
    }

    /**
     * Private function to interpolate path parameters
     * @param path - URL path with placeholders
     * @param params - Request parameters
     * @returns interpolated path
     */
    private interpolateParams(
        path: string,
        params?: object | FormData
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
