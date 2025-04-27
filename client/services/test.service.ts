/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "./api.service";

async function getPublic(){
    let res;
    try{
        res = await api('/test/all', {
            headers: [
                ['Authorization', `Bearer ${localStorage.getItem('accessToken')}`]
            ]
        })
    }catch(err: any){
        res = {error: 1, status: err.status, message: err.message};
        return res
    }
    return res;
}

async function getPrivate(){
    let res;
    try{
        res = await api('/test/user', {
            headers: [
                ['Authorization', `Bearer ${localStorage.getItem('accessToken')}`]
            ]
        })
    }catch(err: any){
        res = {error: 1, status: err.status, message: err.message};
        return res
    }
    return res;
}

export default {
    getPublic,
    getPrivate
}