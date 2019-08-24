import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/index'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

const initialState =  {
    deadline: new Date('jan 3, 2099 15:37:55').getTime(),
    progressColor: '#FC9F5B',
    backColor: '#010400',
    background: '#ffffff',
    countdownName: 'Countdown',
    textColor: '#000000',
};

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 
   };

const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = [thunk];

export const store = createStore(pReducer, initialState, applyMiddleware(...middleware));
export const persistor = persistStore(store);
