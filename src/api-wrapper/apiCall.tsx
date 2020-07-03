import axios, { AxiosRequestConfig } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiGet = async <RES extends any>(
    queryUrl: string,
    axiosOptions?: AxiosRequestConfig
) => {
    const { data } = await axios.get<RES>(queryUrl, {
        ...axiosOptions,
    });
    return data;
};
