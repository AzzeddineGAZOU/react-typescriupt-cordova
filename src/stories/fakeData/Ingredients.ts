import { IIngredient } from '../../../src/interface/IIngredient';
import { Identified } from '../../../src/type/Identified';

export const ingredient1 : Identified<IIngredient> = {
    id : 1,
    contribution : '',
    name : 'peau de banane'
};
export const ingredient2 : Identified<IIngredient> = {
    id : 2,
    contribution : '',
    name : 'epluchure de pomme'
};

export const ingredient3 : Identified<IIngredient> = {
    id : 3,
    contribution : '',
    name : 'epis de mais'
};

export const ingredient4 : Identified<IIngredient> = {
    id : 4,
    contribution : '',
    name : 'Coquilles d\'oeuf'
};

export const ingredients : IIngredient[] = [
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
]
