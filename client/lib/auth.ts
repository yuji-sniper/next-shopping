import axios, { AxiosResponse } from "axios"
import Cookies from "js-cookie"

// 新規ユーザー作成
interface UserRegisterData {
    username: string
    email: string
    password: string
}

interface UserLoginData {
    identifier: string
    password: string
}

export const registerUser = async (formData: UserRegisterData): Promise<AxiosResponse|undefined> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, formData)
        Cookies.set("token", response.data.jwt, { expires: 7 })
        return response
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (formData: UserLoginData): Promise<AxiosResponse|undefined> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, formData)
        Cookies.set("token", response.data.jwt, { expires: 7 })
        return response
    } catch (error) {
        console.log(error)
    }
}