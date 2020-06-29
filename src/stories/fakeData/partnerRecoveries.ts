import { IPartnerRecovery } from '../../../src/interface/IPartnerRecovery';
import { Identified } from '../../../src/type/Identified';
import { recovery1, recovery2 } from './recoveries';
import { partner1, partner2 } from './users';

export const partnerRecovery1 : Identified<IPartnerRecovery> = {
    id : 1,
    idRecovery : recovery1.id,
    idUser : partner1.id,
    pickDate : '11/10/2020'
};

export const partnerRecovery2 : Identified<IPartnerRecovery> = {
    id : 2,
    idRecovery : recovery2.id,
    idUser : partner2.id,
    pickDate : '10/10/2020'
};

export const partnerRecoveries : IPartnerRecovery[] = [
    partnerRecovery1,
    partnerRecovery2
];