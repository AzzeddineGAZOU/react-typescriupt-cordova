import { SetIngredients } from '../action-creator/setIngredients';

const initialState = [];

const ingredients = (state = initialState, action) => {
    switch (action.type) {
        case SetIngredients:
            return action.payload.ingredients;

        default:
            return state;
    }
};

export default ingredients;