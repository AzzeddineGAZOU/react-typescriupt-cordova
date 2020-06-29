import { SetRecoveries } from '../action-creator/setRecoveries';

const initialState = [];

const recoveries = (state  = initialState, action) => {
    switch (action.type) {
        case SetRecoveries:
            return action.payload.recoveries;

        default:
            return state;
    }
};

export default recoveries;