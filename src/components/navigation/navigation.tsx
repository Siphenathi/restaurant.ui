import React from "react";
import { NavLink } from 'react-router-dom';
import { Navbar, Icon} from 'react-materialize';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { TypedUseSelectorHook, useSelector } from "react-redux";
import StoreModel from "../store/storeModel";

const typedUseSelector: TypedUseSelectorHook<StoreModel> = useSelector;

const NavigationBar = () => {
    const totalQuantity = typedUseSelector(state => state.TotalQuantity);
    
    return (
            <Navbar
                alignLinks="right"
                brand={<a className="brand-logo left" href="/" style={{paddingLeft:"10%"}}>Shopping</a>}
                id="mobile-nav"
                menuIcon={<Icon>menu</Icon>}
                centerChildren
                fixed
                options={{
                draggable: true,
                edge: 'left',
                inDuration: 250,
                // onCloseEnd: null,
                // onCloseStart: null,
                // onOpenEnd: null,
                // onOpenStart: null,
                outDuration: 200,
                preventScrolling: true
                }}
            >
                <NavLink to="/ddd">Error</NavLink>
                <NavLink to="/">Shop</NavLink>
                <NavLink to="/cart">Cart</NavLink>
                <NavLink to="/cart">
                    <Badge badgeContent={totalQuantity} color="secondary">
                        <ShoppingCartIcon />
                    </Badge> 
                </NavLink>
            </Navbar>
    );
};

export default NavigationBar;