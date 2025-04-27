const fetch = $fetch.create({
    baseURL: "http://localhost:3001"
})

export const api = async (route: string, options: {}) => {
    let res;
    try{
        res = await fetch(route, options);
    }catch(err: any){
            try{
                let newTokens: any;
                newTokens = await fetch('/auth/refreshtoken', {
                    method: 'POST',
                    body: {
                        refreshToken: localStorage.getItem('refreshToken'),
                    }
                })
                localStorage.setItem('accessToken', newTokens.accessToken);
                localStorage.setItem('refreshToken', newTokens.refreshToken);
                
                res = await fetch(route, options);
            }catch(err: any){
                res =  {error: 1, status: err.status, message: err.message};
            }
    }
    return res;
}