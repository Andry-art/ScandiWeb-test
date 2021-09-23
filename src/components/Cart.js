import React from 'react'
import './Cart.css'
import './MainCard.css'
import emptyCart from '../img/dribbble.jpg'
import { Block } from 'jsxstyle'


class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      option1: null,
      option2: null,
      option3: null,
    }
  }

  changeOption1(id, option1) {
    this.setState({ option1: option1 })
    this.props.chooseSizeInCart1(id, option1)
  }

  changeOption2(id, option2) {
    this.setState({ option2: option2 })
    this.props.chooseSizeInCart2(id, option2)
  }

  changeOption3(id, option3) {
    this.setState({ option3: option3 })
    this.props.chooseSizeInCart3(id, option3)
  }

  render() {
    const { minusItemsInCart } = this.props
    const { plusItemsInCart } = this.props
    const { itemsInCart } = this.props
    const index = this.props.currency.map(it => it.choosen).indexOf(true)

    return <>
      <div className='cart-container' >
        <h1 className="cart-title">Cart</h1>


        {itemsInCart.length === 0 ?
          <div className="emptyCartMain"><img
            src={emptyCart} />
            <p >Cart is empty</p>
          </div>
          :
          <ul className='cart-list'>

            {itemsInCart.map((prod, i) => <li key={prod.name.id}>
              <h2 className="Cartbrand" >{prod.name.brand}</h2>
              <h3  >{prod.name.name}</h3>
              <div className="Cartprice">
                <p>{this.props.currency.map(it => it.choosen && it.symbol)}</p>
                <p>{prod.name.prices[index].amount}</p>
              </div>
              <div className="Cartsize">
                {prod.name.attributes.map((it, ind) => ind === 0 &&
                  <div className="CartOption"> <p>{it.name}</p> <div className="CartOptionItems">
                    {it.items.map((it, index) => it.value.includes('#') ?
                      <div onClick={() => this.changeOption2(prod.name.id, index)} className="color-box">
                        <Block key={it.value} backgroundColor={it.value}
                          className={prod.option1 === index ? 'box-choosen-cart-color' : 'box-cart'} /> </div>
                      : <div key={it.value} className={prod.option1 === index ? 'box-choosen-cart' : 'box-cart'}
                        onClick={() => this.changeOption1(prod.name.id, index)} > <p>{it.displayValue}</p> </div>)}
                  </div> </div>)}


                {prod.name.attributes.map((it, ind) => ind === 1 &&
                  <div className="CartOption"> <p>{it.name}</p> <div className="CartOptionItems">
                    {it.items.map((it, index) => it.value.includes('#') ?
                      <div onClick={() => this.changeOption2(prod.name.id, index)} className="color-box">
                        <Block key={it.value} backgroundColor={it.value}
                          className={prod.option2 === index ? 'box-choosen-cart-color' : 'box-cart'} /></div>
                      : <div key={it.value} className={prod.option2 === index ? 'box-choosen-cart' : 'box-cart'}
                        onClick={() => this.changeOption2(prod.name.id, index)} > <p>{it.displayValue}</p> </div>)}
                  </div> </div>)}

                {prod.name.attributes.map((it, ind) => ind === 2 &&
                  <div className="CartOption"> <p>{it.name}</p> <div className="CartOptionItems">
                    {it.items.map((it, index) => it.value.includes('#') ?
                      <div onClick={() => this.changeOption3(prod.name.id, index)} className="color-box">
                        <Block key={it.value} backgroundColor={it.value}
                          className={prod.option3 === index ? 'box-choosen-cart-color' : 'box-cart'} /></div>
                      : <div key={it.value} className={prod.option3 === index ? 'box-choosen-cart' : 'box-cart'}
                        onClick={() => this.changeOption3(prod.name.id, index)} > <p>{it.displayValue}</p> </div>)}
                  </div> </div>)}
              </div>

              <img src={prod.name.gallery[0]} />
              <div className="countItemCart">
                <div className="plusCart" onClick={() => plusItemsInCart(prod.name.id)}><p>+</p></div>
                <p className="number"> {prod.count}</p>
                <div className="minusCart" onClick={() => minusItemsInCart(prod.name.id)}><p>-</p></div>
              </div>
            </li>)}

          </ul>}

      </div>
    </>
  }
}

export default Cart;


