import apiClient from '../utils/api-client'

export async function signup(user, profile){
    const body = new FormData()
    body.append("name", user.name)
    body.append("email", user.email)
    body.append("password", user.password)
    body.append("deliveryAddress", user.address)
    if (profile) {
        body.append("profilePic", profile)
    }

    const { data } = await apiClient.post("/user/signup", body)
    localStorage.setItem("token", data.token)
    return data.token
}

export async function login(user){
    const { data } = await apiClient.post("/user/login", user)
    localStorage.setItem("token", data.token)
    return data.token
}

export function getJWT(){
    return localStorage.getItem("token")
}

