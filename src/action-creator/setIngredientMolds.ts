import { IIngredientMold } from '../../src/interface/IIngredientMold';
import { INormalizedData } from '../../src/interface/INormalizedData';

export const SetIngredientMolds = 'ingredientMolds/set-ingredientMolds';

export const setIngredientMolds = (ingredientMolds : INormalizedData<IIngredientMold>) => {
    return {
        type : SetIngredientMolds,
        payload : { ingredientMolds }
    };
};