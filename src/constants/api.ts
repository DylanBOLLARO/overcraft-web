import { MODULE_NESTJS, SERVICE_AUTH_MODULE, SERVICE_BUILD_MODULE, VERBES_HTTP } from "./enum";

export const SIGNUP = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.AUTH}${SERVICE_AUTH_MODULE.SIGNUP}`,
};

export const SIGNIN = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.AUTH}${SERVICE_AUTH_MODULE.SIGNIN}`,
};

export const GET_CONNECTED_USER_ID = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.AUTH}${SERVICE_AUTH_MODULE.GET_CONNECTED_USER_ID}`,
};

export const GET_CONNECTED_USER_BUILDS = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.BUILD}${SERVICE_BUILD_MODULE.GET_CONNECTED_USER_BUILDS}`,
};

export const PUBLISH_CONNECTED_USER_BUILD = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.BUILD}`,
};

export const GET_ALL_STEPS_OF_BUILD = {
    method: "post",
    url: "/build-order/get-all-lines",
    form: {}
};

export const SWAP_LINE_UP = {
    method: "post",
    url: "/build-order/swap-line-up",
    form: {}
};


export const SWAP_LINE_DOWN = {
    method: "post",
    url: "/build-order/swap-line-down",
    form: {}
};


export const DELETE_LINE = {
    method: "post",
    url: "/build-order/delete-line",
    form: {}
};

export const GET_INFO_BUILD = {
    method: "post",
    url: "/build-order/get-info-build",
    form: {}
};

export const ADD_NEW_LINE = {
    method: "post",
    url: "/build-order/add-line",
    form: {}
};

export const DELETE_BUILD = {
    method: "post",
    url: "/build-order/delete-build",
    form: {}
};

