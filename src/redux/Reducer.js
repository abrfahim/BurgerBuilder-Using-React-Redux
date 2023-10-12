import * as ActionType from './ActionType'
import Orders from './../component/order/Orders';

const Ingredient_price ={
    breadSalad: 20,
    breadCheese: 50,
    breadMeat: 90
}

const  INITIAL_STATE = {
    ingredients:[
        {type: 'breadSalad', Amount: 1},
        {type: 'breadCheese', Amount: 1},
        {type: 'breadMeat', Amount: 2},
    ],
    orders : [],
    orderLoading: true,
    orderError: false,
    totalPrice: 80,
    purchaseable: false,
    onClickCheckOut: false,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null,
}

export const  reducer =(state=INITIAL_STATE, action)=>{
    const ingredients = [...state.ingredients];
    switch (action.type) {
        case ActionType.ADD_INGREDIENT:
        for(let item of ingredients){
            if(item.type === action.payload) item.Amount++;
        }
            return{
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice + Ingredient_price[action.payload],
            }

        case ActionType.REMOVE_INGREDIENT:
            for(let item of ingredients){
                if(item.type === action.payload){
                    if(item.Amount <=0) return state;
                    item.Amount--;
                } 
            }
        
            return{
                ...state,
                ingredients: ingredients,
                totalPrice: state.totalPrice - Ingredient_price[action.payload],
            }

        case ActionType.UPDATE_PURCHASEABLE:
            const sum = state.ingredients.reduce((sum, element)=>{
                return sum + element.Amount;
            },0)
            return {
                ...state,
                purchaseable: sum>0
            }

        case ActionType.RESET_INGREDIENT:
            return{
                ...state,
                ingredients:[
                    {type: 'breadSalad', Amount: 1},
                    {type: 'breadCheese', Amount: 1},
                    {type: 'breadMeat', Amount: 2},
                ],
                totalPrice: 80,
                purchaseable: false,
                onClickCheckOut: false,
            }

        case ActionType.LOAD_ORDER:
            let orders = []
            for(let key in action.payload){
                orders.push({
                    ...action.payload[key],
                    id: key,
                })
            }
            return{
                ...state,
                orders: orders,
                orderLoading: false

            }   
        case ActionType.ORDER_LOAD_FAILED:
            return{
                ...state,
                orderError: true,
                orderLoading: false
            }

        case ActionType.AUTH_SUCCESS:
            return{
                ...state,
                token: ActionType.payload.token,
                userId: ActionType.payload.userId
            }
        case ActionType.AUTH_LOGOUT:
            return{
                ...state,
                authFailedMsg: null,
                token: null,
                userId: null,
            }

        case ActionType.AUTH_FAILED:
            return{
                ...state,
                authFailedMsg: action.payload
            }

        default:
           return state
    }
}