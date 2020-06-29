import { postData } from '../helper/postData';
import Service from './Service';

const baseUrl = 'http://5.196.4.56:3000/recovery';

class RecoveryService extends Service {
    constructor(baseUrl) {
        super(baseUrl);
    }

    async pick(body) {
        return await fetch(`http://5.196.4.56:3000/recovery/pick`, postData(body));
    }

    async leave(body) {
        return await fetch(`http://5.196.4.56:3000/recovery/leave`, postData(body));
    }

    async validate(body) {
        return await fetch(`http://5.196.4.56:3000/recovery/validate`, postData(body));
    }

    async invalidate(body) {
        return await fetch(`http://5.196.4.56:3000/recovery/invalidate`, postData(body));
    }

}

const RecoveryServiceInstance = new RecoveryService(baseUrl);

export default RecoveryServiceInstance;