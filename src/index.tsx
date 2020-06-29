import * as React from 'react';
import * as  ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { SmartApp } from './App';
import './index.css';
import routeReducer from './reducer';
import createEncryptor from 'redux-persist-transform-encrypt';

const encryptor = createEncryptor({
    secretKey : '$daniDanAmateratsu',
});
const persistConfig = {
    key : 'root',
    storage,
    transforms : [encryptor]
};

const persistedReducer = persistReducer(persistConfig, routeReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);

//work with real data from the database

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate loading={ null } persistor={ persistor }>
            <SmartApp/>
        </PersistGate>
    </Provider>, document.getElementById('root'));



//work with fake data
// ReactDOM.render(<P><SmartApp/></P>, document.getElementById('root'));


