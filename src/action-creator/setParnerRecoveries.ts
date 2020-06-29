import { INormalizedData } from '../../src/interface/INormalizedData';
import { IPartnerRecovery } from '../../src/interface/IPartnerRecovery';

export const SetPartnerRecoveries = 'partner-recoveries/set-partner-recoveries';

export const setPartnerRecoveries = (partnerRecoveries : INormalizedData<IPartnerRecovery>) => {
    return {
        type : SetPartnerRecoveries,
        payload : { partnerRecoveries}
    };
};