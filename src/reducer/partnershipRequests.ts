import { SetPartnershipRequests } from '../action-creator/setPartnershipRequests';

const initialState = [];

const partnershipRequests = (state = initialState, action) => {
    switch (action.type) {
        case SetPartnershipRequests:
            return action.payload.partnershipRequests;

        default:
            return state;
    }
};

export default partnershipRequests;