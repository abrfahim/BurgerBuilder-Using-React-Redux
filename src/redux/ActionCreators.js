import *as ActionType from './ActionType'
import axios from 'axios'

export const addIngredient = igType =>{
    return{
        type: ActionType.ADD_INGREDIENT,
        payload: igType,
    }
}

export const removeIngredient = igType =>{
    return{
        type: ActionType.REMOVE_INGREDIENT,
        payload: igType
    }
}

export const updatePurchaseable = () =>{
    return{
        type: ActionType.UPDATE_PURCHASEABLE,
    }
}

export const resetIngredient =()=>{
    return{
        type:ActionType.RESET_INGREDIENT
    }
}

export const loadOrder=orders=>{
    return{
        type: ActionType.LOAD_ORDER,
        payload: orders
    }
}

export const orderLoadFailed = ()=>{
    return{
        type: ActionType.ORDER_LOAD_FAILED
    }
}

export const fetchOrder=()=>{
    dispatch=>{
        axios.get("https://burger-builder-d615a-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json")
        .then(res=>{
            dispatch(loadOrder(res.data))
        })
        .catch(error=>{
            dispatch(orderLoadFailed())
        })

    }
}