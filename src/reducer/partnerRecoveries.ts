import { SetPartnerRecoveries } from '../action-creator/setParnerRecoveries';

const initialState = [];

const partnerRecoveries = (state  = initialState, action) => {
    switch (action.type) {
        case SetPartnerRecoveries:
            return action.payload.partnerRecoveries;

        default:
            return state;
    }
};

export default partnerRecoveries;