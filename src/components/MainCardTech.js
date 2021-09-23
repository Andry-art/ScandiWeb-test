import React from 'react';
import "./Clothes.css"
import "./MainCard.css"
import { ITEM_TITLE } from '../graphql/queries/categories';
import { Query } from 'react-apollo';
import { Block } from 'jsxstyle'

class MainCardTech extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      img: '',
      option1: null,
      option2: null,
      option3: null,
    }
  }

  Option1(index) {
    this.setState({ option1: index })
  }

  Option3(index) {
    this.setState({ option3: index })
  }


  Option2(index) {
    this.setState({ option2: index })
  }

  ChooseImg(url) {
    this.setState({ img: url })
  }

  render() {
    const index = this.props.currency.map(it => it.choosen).indexOf(true)

    return <>
      <div className={this.props.showCart ? "shadow" : ''}></div>
      <div className='container'>
        <ul className="all-categor">
          <Query query={ITEM_TITLE} >
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching</div>
              if (error) return <div>Error</div>

              const { products } = data.categories[1]

              return products.map(prod => prod.id === this.props.choosenCard &&
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

                    <div className='size-info-tech'>
                      <ul >{prod.attributes.map((it, i) => i === 0 &&
                        <li className="option-name"  >{it.name}
                          <div className="option">
                            {it.items.map((it, ind) => {
                              return it.value.includes('#') ?
                                <div onClick={() => this.Option2(ind)} className="color-box">
                                  <Block key={it.value}
                                    className={this.state.option2 === ind ? "box-size-tech-active-color" : "box-size-tech"}
                                    backgroundColor={it.value} ></Block></div> :
                                <div key={it.value}
                                  className={this.state.option1 === ind ? "box-size-tech-active" : "box-size-tech"}
                                  onClick={() => this.Option1(ind)} > <p>{it.displayValue}</p> </div>
                            })}
                          </div>
                        </li>)}
                      </ul>

                      <ul >{prod.attributes.map((it, i) => i === 1 &&
                        <li className="option-name"  >{it.name}
                          <div className="option">
                            {it.items.map((it, ind) => {
                              return it.value.includes('#') ?
                                <div onClick={() => this.Option2(ind)} className="color-box">
                                  <Block key={it.value}
                                    className={this.state.option2 === ind ? "box-size-tech-active-color" : "box-size-tech"}
                                    backgroundColor={it.value} ></Block></div> :
                                <div key={it.value}
                                  className={this.state.option2 === ind ? "box-size-tech-active" : "box-size-tech"}
                                  onClick={() => this.Option2(ind)} > <p>{it.displayValue}</p> </div>
                            })}
                          </div>
                        </li>)}
                      </ul>

                      <ul >{prod.attributes.map((it, i) => i === 2 &&
                        <li className="option-name"  >{it.name}
                          <div className="option">
                            {it.items.map((it, ind) => {
                              return it.value.includes('#') ?
                                <div onClick={() => this.Option2(ind)} className="color-box">
                                  <Block key={it.value}
                                    className={this.state.option2 === ind ? "box-size-tech-active-color" : "box-size-tech"}
                                    backgroundColor={it.value} ></Block></div> :
                                <div key={it.value}
                                  className={this.state.option3 === ind ? "box-size-tech-active" : "box-size-tech"}
                                  onClick={() => this.Option3(ind)} > <p>{it.displayValue}</p> </div>
                            })}
                          </div>
                        </li>)}
                      </ul>

                    </div>
                    <p className="price">PRICE:</p>
                    <div className="price-num">
                      <p>{this.props.currency.map(it => it.choosen && it.symbol)}</p>
                      <p>{prod.prices[index].amount}</p>
                    </div>
                    <button className="btnADD"
                      onClick={() => this.props.itemToCart(prod, this.state.option1, this.state.option2, this.state.option3)}>ADD TO CART</button>
                    <p className='description'>{prod.description}</p>
                  </div>
                </div>)

            }
            }
          </Query>
        </ul>
      </div>

    </>
  }
}

export default MainCardTech;















{/* <Block key = {it.value} className={this.state.choosenSize === index ? "box-size-tech-active" : "box-size-tech"}  backgroundColor = {it.value} onClick={()=>this.chooseSize2(it)}> 
            <p>{it.value.includes('#') ? '' : it.displayValue}</p> 
            </Block> )} */}