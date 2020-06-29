import { IReward } from '../../../src/interface/IReward';
import { Identified } from '../../../src/type/Identified';
import { user1 } from './users';

export const reward1 : Identified<IReward> = {
    id : 1,
    idUser : user1.id,
    promoCode : 'LIVRAISON5',
    expirationDate : '22/12/2020',
    reduction : 10,
};

export const reward2 : Identified<IReward> = {
    id : 2,
    idUser : user1.id,
    promoCode : 'LIVRAISON10',
    expirationDate : '22/12/2020',
    reduction : 20
};

export const rewards : IReward[] = [
    reward1,
    reward2,
];