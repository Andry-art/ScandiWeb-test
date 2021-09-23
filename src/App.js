import React from 'react'
import './App.css';
import './components/SmallCart.css'
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom'
import Clothes from './components/Clothes';
import MainCardClothes from './components/MainCardClothes';
import Cart from './components/Cart';
import Tech from './components/Tech';
import MainCardTech from './components/MainCardTech';



class App extends React.Component {
  constructor(props) {
    super(props)
    this.curRef = React.createRef();
    this.currencyVisible = this.currencyVisible.bind(this)
    this.handleСurrency = this.handleСurrency.bind(this)
    this.showCard = this.showCard.bind(this)
    this.itemToCart = this.itemToCart.bind(this)
    this.plusItemsInCart = this.plusItemsInCart.bind(this)
    this.minusItemsInCart = this.minusItemsInCart.bind(this)
    this.chooseSizeInCart1 = this.chooseSizeInCart1.bind(this)
    this.chooseSizeInCart2 = this.chooseSizeInCart2.bind(this)
    this.chooseSizeInCart3 = this.chooseSizeInCart3.bind(this)
    this.showCart = this.showCart.bind(this)
    this.state = {
      currency: [
        { id: 0, money: "USD", symbol: "$", choosen: true },
        { id: 1, money: "GBP", symbol: "£", choosen: false },
        { id: 2, money: "AUD", symbol: "$", choosen: false },
        { id: 3, money: "JPY", symbol: "¥", choosen: false },
        { id: 4, money: "RUB", symbol: "₽", choosen: false }
      ],
      showCart: false,
      visible: false,
      choosenCard: '',
      itemsInCart: [],

    }
  }

  showCart() {
    const { showCart } = this.state
    this.setState({ showCart: !showCart })
  }

  currencyVisible() {
    const { visible } = this.state
    this.setState({ visible: !visible })
  }

  handleСurrency(id) {
    this.state.currency.map(it => it.choosen = false)
    const index = this.state.currency.map(it => it.id).indexOf(id)
    this.setState(state => {
      const { currency } = state;
      return currency[index].choosen = true;
    })
  }

  showCard(id) {
    const { choosenCard } = this.state
    this.setState({ choosenCard: id })

  }

  itemToCart(name, option1 = null, option2 = null, option3 = null) {
    const { itemsInCart } = this.state
    this.setState(state => {
      let itemsArr = itemsInCart.map(it => it.name.id !== name.id)
      if (!itemsArr.includes(false)) {
        return { itemsInCart: [...itemsInCart, { name, count: 1, option1: option1, option2: option2, option3: option3 }] }
      } else if (itemsArr.includes(false)) {
        return itemsInCart.filter(it => it.name === name).map(it => it.count = it.count + 0.5)
      }
    })
  }




  plusItemsInCart(id) {
    this.setState(state => {
      const { itemsInCart } = state
      return itemsInCart.filter(it => it.name.id === id).map(it => it.count = it.count + 0.5)
    })
  }

  minusItemsInCart(id) {
    this.setState(state => {
      const { itemsInCart } = state
      return itemsInCart.filter(it => it.name.id === id)[0].count > 1 ?
        itemsInCart.filter(it => it.name.id === id).map(it => it.count = it.count - 0.5) :
        { itemsInCart: itemsInCart.filter(it => it.name.id !== id) }
    })
  }

  chooseSizeInCart1(id, option1) {
    this.setState(state => {
      const { itemsInCart } = state
      return itemsInCart.filter(it => it.name.id === id).map(it => it.option1 = option1)
    })
  }

  chooseSizeInCart2(id, option2) {
    this.setState(state => {
      const { itemsInCart } = state
      return itemsInCart.filter(it => it.name.id === id).map(it => it.option2 = option2)
    })
  }

  chooseSizeInCart3(id, option3) {
    this.setState(state => {
      const { itemsInCart } = state
      return itemsInCart.filter(it => it.name.id === id).map(it => it.option3 = option3)
    })
  }

  clickOut = (e) => {
    if (!e.path.includes(this.curRef.current)) {
      this.setState({ visible: false })
    }
  }



  render() {

    return <>
      <Header state={this.state} currencyVisible={this.currencyVisible} handleСurrency={this.handleСurrency}
        plusItemsInCart={this.plusItemsInCart} minusItemsInCart={this.minusItemsInCart} chooseSizeInCart1={this.chooseSizeInCart1}
        curRef={this.curRef} clickOut={this.clickOut} showCartFun={this.showCart} showCart={this.state.showCart}
      />
      <Switch>

        <Route exact path="/clothes">
          <Clothes currency={this.state.currency} showCard={this.showCard} choosenCard={this.state.choosenCard}
            itemToCart={this.itemToCart} showCart={this.state.showCart} />
        </Route>

        <Route exact path='/clothesItem'>
          <MainCardClothes currency={this.state.currency} choosenCard={this.state.choosenCard} itemToCart={this.itemToCart}
            showCart={this.state.showCart} />
        </Route>

        <Route exact path='/techItem'>
          <MainCardTech currency={this.state.currency} choosenCard={this.state.choosenCard} itemToCart={this.itemToCart}
            showCart={this.state.showCart} />
        </Route>

        <Route exact path='/'>
          <Cart itemsInCart={this.state.itemsInCart} currency={this.state.currency} chooseSizeInCart1={this.chooseSizeInCart1}
            plusItemsInCart={this.plusItemsInCart} minusItemsInCart={this.minusItemsInCart} chooseSizeInCart2={this.chooseSizeInCart2}
            chooseSizeInCart3={this.chooseSizeInCart3} />
        </Route>

        <Route exact path='/tech'>
          <Tech currency={this.state.currency} showCard={this.showCard} choosenCard={this.state.choosenCard}
            itemToCart={this.itemToCart} showCart={this.state.showCart} />
        </Route>

      </Switch>
    </>
  }
}

export default App;
