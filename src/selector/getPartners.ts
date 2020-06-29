import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRole } from '../../src/interface/IRole';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import { filter } from '../utils';

interface IStoreState {
    users : INormalizedData<IUser>;
    roles : INormalizedData<IRole>;
}

export const getPartners = (state : IStoreState) : Identified<IUser>[] => {
    const partnerRole = filter(state.roles)(role => role.name === 'ROLE_PARTNER');
    return filter(state.users)(user => user.idRole === partnerRole[0].id);
};