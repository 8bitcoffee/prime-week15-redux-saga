import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.jsx';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put, take } from 'redux-saga/effects';
import axios from 'axios';

const elementList = (state = [], action) => {
    switch (action.type) {
        case 'SET_ELEMENTS':
            return action.payload;
        default:
            return state;
    }
};

// Sagas are generator functions
function* fetchElements(){
    try {
        // Try everything, if no errors then we're good
        const response = yield axios.get('/api/element');
        //! No need to use .then because the pause happens automatically
        // Dispatch an action 
        //! make sure the type is different than the saga action type!
        const action = {
            type: 'SET_ELEMENTS',
            payload: response.data
        };
        yield put(action);
    }
    catch (error) {
        // ANY errors will trigger the catch
        console.log("Error fetching elements", error);
        alert("Something went wrong. Check console");
    }
}

function* postElement(action){
    try {
        // Sends the data to the server
        yield axios.post('/api/element', action.payload);
        // Go get the updated list of elements
        yield put({type: "FETCH_ELEMENTS"});
    }
    catch (error) {
        console.error("Error posting element", error);
        alert("Something went wrong");
    }
}

const planets = (state = [], action) => {
    switch (action.type){
        case "SET_PLANETS":
            return action.payload;
        default:
            return state;
    }
}

function* getPlanets() {
    try {
        const response = yield axios.get('https://swapi.dev/api/planets');
        console.log(response.data.results);
        yield put({type: "SET_PLANETS", payload: response.data.results});
    }
    catch (error) {
        console.error("Error in getPlanets", error);
        alert("Something went wrong");
    }
}

// this is the saga that will watch for actions
function* rootSaga() {
    // Add all sagas here
    yield takeEvery('FETCH_ELEMENTS', fetchElements);
    yield takeEvery("ADD_ELEMENT", postElement);
    yield takeEvery("FETCH_PLANETS", getPlanets);
}

const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const storeInstance = createStore(
    // This function is our first reducer
    // reducer is a function that runs every time an action is dispatched
    combineReducers({
        elementList,
        planets
    }),
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>
);