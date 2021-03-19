import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from '../store/actions/cartActions'
import Recipe from './recipe';
class Cart extends Component <any>{

    //to remove the item completely
    handleRemove = (id:any)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id:any)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id:any) => {
        this.props.subtractQuantity(id);
    }
    render(){
              
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map((item: any)=>{
                    return(
                       
                        <li className="collection-item avatar" key={item.id}>
                                <div className="item-img"> 
                                        <img src={item.img} alt={item.img}/>
                                </div>
                                
                                <div className="item-desc">
                                    <span className="title">{item.title}</span>
                                    <p>{item.desc}</p>
                                    <p><b>Price: R{item.price}</b></p> 
                                    <p>
                                        <b>Quantity: {item.quantity}</b> 
                                    </p>
                                    <div className="add-remove">
                                        <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleAddQuantity(item.id)}}>arrow_drop_up</i></Link>
                                        <Link to="/cart"><i className="material-icons" onClick={()=>{this.handleSubtractQuantity(item.id)}}>arrow_drop_down</i></Link>
                                    </div>
                                    <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>Remove</button>
                                </div>                                    
                        </li>
                         
                    )
                })
            ):

             (
                <p>Nothing.</p>
             )
       return(
            <div className="container">
                <div className="cart">
                    {console.log("qa : ", this.props.totalQuantity)}
                    <h5>Total Items : {this.props.totalQuantity}</h5>
                    <h5>You have ordered :-</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div> 
                <Recipe />          
            </div>
       )
    }
}


const mapStateToProps = (state:any) => {
    return {
        items: state.AddedItems,
        totalQuantity: state.TotalQuantity
    }
}
const mapDispatchToProps = (dispatch:any) => {
    return {
        removeItem: (id:any) => {dispatch(removeItem(id))},
        addQuantity: (id:any) => {dispatch(addQuantity(id))},
        subtractQuantity: (id:any) => {dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)