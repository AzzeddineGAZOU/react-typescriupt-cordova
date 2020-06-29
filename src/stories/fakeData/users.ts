import { IUser } from '../../../src/interface/IUser';
import { Identified } from '../../../src/type/Identified';
import { roleAdmin, rolePartner, roleUser } from './roles';

export const user1 : Identified<IUser> = {
    email : 'allan@gmail.com',
    firstname : 'allan',
    id : 1,
    idRole : roleUser.id,
    lastname : 'lessort',
    password : 'dada',
    username : 'allan',
};

export const user2 : Identified<IUser> = {
    email : 'jean@gmail.com',
    firstname : 'jean',
    id : 2,
    idRole : roleUser.id,
    lastname : 'bon',
    password : 'dada',
    username : 'jean',
};

export const partner1 : Identified<IUser> = {
    email : 'allan@gmail.com',
    firstname : 'daniel',
    id : 3,
    idRole : rolePartner.id,
    lastname : 'bebli',
    password : 'dada',
    username : 'dani',
};

export const admin1 : Identified<IUser> = {
    email : 'widad@gmail.com',
    firstname : 'widad',
    id : 4,
    idRole : roleAdmin.id,
    lastname : 'azis',
    password : 'dada',
    username : 'wiwi',
};

export const partner2 : Identified<IUser> = {
    email : 'allan@gmail.com',
    firstname : 'azzedine',
    id : 5,
    idRole : rolePartner.id,
    lastname : 'azzedine',
    password : 'dada',
    username : 'azz',
};

export const users : IUser[] = [
    user1,
    user2,
    partner1,
    admin1,
    partner2,
];

