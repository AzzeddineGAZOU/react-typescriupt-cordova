import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRole } from '../../src/interface/IRole';

export const SetRoles = 'roles/set-roles';

export const setRoles = (roles : INormalizedData<IRole>) => {
    return {
        type : SetRoles,
        payload : { roles }
    };
};