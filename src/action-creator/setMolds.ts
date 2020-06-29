import { IMold } from '../../src/interface/IMold';
import { INormalizedData } from '../../src/interface/INormalizedData';

export const SetMolds = 'molds/set-molds';

export const setMolds = (molds : INormalizedData<IMold>) => {
    return {
        type : SetMolds,
        payload : { molds }
    };
};