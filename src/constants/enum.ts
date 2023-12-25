export enum VIEW {
    BUILD,
    DRAFT,
    UPDATE,
}

export enum STYLE_VIEW {
    LINE,
    SQUARE,
}

export enum pagePath {
    HOME = "/",
    DOCUMENTATION = "/documentation",
    DASHBOARD = "/dashboard/builds",
    SIGNIN = "/login",
    UPDATE = "/update",
}
export enum VERBES_HTTP {
    GET = "GET",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE",
}

export enum MODULE_NESTJS {
    BUILD = "/build",
    AUTH = '/auth',
    USER = "/user",
    BUILD_STEP = "/build_step"
}

export enum SERVICE_BUILD_MODULE {
    GET_CONNECTED_USER_BUILDS = "/me",
    PUBLISH_CONNECTED_USER_BUILD = "/me",
}

export enum SERVICE_AUTH_MODULE {
    SIGNUP = "/signup",
    SIGNIN = "/signin",
    GET_CONNECTED_USER_ID = "/get-connected-user-id",
}

export enum SERVICE_USER_MODULE { }

export enum SERVICE_BUILD_STEP_MODULE { }


