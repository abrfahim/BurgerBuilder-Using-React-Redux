

import React from 'react'
import Ingredient from './../ingredient/Ingredient';

const Summary = props => {
    const ingredientSummary = props.ingredients.map((item)=>{
        return (
            <li key={item.type}>
                <span style={{textTransform:'capitalize'}}>{item.type}</span>:{item.Amout}

            </li>
        )
    })
  return (
    <div>
        <ul>
            {ingredientSummary}
        </ul>
    </div>
  )
}

export default Summary