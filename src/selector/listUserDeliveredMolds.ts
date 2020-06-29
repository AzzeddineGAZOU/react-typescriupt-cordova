import { IMold } from '../../src/interface/IMold';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRecovery } from '../../src/interface/IRecovery';
import { IUser } from '../../src/interface/IUser';
import { Identified } from '../../src/type/Identified';
import { Identifier } from '../../src/type/Identifier';
import { RecoveryState } from '../../src/type/RecoveryState';
import { filter } from '../utils';

interface IStoreState {
    users : INormalizedData<IUser>;
    molds : INormalizedData<IMold>;
    recoveries : INormalizedData<IRecovery>;
}

export const listUserDeliveredMolds = (state : IStoreState) => (idUser : Identifier) : Identified<IMold>[] => {
    const userMolds = filter(state.molds)((mold) => mold.idUser === idUser);
    const userMoldIds = userMolds.map(mold => mold.id);
    const deliveredMolds = filter(state.recoveries)((recovery) => recovery.recoveryState === RecoveryState.Delivered && userMoldIds.includes(recovery.idMold));
    const deliveredMoldIds = deliveredMolds.map(recovery => recovery.idMold);
    return userMolds.filter(mold => deliveredMoldIds.includes(mold.id));
};