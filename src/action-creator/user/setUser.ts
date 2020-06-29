import { INormalizedData } from '../../../src/interface/INormalizedData';
import { IUser } from '../../../src/interface/IUser';

export const SetUser = 'user/set-user';

export const setUser = (user : INormalizedData<IUser>) => {
    return {
        type : SetUser,
        payload : { user }
    };
};