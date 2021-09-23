import React from 'react';
import "./MainCard.css"
import { ITEM_TITLE } from '../graphql/queries/categories';
import cart from '../img/Cart.svg';
import { Query } from 'react-apollo';





class MainCardClothes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      img: '',
      choosenSize: null,
    }
  }

  ChooseImg(url) {
    this.setState({ img: url })
  }

  chooseSize(index) {
    this.setState({ choosenSize: index })
  }

  render() {
    console.log('111', this.props)
    const index = this.props.currency.map(it => it.choosen).indexOf(true)
    return <>
      <div className={this.props.showCart ? "shadow" : ''} >
        <div className='container'>

          <ul className="all-categor">
            <Query query={ITEM_TITLE} className="query">
              {({ loading, error, data }) => {
                if (loading) return <div>Fetching</div>
                if (error) return <div>Error</div>

                const { products } = data.categories[0]

                return products.map(prod => prod.id == this.props.choosenCard &&
                  <div key={prod.name} className="container-option">
                    <div className="container-small-img">
                      {prod.gallery.map(img => <img key={img}
                        src={img}
                        alt={prod.name}
                        className="small-img"
                        onClick={() => this.ChooseImg(img)}>
                      </img>)}
                    </div>
                    <img
                      src={this.state.img ? this.state.img : prod.gallery[0]}
                      alt={prod.name}
                      className="main-img"
                    ></img>
                    <div className="info">
                      <h2 className="brand">{prod.brand}</h2>
                      <h3 className="name">{prod.name}</h3>
                      <p className="size">{prod.attributes.map(it => it.name)}:</p>
                      <div className='size-info'>
                        {prod.attributes.map(it => it.items.map((it, index) =>
                          <div key={it.value}
                            className={this.state.choosenSize === index ? 'box-size-choosen' : "box-size"}
                            onClick={() => this.chooseSize(index)}> <p>{it.displayValue}</p> </div>))}
                      </div>
                      <p className="price">PRICE:</p>
                      <div className="price-num">
                        <p>{this.props.currency.map(it => it.choosen && it.symbol)}</p>
                        <p>{prod.prices[index].amount}</p>
                      </div>
                      <button className="btnADD"
                        onClick={() => this.props.itemToCart(prod, this.state.choosenSize)} >ADD TO CART</button>
                      <p className='description'>{prod.description.slice(3, -4)}</p>
                    </div>
                  </div>)


              }
              }

            </Query>
          </ul>
        </div>
      </div>
    </>
  }
}
export default MainCardClothes;