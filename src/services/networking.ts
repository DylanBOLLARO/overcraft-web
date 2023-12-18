import axios, { AxiosError, HttpStatusCode } from "axios";
import { ADD_NEW_LINE, DELETE_BUILD, DELETE_LINE, GET_ALL_BUILDS_OF_USER, GET_ALL_STEPS_OF_BUILD, GET_INFO_BUILD, SWAP_LINE_DOWN, SWAP_LINE_UP } from "../constants/api";

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
        let base_url = "localhost:3001";
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

export async function fetch_builds_list() {
    const { data }: any = await fetch(
        GET_ALL_BUILDS_OF_USER,
        { id: "1" },
        null,
    );
    console.log("fetch_builds_list: " + data);
    return data;
}

export async function fetch_all_steps(id: any) {
    const { data }: any = await fetch(
        GET_ALL_STEPS_OF_BUILD,
        { id },
        null,
    );
    console.log("fetch_all_steps: " + data);
    return data
}

export async function swap_line_up(id: string, buildId: string) {
    await fetch(
        SWAP_LINE_UP,
        { table: "buildStep", id, buildId },
        null,
    );
    console.log("swap_line_up: ");
}

export async function swap_line_down(id: string, buildId: string) {
    await fetch(
        SWAP_LINE_DOWN,
        { table: "buildStep", id, buildId },
        null,
    );
    console.log("swap_line_down: ");
}

export async function delete_line(id: string, buildId: string) {
    await fetch(
        DELETE_LINE,
        { table: "buildStep", id, buildId },
        null,
    );
    console.log("delete_line: ");
}

export async function get_info_build(id: string) {
    console.log("get_info_build: ");
    const { data }: any = await fetch(
        GET_INFO_BUILD,
        { id },
        null,
    );
    return data
}

export async function add_new_line(data_new_line: any) {
    const { desc, population, timer, buildName_id, position } = data_new_line;
    console.log(desc, population, timer, buildName_id, position);

    await fetch(
        ADD_NEW_LINE,
        { ...data_new_line },
        null,
    );
}

export async function delete_build(id: any) {
    console.log(id);
    console.log(DELETE_BUILD);

    await fetch(
        DELETE_BUILD,
        { id: "" + id },
        null,
    );
    console.log("delete_build");
}

