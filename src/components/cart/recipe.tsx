import React, { Component } from 'react'
import { connect } from 'react-redux'

class Recipe extends Component <any>{
    
    componentWillUnmount() {
        // if(this.refs.shipping.checked)
        //     this.props.substractShipping()
    }

    handleChecked = (e:any) => {
        if(e.target.checked) {
            this.props.addShipping();
        }
        else {
            this.props.substractShipping();
        }
    }

    render(){
  
        return(
            <div className="container">
                <div className="collection">
                    <li className="collection-item">
                        <label>
                            <input type="checkbox" ref="shipping" onChange= {this.handleChecked} 
                            disabled = {this.props.totalPrice != 0? false : true}/>
                            <span>Shipping(+R6)</span>
                        </label>
                    </li>
                    <li className="collection-item"><b>Total: R{this.props.totalPrice} </b></li>
                </div>
                <div className="checkout">
                    <button className="waves-effect waves-light btn">Checkout</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>{
    return{
        addedItems: state.AddedItems,
        totalPrice: state.TotalPrice
    }
}

const mapDispatchToProps = (dispatch:any)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
