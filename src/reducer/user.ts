import { SetUser } from '../action-creator/user/setUser';

const initialState = null;

const user = (state = initialState, action : any) => {
    switch (action.type) {
        case SetUser:
            return action.payload.user;

        default:
            return state;
    }
};

export default user;