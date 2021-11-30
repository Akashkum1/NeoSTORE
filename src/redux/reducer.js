import { LOGIN, LOGOUT } from "./actiontypes";


const intialState = {};

 const Reducer = (state = intialState, action) => {
    
    switch (action.type) {
        
        case LOGIN: 
            return {
                ...state,
                token: action.payload.token,
                loggedIn: true,
                cartId: action.payload.cartId,
                userId: action.payload.userId,
            };
        case LOGOUT:
            return {};

        default:
            return state;
    }
    
}

export default Reducer;
