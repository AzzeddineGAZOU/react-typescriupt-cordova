export const postData = (body) => {
    return {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${ window.localStorage.getItem('token') }`
        },
        body : JSON.stringify(body)
    };
};