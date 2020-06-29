import { IRecovery } from '../../../src/interface/IRecovery';
import { Identified } from '../../../src/type/Identified';
import { RecoveryState } from '../../../src/type/RecoveryState';
import { mold1, mold2 } from './molds';

export const recovery1 : Identified<IRecovery> = {
    id : 1,
    idMold : mold1.id,
    recoveryNumber : '15204',
    recoveryState : RecoveryState.NotTaken,
};

export const recovery2 : Identified<IRecovery> = {
    id : 2,
    idMold : mold2.id,
    recoveryNumber : '15204',
    recoveryState : RecoveryState.Taken,
};

export const recoveries : IRecovery[] = [
    recovery1,
    recovery2,
];