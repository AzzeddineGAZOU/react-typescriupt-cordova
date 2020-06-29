import { combineReducers } from 'redux';
import addresses from './addresses';
import ingredientMolds from './ingredientMolds';
import ingredients from './ingredients';
import molds from './molds';
import partnerRecoveries from './partnerRecoveries';
import partnershipRequests from './partnershipRequests';
import recoveries from './recoveries';
import rewards from './rewards';
import roles from './roles';
import user from './user';
import users from './users';

export default combineReducers({
    user,
    users,
    roles,
    partnershipRequests,
    addresses,
    molds,
    ingredientMolds,
    ingredients,
    recoveries,
    partnerRecoveries,
    rewards,
});