export const SIGNUP = {
    method: "post",
    url: "/auth/signup",
    form: {}
};

export const SIGNIN = {
    method: "post",
    url: "/auth/signin",
    form: {}
};

export const GET_ALL_BUILDS_OF_USER = {
    method: "post",
    url: "/build-order/get-all-build",
    form: {}
};

export const PUBLISH_BUILD = {
    method: "post",
    url: "/build-order/new-build",
    form: {}
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