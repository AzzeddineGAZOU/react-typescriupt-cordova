import { SetRoles } from '../action-creator/setRoles';

const initialState = [];

const roles = (state  = initialState, action) => {
    switch (action.type) {
        case SetRoles:
            return action.payload.roles;

        default:
            return state;
    }
};

export default roles;