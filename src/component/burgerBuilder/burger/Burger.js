
import React from 'react'
import './Burger.css'
import Ingredient from '../ingredient/Ingredient';

const Burger = props => {
  const ingredientArr = props.ingredients.map((item)=>{
      const amountArr = [...Array(item.amount).keys()];
      return amountArr.map(_=>{
        return <Ingredient type= {item.type} key={Math.random()}/>
      })
      .reduce((arr, element)=>{
        return arr.concat(element)
      }, [])
  
    if(ingredientArr.length === 0){
      ingredientArr = <p>Please add some ingredient!</p>
    }
  })
  return (
    <div className="Burger">
      <Ingredient type="breadTop"/>
      {ingredientArr}
      <Ingredient type="breadBottom"/>
    </div>
  )
}

export default Burger