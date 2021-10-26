
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING, SUB_SHIPPING} from './constants';

export const addToCart = (id:number) => {
    return {
        type: ADD_TO_CART,
        id
    }
}

export const removeFromCart = (id:number) => {
    return {
        type: REMOVE_ITEM,
        id
    }
}

export const subtractQuantity = (id:number) => {
    return {
        type: SUB_QUANTITY,
        id
    }
}

export const addQuantity = (id:number)  => {
    return {
        type: ADD_QUANTITY,
        id
    }
}

export const addShipping = () => {
    return {
        type: ADD_SHIPPING
    }
}

export const subtractShipping = () => {
    return {
        type: SUB_SHIPPING
    }
}
