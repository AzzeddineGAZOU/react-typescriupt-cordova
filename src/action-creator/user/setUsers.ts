import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IUser } from '../../../src/interface/IUser';

export const SetUsers = 'users/set-users';

export const setUsers = (users : INormalizedData<IUser>) => {
    return {
        type : SetUsers,
        payload : { users }
    };
};