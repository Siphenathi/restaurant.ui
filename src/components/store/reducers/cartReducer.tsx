import Item1 from '../../../images/item1.jpg';
import Item2 from '../../../images/item2.jpg';
import Item3 from '../../../images/item3.jpg';
import Item4 from '../../../images/item4.jpg';
import Item5 from '../../../images/item5.jpg';
import Item6 from '../../../images/item6.jpg';
import StoreModel from '../storeModel';

import { ADD_TO_CART, REMOVE_ITEM, SUB_QUANTITY, ADD_QUANTITY, ADD_SHIPPING, SUB_SHIPPING } from '../actions/constants';

const initState: StoreModel = {
    Items: [
        {id:1,title:'Winter body', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity:0, price:110, img:Item1},
        {id:2,title:'Adidas', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity:0, price:80, img: Item2},
        {id:3,title:'Vans', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity:0, price:120, img: Item3},
        {id:4,title:'White', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity:0, price:260, img:Item4},
        {id:5,title:'Cropped-sho', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity:0, price:160, img: Item5},
        {id:6,title:'Blues', desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.", quantity:0, price:90, img: Item6}
    ],
    AddedItems: [],
    TotalPrice: 0,
    TotalQuantity:0
};

const cartReducer = (state = initState, action:any): StoreModel => {

    if (action.type === ADD_TO_CART) {
        let selectedItem = state.Items.find(item=> item.id === action.id)
        let existed_item = state.AddedItems.find(item=> action.id === item.id)

        if (selectedItem){
            if (existed_item)
            {
               selectedItem.quantity += 1;

                return {...state, TotalPrice: state.TotalPrice + selectedItem.price, 
                                TotalQuantity: state.TotalQuantity +1
                };
            }
            else {
                selectedItem.quantity = 1;  
                let newTotalPrice = state.TotalPrice + selectedItem.price;
                return { ...state, AddedItems: [...state.AddedItems, selectedItem], 
                        TotalPrice : newTotalPrice, TotalQuantity: state.TotalQuantity +1
                }
            }
        }
    }

    if (action.type === REMOVE_ITEM){
        let itemToRemove= state.AddedItems.find(item=> action.id === item.id)
        let new_items = state.AddedItems.filter(item=> action.id !== item.id)
        
        if (itemToRemove) {

            let newTotal = state.TotalPrice - (itemToRemove.price * itemToRemove.quantity )
            return {
                ...state, AddedItems: new_items, TotalPrice: newTotal,
                TotalQuantity: state.TotalQuantity - itemToRemove.quantity
            }
        }
    }

    if(action.type === ADD_QUANTITY) {
        let addedItem = state.Items.find(item=> item.id === action.id)

        if(addedItem){
            addedItem.quantity += 1
            let newTotal = state.TotalPrice + addedItem.price
            return {
              ...state,
              TotalPrice: newTotal,
              TotalQuantity: state.TotalQuantity +1
            }
        }
    }

    if (action.type === SUB_QUANTITY) {
        let addedItem = state.Items.find(item=> item.id === action.id)

        if (addedItem) {
            if(addedItem.quantity === 1) {
                let new_items = state.AddedItems.filter(item => item.id !== action.id)
                let newTotal = state.TotalPrice - addedItem.price

                return  {
                    ...state, AddedItems: new_items,TotalPrice: newTotal,
                    TotalQuantity:state.TotalQuantity - 1
                }
            }
            else {
                addedItem.quantity -= 1;
                let newTotal = state.TotalPrice - addedItem.price;

                return {
                    ...state,TotalPrice: newTotal,
                    TotalQuantity: state.TotalQuantity - 1
                }
            }
        }     
    }

    if(action.type === ADD_SHIPPING) {

        return {
            ...state, TotalPrice: state.TotalPrice + 6
        }
    }

    if(action.type === SUB_SHIPPING) {
        
        return {
            ...state,
            TotalPrice: state.TotalPrice - 6
        }
    }    
    else {
        return state
    }
}

export default cartReducer
