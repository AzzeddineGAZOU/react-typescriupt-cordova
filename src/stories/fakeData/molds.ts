import { IMold } from '../../../src/interface/IMold';
import { Identified } from '../../../src/type/Identified';
import { user1, user2 } from './users';

export const mold1 : Identified<IMold> = {
    compositionDate : '22/12/2020',
    id : 1,
    idUser : user1.id,
    name : 'mold1',
    pickUpAddress : '28 rue du paradis 95200 Sarcelles',
    quantity : 300,
    pickable : true,
};

export const mold2 : Identified<IMold> = {
    compositionDate : '25/12/2020',
    id : 2,
    idUser : user1.id,
    pickUpAddress : '20 rue d\'enfer 91240 Saint-Michel-Sur-Orge',
    name : 'mold2',
    quantity : 120,
    pickable : true
};

export const molds : IMold[] = [
    mold1,
    mold2,
];