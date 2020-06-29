import { SetIngredientMolds } from '../action-creator/setIngredientMolds';

const initialState = [];

const ingredientMolds = (state = initialState, action) => {
    switch (action.type) {
        case SetIngredientMolds:
            return action.payload.ingredientMolds;

        default:
            return state;
    }
};

export default ingredientMolds;