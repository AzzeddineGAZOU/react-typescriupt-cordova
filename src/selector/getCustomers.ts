import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRole } from '../../src/interface/IRole';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import { filter } from '../utils';

interface IStoreState {
    users : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
}

export const getCustomers = (state : IStoreState) : Identified<IUser>[] => {
    const userRole = filter(state.roles)(role => role.name === 'ROLE_USER');
    return filter(state.users)(user => user.idRole === userRole[0].id);
};