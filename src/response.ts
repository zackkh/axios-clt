import { AxiosError, AxiosResponse } from "axios";

/**
 * Check wether axios response has a successful http status code
 * @param response - an instance of axios response
 */
export function isResponseSuccessful<T>(
    response?: AxiosResponse<T> | null
): boolean {
    return response ? response.status >= 200 && response.status < 300 : false;
}

/**
 * Check wether axios response has an error http status code
 * @param response - an instance of axios response
 */
export function isResponseFail<T>(response?: AxiosResponse<T> | null): boolean {
    return response ? response.status >= 400 : false;
}

/**
 * Adds a response object if error is missing one
 * @param error - an instance of axios error
 */
export function fixErrorResponse(error: AxiosError): AxiosError {
    if (error.response) {
        return error;
    }

    // @ts-ignore
    error.response = {
        status: 503,
        statusText: "Server is not responding.",
        data: undefined,
    };
    return error;
}
