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
    FAQ = "/faq",
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
    BUILD_STEP = "/step"
}

export enum SERVICE_AUTH_MODULE {
    SIGNUP = "/signup",
    SIGNIN = "/signin",
    GET_CONNECTED_USER_ID = "/get-connected-user-id",
}
