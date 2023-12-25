'use server'

import axios from 'axios'
import { cookies } from 'next/headers'
import { absoluteUrlApi } from './utils'
import { GET_CONNECTED_USER_BUILDS, GET_CONNECTED_USER_ID, PUBLISH_CONNECTED_USER_BUILD, SIGNIN, SIGNUP } from '../constants/api'
import { COOKIE_NAME } from '../constants/variable'

export async function create_cookie(value: any) {
    cookies().set({
        name: COOKIE_NAME,
        value,
        httpOnly: true,
        path: '/',
    })
}

export async function getCookie() {
    return cookies().get(COOKIE_NAME)?.value
}

export async function deleteCookie() {
    cookies().delete(COOKIE_NAME)
}

export const base_query_axios = async (api: any, postParams: any = null, useJwt: boolean = false) => {
    const { url, method, form } = api
    let objPostParams = { ...form, ...postParams, };
    let jwt;
    try {
        if (useJwt) {
            jwt = await getCookie();
            if (!jwt) throw new Error("No JWT in the request header.");
        }
        const options = {
            method,
            url: absoluteUrlApi(url),
            headers: {
                Authorization: `Bearer ${jwt ?? ""}`,
            },
            data: objPostParams,
        };
        const { data }: any = await axios.request(options);
        if (!data) throw new Error("Invalid response to the request.");
        return data
    } catch (error: any) {
        console.log(error);
    }
};

export const signin = async (values: any) => {
    try {
        const tokens = await base_query_axios(SIGNIN, values);
        if (!tokens) throw new Error("No tokens returned by the API during connection; authentication not possible.");
        await create_cookie(tokens.access_token);
        return tokens
    } catch (error) {
        console.log(error);
    }
};

export const signup = async (values: any) => {
    try {
        const tokens = await base_query_axios(SIGNUP, values);
        if (!tokens) throw new Error("No tokens returned by the API during connection; authentication not possible.");
        return tokens
    } catch (error) {
        console.log(error);
    }
};

export const get_connected_user_id = async () => {
    try {
        const data = await base_query_axios(GET_CONNECTED_USER_ID, null, true);
        if (!data) throw new Error("No user ID returned by the API during connection; authentication not possible.");
        const { sub: user_id } = data
        return user_id
    } catch (error) {
        console.log(error);
    }

};

export const get_connected_user_builds = async () => {
    try {
        const user_id = get_connected_user_id();
        return await base_query_axios(GET_CONNECTED_USER_BUILDS, { user_id }, true);
    } catch (error) {
        console.log(error);
    }
};

export const publish_connected_user_build = async (name_of_build: string) => {
    try {
        const user_id = get_connected_user_id();
        return await base_query_axios(PUBLISH_CONNECTED_USER_BUILD, { title: name_of_build }, true);
    } catch (error) {
        console.log(error);
    }
};