import { useCallback, useEffect, useState } from "react";

import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

import { config } from "@/config/environment";

import { useAuth } from "./useAuth";

type UseAPIResult<T = any> = {
    data: T | null;
    error: string | null;
    loading: boolean;
    request: (config: AxiosRequestConfig) => Promise<void>;
};

function useAPI<T = any>(): UseAPIResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(null);

    const { isAuthenticated, getIdToken } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            getIdToken()
                .then(setToken)
                .catch(() => setToken(null));
        } else {
            setToken(null);
        }
    }, [isAuthenticated, getIdToken]);

    const request = useCallback(
        async (axiosConfig: AxiosRequestConfig) => {
            setLoading(true);
            setError(null);
            setData(null);
            try {
                let finalConfig = {
                    ...axiosConfig,
                    url: config.API_BASE_URL + axiosConfig.url,
                };
                if (token) {
                    finalConfig.headers = {
                        ...finalConfig.headers,
                        Authorization: `Bearer ${token}`,
                    };
                }
                const response: AxiosResponse<T> = await axios(finalConfig);
                setData(response.data);
            } catch (err: any) {
                setError(
                    err.response?.data?.message ||
                        err.message ||
                        "Unknown error"
                );
            } finally {
                setLoading(false);
            }
        },
        [token]
    );

    return { data, error, loading, request };
}

export default useAPI;
