import { IIngredient } from '../../src/interface/IIngredient';
import { INormalizedData } from '../../src/interface/INormalizedData';

export const SetIngredients = 'ingredients/set-ingredients';

export const setIngredients = (ingredients : INormalizedData<IIngredient>) => {
    return {
        type : SetIngredients,
        payload : { ingredients }
    };
};