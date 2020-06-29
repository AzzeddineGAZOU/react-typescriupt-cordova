import { postData } from '../helper/postData';
import Service from './Service';

const baseUrl = 'http://5.196.4.56:3000/user';

class UserService extends Service {
    constructor(baseUrl) {
        super(baseUrl);
    }
    

    public async create(body) {
        return await fetch(`${ this.baseUrl }/create`, postData(body));
    }

    async auth(body) {
        return await fetch(`${ baseUrl }/login`, postData(body));
    }

    async resetPassword(body) {
        return await fetch(`${ baseUrl }/passwordReset`, postData(body));
    }

}

const UserServiceInstance = new UserService(baseUrl);

export default UserServiceInstance;