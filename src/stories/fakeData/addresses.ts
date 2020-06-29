import { IAddress } from '../../../src/interface/IAddress';
import { IPartnerRecovery } from '../../../src/interface/IPartnerRecovery';
import { IPartnershipRequest } from '../../../src/interface/IPartnershipRequest';
import { Identified } from '../../../src/type/Identified';
import { recovery1, recovery2 } from './recoveries';
import { admin1, partner1, partner2, user1, user2 } from './users';

export const address1 : Identified<IAddress> = {
    id : 1,
    address : '2 rue du paradis',
    city : 'Sarcelles',
    idUser : user1.id,
    postcode : 95200,
};

export const address2 : Identified<IAddress> = {
    id : 2,
    address : '2 rue jean jaures',
    city : 'paris',
    idUser : user2.id,
    postcode : 75010,
};

export const address3 : Identified<IAddress> = {
    id : 3,
    address : '2 avenue de la division leclerc',
    city : 'Dugny',
    idUser : partner1.id,
    postcode : 93190,
};

export const address4 : Identified<IAddress> = {
    id : 4,
    address : '2 rue d\'enfer',
    city : 'Trappes',
    idUser : partner2.id,
    postcode : 78190,
};

export const address5 : Identified<IAddress> = {
    id : 5,
    address : '2 rue du paradis',
    city : 'Sarcelles',
    idUser : admin1.id,
    postcode : 95200,
};

export const addresses : IAddress[] = [
    address1,
    address2,
    address3,
    address4,
    address5,
];