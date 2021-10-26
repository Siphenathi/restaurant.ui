import React from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ItemModel from '../store/reducers/itemModel';
import StoreModel from '../store/storeModel';
import { Row, Col, Collection, CollectionItem} from 'react-materialize';
import { addQuantity, subtractQuantity, removeFromCart, addShipping, subtractShipping } from '../store/actions/cartActions';
import { Theme, createStyles, makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
//https://materializecss.com/images/sample-1.jpg

const typedUseSelector: TypedUseSelectorHook<StoreModel> = useSelector;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 200,
    },
    controls: {
      paddingLeft: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    }
  }),
);

const Cart = () => {
    const addedItems = typedUseSelector(state => state.AddedItems);
    const totalQuantity = typedUseSelector(state => state.TotalQuantity);
    const totalPrice = typedUseSelector(state => state.TotalPrice);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChecked = (event: any) => {
        if (event.target.checked)
            dispatch(addShipping());
        else
            dispatch(subtractShipping());
    }

    return (
            <div className="container">
                <div className="cart">
                    <h5>Total Items : {totalQuantity}</h5>
                    <h5>You have ordered :-</h5>
                        {addedItems.length !== 0? (
                            addedItems.map((item : ItemModel) => {
                                return (                       
                                    <Card style={{marginBottom:"10px"}}>
                                        <Grid container spacing={1}>
                                            <Grid item>
                                                <CardMedia
                                                    style={{width:"200px", height:"200px"}}
                                                    image={item.img}
                                                />
                                                </Grid>
                                                    <Grid item xs container direction="column">                                               
                                                        <Grid item xs>
                                                            <CardContent className={classes.content}>
                                                                <Typography component="h5" variant="h5">
                                                                    {item.title}
                                                                </Typography>
                                                                <Typography variant="subtitle1" color="textSecondary">
                                                                    {item.desc}
                                                                </Typography>
                                                                <Typography variant="h5">
                                                                    R{item.price}
                                                                </Typography>
                                                            </CardContent>
                                                            <div className={classes.controls}>
                                                                Quantity: {item.quantity}
                                                                <IconButton aria-label="ArrowDrop">
                                                                    <ArrowDropUp fontSize="large" onClick={() => dispatch(addQuantity(item.id))}/>
                                                                </IconButton>
                                                                <IconButton aria-label="ArrowDrop">
                                                                    <ArrowDropDown fontSize="large" onClick={() => dispatch(subtractQuantity(item.id))}/>
                                                                </IconButton>
                                                                <IconButton aria-label="delete" disableFocusRipple={true}>
                                                                    <DeleteIcon onClick={() => dispatch(removeFromCart(item.id))}/>
                                                                </IconButton>
                                                            </div>
                                                        </Grid>
                                                    </Grid>  
                                            </Grid>        
                                        </Card>
                        );
                    })
                ) : (<p>Your shopping cart is empty</p>)}


                    <Row>
                        <Col >
                            <Collection>
                            {addedItems.length !== 0? (
                                addedItems.map((item : ItemModel) => {
                                    return (
                                            <CollectionItem className="avatar">
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
                                                        <i className="material-icons" onClick={() => dispatch(addQuantity(item.id))}>arrow_drop_up</i>
                                                        <i className="material-icons" onClick={() => dispatch(subtractQuantity(item.id))}>arrow_drop_down</i>
                                                    </div>
                                                    <button className="waves-effect waves-light btn pink remove" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                                                </div>
                                            </CollectionItem>
                                    );
                                })
                            ) : (<p>Your shopping cart is empty</p>)}
                            </Collection>
                        </Col>
                        <Col>
                            <Collection>
                                <CollectionItem>
                                    <label>
                                        <input type="checkbox" onChange = {(event) => handleChecked(event)}
                                            disabled = {totalPrice !== 0? false : true}/>
                                        <span> Shipping(+R6) </span>
                                    </label>
                                </CollectionItem>
                                <li className="collection-item"><b>Total: R{totalPrice} </b></li>
                            </Collection>
                            <div className="checkout">
                                <button className="waves-effect waves-light btn">Checkout</button>
                            </div>
                        </Col>
                    </Row>
                    {/* <Row>
                        <Col>

                        </Col>
                    </Row> */}

                </div>
                {/* <div className="container">
                    <div className="collection">
                        <li className="collection-item">
                            <label>
                                <input type="checkbox" onChange = {(event) => handleChecked(event)}
                                disabled = {totalPrice !== 0? false : true}/>
                                <span> Shipping(+R6) </span>
                            </label>
                        </li>
                        <li className="collection-item"><b>Total: R{totalPrice} </b></li>
                    </div>
                    <div className="checkout">
                        <button className="waves-effect waves-light btn">Checkout</button>
                    </div>
                </div> */}
            </div>
        );
}

export default Cart;

