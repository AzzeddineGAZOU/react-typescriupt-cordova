import { IAddress } from '../../src/interface/IAddress';
import { INormalizedData } from '../../src/interface/INormalizedData';

export const SetAddresses = 'address/set-addresses';

export const setAddresses = (addresses : INormalizedData<IAddress>) => {
    return {
        type : SetAddresses,
        payload : { addresses }
    };
};