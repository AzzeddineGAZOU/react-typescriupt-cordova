import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRecovery } from '../../src/interface/IRecovery';

export const SetRecoveries = 'recoveries/set-recoveries';

export const setRecoveries = (recoveries : INormalizedData<IRecovery>) => {
    return {
        type : SetRecoveries,
        payload : { recoveries }
    };
};