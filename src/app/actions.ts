'use server'

import { cookies } from 'next/headers'

export async function create(data: any) {
    cookies().set({
        name: "overcraft_jwt",
        value: data.value,
        httpOnly: true,
        path: '/',
    })
}

export async function getCookie() {
    return cookies().get('overcraft_jwt')?.value
}

export async function deleteCookie() {
    cookies().delete('overcraft_jwt')
}

