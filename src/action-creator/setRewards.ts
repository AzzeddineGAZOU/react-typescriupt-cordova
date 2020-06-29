import { INormalizedData } from '../../src/interface/INormalizedData';
import { IReward } from '../../src/interface/IReward';

export const SetRewards = 'rewards/set-rewards';

export const setRewards = (rewards : INormalizedData<IReward>) => {
    return {
        type : SetRewards,
        payload : { rewards }
    };
};