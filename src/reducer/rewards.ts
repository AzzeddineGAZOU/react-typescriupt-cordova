import { SetRecoveries } from '../action-creator/setRecoveries';
import { SetRewards } from '../action-creator/setRewards';

const initialState = [];

const rewards = (state  = initialState, action) => {
    switch (action.type) {
        case SetRewards:
            return action.payload.rewards;

        default:
            return state;
    }
};

export default rewards;