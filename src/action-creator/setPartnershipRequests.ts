import { INormalizedData } from '../../src/interface/INormalizedData';
import { IPartnershipRequest } from '../../src/interface/IPartnershipRequest';

export const SetPartnershipRequests = 'partnershipRequests/set-partnershipRequests';

export const setPartnershipRequests = (partnershipRequests : INormalizedData<IPartnershipRequest>) => {
    return {
        type : SetPartnershipRequests,
        payload : { partnershipRequests }
    };
};