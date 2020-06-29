import { forEach } from 'lodash';
import * as React from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, DeepPartial, ReducersMapObject } from 'redux';
import { INormalizedData } from '../src/interface/INormalizedData';
import { Identified } from '../src/type/Identified';
import { IdentifiedMapObject } from '../src/type/IdentifiedMapObject';
import { normalize } from './normalize';

export interface IData {
    [key : string] : IdentifiedMapObject<any> | Identified<any>[];
}

export interface IState {
    [key : string] : INormalizedData<any>;
}

const dummyReducer = (state = {}) => state;

export const dummyStoreFactory = (data : IData, reducers? : ReducersMapObject) => {
    const state : DeepPartial<any> = {};
    const dataReducers : ReducersMapObject = {};
    forEach(data, (dataSet, key) => {
        state[key] = normalize(dataSet) as any;
        dataReducers[key] = dummyReducer;
    });
    return createStore(reducers ? combineReducers({ ...dataReducers, ...reducers }) : dummyReducer, state);
};

export const dummyProviderFactory = (data : IData, reducers : any) => (props : any) => <Provider store={ dummyStoreFactory(data, reducers) }> { props.children }
</Provider>;