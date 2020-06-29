import { SetAddresses } from '../action-creator/setAddresses';

const initialState = [];

const addresses = (state = initialState, action) => {
    switch (action.type) {
        case SetAddresses:
            return action.payload.addresses;

        default:
            return state;
    }
};

export default addresses;