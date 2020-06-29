import { RecoveryState } from '../../src/type/RecoveryState';

export const getRecoveryStateLabel = (recoveryState : RecoveryState) => {
    return recoveryState === RecoveryState.NotTaken ? 'Non pris en charge' :
        recoveryState === RecoveryState.Taken ? 'Pris en charge' :
            recoveryState === RecoveryState.Delivered ? 'Livré'
                : recoveryState === RecoveryState.InTransit ? 'En transit' :
                recoveryState === RecoveryState.Invalid ? 'colis invalide' : 'envoyé';
};