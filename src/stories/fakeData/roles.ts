import { IRole } from '../../../src/interface/IRole';
import { Identified } from '../../../src/type/Identified';

export const roleUser : Identified<IRole> = {
    id : 1,
    name : 'ROLE_USER'
};

export const rolePartner : Identified<IRole> = {
    id : 2,
    name : 'ROLE_PARTNER',
};

export const roleAdmin : Identified<IRole> = {
    id : 3,
    name : 'ROLE_ADMIN',
};

export const roles : IRole[] = [
    roleAdmin,
    rolePartner,
    roleUser
];