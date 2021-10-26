import React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/actions/cartActions';
import StoreModel from '../store/storeModel';
import './home.css'

const typedUseSelector: TypedUseSelectorHook<StoreModel> = useSelector;

const Home = () => {
    const items = typedUseSelector(state => state.Items);
    const dispatch = useDispatch();

    const handleClick = (id:number) => {
        dispatch(addToCart(id))
    }

    return (
        <div className="container">
        <h3 className="center">Our items</h3>
        <div className="box">
            {
                items.map((item: any) => {
                    return(
                        <div className="card" key={item.id}>
                                <div className="card-image">
                                    <img src={item.img} alt={item.title}/>
                                    <span className="card-title">{item.title}</span>
                                    <span className="btn-floating halfway-fab waves-effect waves-light red" onClick={()=>{handleClick(item.id)}}><i className="material-icons">add</i></span>
                                </div>        
                                <div className="card-content">
                                    <p>{item.desc}</p>
                                    <p><b>Price: {item.price}$</b></p>
                                </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
    )    
}

export default Home;