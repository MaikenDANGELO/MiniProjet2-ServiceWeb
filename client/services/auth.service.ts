/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "./api.service";

async function signin(email: string, password: string){
    let res: any;
    try{
        res = await api("/auth/signin", {
            method: 'POST',
            body: {
                emailId: email,
                password: password,
            }
        })
    }catch (err: any){
        res = {error: 1, status: err.status, message: err.message};
        return res;
    }
    if(res){
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
    }
    return res;
}

async function signup(firstName: string, lastName: string, email: string, password: string){
    let res;
    try{
        res = await api("/auth/signup", {
            method: 'POST',
            body: {
                firstName: firstName,
                lastName: lastName,
                emailId: email,
                password: password,
            }
        })
    }catch (err: any){
        res = {error: 1, status: err.status, message: err.message};
        return res;
    }
    return res;
}

export default {
    signin,
    signup,
}