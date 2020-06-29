import { RequestState } from '../../src/type/RequestState';
import { postData } from '../helper/postData';
import Service from './Service';

const baseUrl = 'http://5.196.4.56:3000/partner';

class PartnershipRequestService extends Service {
    constructor(baseUrl) {
        super(baseUrl);
    }

    public async create(body) {
        return await fetch(`http://5.196.4.56:3000/partner/create`, postData(body));
    }

    public async denyOrGrant(id, option : RequestState) {
        const init = {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${ window.localStorage.getItem('token') }`
            }
        };
        const route = option === RequestState.Granted ? 'granted' : 'denied';
        return await fetch(`http://5.196.4.56:3000/partner/${ id }/${ route }`, init);
    }

}

const PartnershipRequestServiceInstance = new PartnershipRequestService(baseUrl);

export default PartnershipRequestServiceInstance;