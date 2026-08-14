import api from "../../../services/api"

export async function register(registerData){
    const response = await api.post('/auth/register',registerData)

    return response
}

export async function login(loginData){
    const response = await api.post('/auth/login',loginData)
    
    return response.data
}

export async function getMe(){
    const response = await api.get('/auth/me')
    
    return response.data
}

export async function logout(){
    const response = await api.get('/auth/logout')

    return response.data
}