import { IMail } from '../../src/interface/IMail';

export const contactUser = async (body : IMail) => {
    const init = {
        method : 'post',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${ window.localStorage.getItem('token') }`
        },
        body : JSON.stringify(body)
    };
    return await fetch(`http://5.196.4.56:3000/sendMail`, init);
};