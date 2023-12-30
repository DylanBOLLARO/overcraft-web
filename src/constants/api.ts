import { MODULE_NESTJS, SERVICE_AUTH_MODULE, VERBES_HTTP } from "./enum";

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
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.BUILD}`,
};

export const PUBLISH_CONNECTED_USER_BUILD = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.BUILD}`,
};

export const GET_ALL_STEPS_OF_BUILD_BY_BUILD_ID = {
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.BUILD_STEP}`,
};

export const ADD_STEP_OF_BUILD = {
    method: VERBES_HTTP.POST,
    url: `${MODULE_NESTJS.BUILD_STEP}`,
};

export const DELETE_BUILD = {
    method: VERBES_HTTP.DELETE,
    url: `${MODULE_NESTJS.BUILD}`,
};

export const MOVE_STEP_IN_BUILD_STEPS = {
    method: VERBES_HTTP.PATCH,
    url: `${MODULE_NESTJS.BUILD_STEP}/move-position`,
};

export const DELETE_STEP_IN_BUILD_STEPS = {
    method: VERBES_HTTP.DELETE,
    url: `${MODULE_NESTJS.BUILD_STEP}`,
};

export const PATCH_BUILD = {
    method: VERBES_HTTP.PATCH,
    url: `${MODULE_NESTJS.BUILD}`,
};

export const GET_ALL_PUBLICS_BUILDS = {
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.BUILD}`,
};

export const GET_PUBLIC_BUILD_BY_ID = {
    method: VERBES_HTTP.GET,
    url: `${MODULE_NESTJS.BUILD}`,
};
