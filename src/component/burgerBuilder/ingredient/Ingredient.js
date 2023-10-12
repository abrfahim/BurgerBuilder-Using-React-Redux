
import React from 'react'
import './Ingredient.css'
import BurgerTop from '../../../assets/images/top.png'
import BurgerBottom from '../../../assets/images/bottom.png'
import BurgerCheese from '../../../assets/images/cheese.png'
import BurgerMeat from '../../../assets/images/meat.png'
import BurgerSalad from '../../../assets/images/salad.png'



const Ingredient = props => {
  let ingredient = null;

  switch (props.type) {
    case 'breadBottom':
      ingredient = <div>
        <img src={BurgerBottom} alt="Bread Bottom" />
      </div>
      break;

    case 'breadTop':
      ingredient = <div>
        <img src={BurgerTop} alt="Bread Top" />
      </div>
      break;
    case 'breadCheese':
      ingredient = <div>
        <img src={BurgerCheese} alt="Bread Cheese" />
      </div>
      break;
    case 'breadMeat':
      ingredient = <div>
        <img src={BurgerMeat} alt="Bread Meat" />
      </div>
      break;

    case 'breadSalad':
      ingredient = <div>
        <img src={BurgerSalad
        } alt="Bread Salad" />
      </div>
      break;

    default:
      ingredient = null;
  }

  return (
    <div className='Ingredient'>
      {ingredient}
    </div>
  )
}

export default Ingredient