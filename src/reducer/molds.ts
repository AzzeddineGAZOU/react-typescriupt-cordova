import { SetMolds } from '../action-creator/setMolds';

const initialState = [];

const molds = (state  = initialState, action) => {
    switch (action.type) {
        case SetMolds:
            return action.payload.molds;

        default:
            return state;
    }
};

export default molds;