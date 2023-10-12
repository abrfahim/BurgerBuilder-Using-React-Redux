// handle all kinds of logic here

import React, { Component } from "react";
import Burger from "./burger/Burger";
import Controls from "../controls/Controls.js";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import Summary from "./summary/Summary";
import { Navigate } from "react-router-dom";
import { Connect, connect, useDispatch } from "react-redux";
import {addIngredient, removeIngredient, updatePurchaseable} from '../../redux/ActionCreators'


const mapStateToProps = state =>{
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchaseable: state.purchaseable,
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        addIngredient: (igType)=>dispatch(addIngredient(igType)),
        removeIngredient: (igType)=>dispatch(removeIngredient(igType)),
        updatePurchaseable: ()=>dispatch(updatePurchaseable())
    }
}

const Ingredient_price ={
    breadSalad: 20,
    breadCheese: 50,
    breadMeat: 90
}

class BurgerBuilder extends Component{
    state = {
        modalOpen: false,
        onClickCheckOut: false,
    }

    addIngredientHandler = type =>{
        this.props.addIngredient(type);
        this.props.updatePurchaseable()
    }

    removeIngredientHandler = type=>{
        this.props.removeIngredient(type);
        this.props.updatePurchaseable();
    }


    toggleModal = ()=>{
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckOut =()=>{
        // <Navigate to="/checkOut"/>
        this.setState({
            onClickCheckOut: true
        })
    }

    render(){
        return(
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients}/>
                    <Controls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    price = {this.props.totalPrice}
                    toggleModal= {this.toggleModal}
                    purchaseable= {this.props.purchaseable}
                    />
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody><h5>total price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{backgroundColor:"D70F64"}} onClick={this.handleCheckOut}>Continue to checkout</Button>
                        <Button color="secondary" onClick={this.toggleModal}>cancel</Button>
                    </ModalFooter>
                    {this.state.onClickCheckOut && <Navigate to="/checkout" replace={true}/>}
                </Modal>
            </div>
           
        )
    }
    
};


export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)