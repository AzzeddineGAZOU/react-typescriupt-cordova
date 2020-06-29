import { IIngredientMold } from '../../../src/interface/IIngredientMold';
import { Identified } from '../../../src/type/Identified';
import { ingredient1, ingredient2, ingredient3, ingredient4 } from './Ingredients';
import { mold1, mold2 } from './molds';

export const ingredientMold1 : Identified<IIngredientMold> = {
    id : 1,
    idIngredient : ingredient1.id,
    idMold : mold1.id,
};
export const ingredientMold2 : Identified<IIngredientMold> = {
    id : 2,
    idIngredient : ingredient2.id,
    idMold : mold1.id,
};
export const ingredientMold3 : Identified<IIngredientMold> = {
    id : 3,
    idIngredient : ingredient3.id,
    idMold : mold1.id,
};

export const ingredientMold4 : Identified<IIngredientMold> = {
    id : 4,
    idIngredient : ingredient4.id,
    idMold : mold2.id,
};

export const ingredientMold5 : Identified<IIngredientMold> = {
    id : 5,
    idIngredient : ingredient1.id,
    idMold : mold2.id,
};

export const ingredientMolds : IIngredientMold[] = [
    ingredientMold1,
    ingredientMold2,
    ingredientMold3,
    ingredientMold4,
    ingredientMold5,
]
