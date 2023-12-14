import axios, { AxiosError, HttpStatusCode } from "axios";

interface header {
    Accept: string,
    "Content-Type": string,
    Authorization?: string
}

async function createHeaders(access_token = null) {
    let headers: header = {
        Accept: "application/json",
        "Content-Type": "application/json",
    };
    if (access_token !== null) {
        headers.Authorization = "Bearer " + access_token;
    }
    return headers;
}

export async function fetch(api: any, postParams = {}, access_token = null) {
    try {
        const { form, url, method } = api
        let base_url = process.env.SUPERYETI_API;
        let objPostParams = { ...form, ...postParams };
        let headers: any = createHeaders(access_token);

        const response = await axios({
            url: `http://${base_url}${url}`,
            method,
            headers,
            data: objPostParams,
        });
        return response
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const axiosError: any = error as AxiosError;
            return { status: HttpStatusCode.Conflict, statusText: axiosError.response?.data?.message ?? "Non - Axios Error" }
        } else {
            return { status: HttpStatusCode.Conflict, statusText: "Non - Axios Error" };
        }
    }
}