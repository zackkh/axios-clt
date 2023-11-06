import { AxiosError, AxiosResponse } from "axios";

export function isResponseSuccessful<T>(
    response?: AxiosResponse<T> | null
): boolean {
    return response ? response.status >= 200 && response.status < 300 : false;
}

export function isResponseFail<T>(response?: AxiosResponse<T> | null): boolean {
    return response ? response.status >= 400 : false;
}

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
