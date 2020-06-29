import { INormalizedData } from '../../src/interface/INormalizedData';
import { IPartnerRecovery } from '../../src/interface/IPartnerRecovery';
import { IRecovery } from '../../src/interface/IRecovery';
import { IUser } from '../../src/interface/IUser';
import { Identifier } from '../../src/type/Identifier';
import { RecoveryState } from '../../src/type/RecoveryState';
import { filter } from '../utils';

interface IStoreState {
    users : INormalizedData<IUser>;
    recoveries : INormalizedData<IRecovery>;
    partnerRecoveries : INormalizedData<IPartnerRecovery>;
}

export const getUserTotalMoldPicked = (state : IStoreState) => (idUser : Identifier) : number => {
    const partnerRecoveries = filter(state.partnerRecoveries)(partnerRecovery => partnerRecovery.idUser === idUser);
    const partnerRecoveryIds = partnerRecoveries.map(partnerRecovery => partnerRecovery.idRecovery);
    return filter(state.recoveries)(recovery => partnerRecoveryIds.includes(recovery.id) && recovery.recoveryState === RecoveryState.Delivered).length;
};