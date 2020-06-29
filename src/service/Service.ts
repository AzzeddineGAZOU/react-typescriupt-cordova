import { postData } from '../helper/postData';

export default class Service {
    protected baseUrl : string;

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    public async create(body) {
        return await fetch(`${ this.baseUrl }`, postData(body));
    }

    public async findAll() {
        const init = {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${ window.localStorage.getItem('token') }`
            }
        };
        return await fetch(`${ this.baseUrl }`, init);
    }

    public async findOne(id) {
        const init = {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${ window.localStorage.getItem('token') }`
            }
        };
        return await fetch(`${ this.baseUrl }/${ id }`, init);
    }

    public async update(id, body) {
        const init = {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${ window.localStorage.getItem('token') }`
            },
            body : JSON.stringify(body)
        };
        return await fetch(`${ this.baseUrl }/${ id }`, init);
    }

    public async remove(id) {
        const init = {
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${ window.localStorage.getItem('token') }`
            }
        };
        return await fetch(`${ this.baseUrl }/${ id }`, init);
    }
}