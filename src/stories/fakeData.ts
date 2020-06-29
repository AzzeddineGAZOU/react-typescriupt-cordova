import { dummyProviderFactory } from '../factories';
import { addresses } from './fakeData/addresses';
import { ingredientMolds } from './fakeData/ingredientMolds';
import { ingredients } from './fakeData/Ingredients';
import { molds } from './fakeData/molds';
import { partnerRecoveries } from './fakeData/partnerRecoveries';
import { partnershipRequests } from './fakeData/partnershipRequests.';
import { recoveries } from './fakeData/recoveries';
import { rewards } from './fakeData/rewards';
import { roles } from './fakeData/roles';
import { users } from './fakeData/users';

export const P = dummyProviderFactory({
    users,
    roles,
    ingredientMolds,
    ingredients,
    molds,
    recoveries,
    partnerRecoveries,
    rewards,
    partnershipRequests,
    addresses,
}, {});