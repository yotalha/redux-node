const redux = require('redux');
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOKED';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const ICECREAM_RESTOCKED = 'ICECREAM_RESTOCKED';


function orderCake(){
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake(qty = 1){
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

function orderIceCream(qty = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty = 1){
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}



// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// }

const intialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCreams: 20
}

// (previousState, action) => newState

// writing reducer

const cakeReducer = (state = intialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes -1
            }
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case ICECREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload
            }
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer)
console.log('initial state ', store.getState())

const unsubscribe = store.subscribe(() => console.log('udpated state ', store.getState()))

// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

// Not so useful now , all it does is it binds the functions to dispatch so the code looks a little cleaner

const actions = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch)

actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(4)
actions.orderIceCream(4)
actions.restockIceCream(5)



unsubscribe()

