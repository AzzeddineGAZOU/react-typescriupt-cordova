import { forEach } from 'lodash';
import { INormalizedData } from '../src/interface/INormalizedData';
import { Identified } from '../src/type/Identified';
import { IdentifiedMapObject } from '../src/type/IdentifiedMapObject';
import { Identifier } from '../src/type/Identifier';

export const normalize = <T>(data? : IdentifiedMapObject<T> | Identified<T>[]) : INormalizedData<T> => {
    const byId : IdentifiedMapObject<T> = {};
    const allIds : Identifier[] = [];

    if (data) {
        if (data instanceof Map) {
            data.forEach((value, key) => {
                byId[key] = value;
                allIds.push(key);
            });
        } else if (data instanceof Array) {
            data.forEach((value) => {
                const id = value.id;
                byId[id] = value;
                allIds.push(id);
            });
        } else {
            forEach(data, (value, key) => {
                byId[key] = value;
                allIds.push(key);
            });
        }
    }

    return {
        allIds,
        byId,
    };
};