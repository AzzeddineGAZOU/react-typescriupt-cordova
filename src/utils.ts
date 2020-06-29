import { INormalizedData } from '../src/interface/INormalizedData';
import { ElementOrIdentifier } from '../src/type/ElementOrIdentifier';
import { FilterFunction } from '../src/type/FilterFunction';
import { Identified } from '../src/type/Identified';
import { Identifier } from '../src/type/Identifier';

export const get = <T>(normalizedData : INormalizedData<T>) => (id : ElementOrIdentifier<T> | undefined) : Identified<T> => {
    return id === undefined || String(id) !== '[object Object]' ? normalizedData.byId[id as Identifier] : normalizedData.byId[(id as Identified<T>).id];
};

export const all = <T>(normalizedData : INormalizedData<T>) : Identified<T>[] => {
    const getElement = get(normalizedData);

    return normalizedData.allIds.map(id => getElement(id));
};

export const filter = <T>(normalizedData : INormalizedData<T>) => (filterFunction : FilterFunction<T>) : Identified<T>[] => {
    return all(normalizedData).filter(filterFunction);
};

export const getEntity = <E>(normalizedData : INormalizedData<E> | undefined) => (id : Identifier) => {
    if (!normalizedData) {
        console.warn(`Sub state not found in store, reducer may not loaded?`);
        throw new Error(`State check failed for sub state.`);
    }

    const entity = get(normalizedData)(id);

    if (!entity) {
        throw new Error(`Entity for id ${ id } is missing in redux state`);
    }

    return entity;
};