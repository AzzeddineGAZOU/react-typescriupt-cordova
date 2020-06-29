import { IMold } from '../../src/interface/IMold';
import { INormalizedData } from '../../src/interface/INormalizedData';
import { IRecovery } from '../../src/interface/IRecovery';
import { IUser } from '../../src/interface/IUser';
import { Identifier } from '../../src/type/Identifier';
import { listUserDeliveredMolds } from './listUserDeliveredMolds';

interface IStoreState {
    users : INormalizedData<IUser>;
    molds : INormalizedData<IMold>;
    recoveries : INormalizedData<IRecovery>;
}

export const getUserTotalDeliveredMold = (state : IStoreState) => (idUser : Identifier) : number => {
    return listUserDeliveredMolds(state)(idUser).length;
};