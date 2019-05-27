import React from 'react';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import { Link, withRouter } from 'react-router';
import cookie from 'react-cookies';
import _ from 'lodash';
import NumericInput from 'react-numeric-input';
import PropTypes from 'prop-types';
import NavContent from '../NavContent';
import Footer from '../common/Footer';

class CartPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.OrderItems = this.OrderItems.bind(this);
    this.hnadleChange = this.hnadleChange.bind(this);
    this.state = { userStatus: '', items: '', promocode: '', applied: false, apply: false, showHidePromoCode: false };
  }
  componentWillMount() {
    this.props.fetchCart();
    this.props.getPromoCode();
    let token = sessionStorage.getItem('user');
    if (token) {
      this.setState({ userStatus: true });
    } else {
      this.setState({ userStatus: false });
    }
    if (window.location.pathname != '/checkout') {
      sessionStorage.removeItem('Address');
      sessionStorage.removeItem('orderItems');
    }
  }

  componentWillReceiveProps(next) {
    let token = sessionStorage.getItem('user');
    if (token) {
      this.setState({ userStatus: true });
    } else {
      this.setState({ userStatus: false });
    }
    if (Object.keys(next.validPromocode).length != 0) {
      this.setState({ showHidePromoCode: true });
    }
  }

  removeItemFromCart(items, id) {
    this.props.removeItemFromCart(items, id);
  }

  removeItemFromCartForLoggedUser(items, _id) {
    this.props.removeItemFromCartForLoggedUser(items, _id);
  }

  proceedOrder() {
    let path = window.location.pathname;
    this.props.router.push({ pathname: '/login', state: { path: path } });
  }

  OrderItems(order, result, props) {
    let promocodeId = (this.props.validPromocode && this.props.validPromocode._id ? this.props.validPromocode._id : null);
    let orderItemId = sessionStorage.getItem('proceedData');
    let orderData = {
      totalprice: result,
      order_items: order,
      orderItemId: orderItemId
    };
    if (promocodeId !== null) { orderData.promocode_id = promocodeId; }
    this.props.OrderItems(orderData, props);
  }

  hnadleChange(e) {
    document.getElementById('invalid').innerHTML = '';
    this.setState({
      promocode: e.currentTarget.value
    });
  }

  render() {
    document.title = 'Cart' + ' | ' + `${process.env.REACT_APP_TITLE}`;
    let cartObjItem, discountAmount;
    let token = sessionStorage.getItem('user');
    if (token) {
      cartObjItem = { items: this.props.items };
    } else {
      cartObjItem = cookie.load('order');
    }
    let totalPrice = 0;
    let itemPrice = [];

    if (cartObjItem && cartObjItem.items.length > 0) {
      _.each(cartObjItem.items, function (d) {
        itemPrice.push(d);
        totalPrice = (totalPrice + Number(d.price * d.quantity));
      });
      let discount = (this.props.validPromocode && this.props.validPromocode.discount ? this.props.validPromocode.discount : 100);
      if (discount === 100) {
        discountAmount = 0;
      } else {
        discountAmount = Math.round((79 + totalPrice) * (discount / 100));
      }
      const ordertotal = (79 + totalPrice);
      const number = (79 + totalPrice) - (discountAmount);
      const result = Math.round(number);
      sessionStorage.setItem('result', result);
      let URL = `${process.env.REACT_APP_API_ENDPOINT}images/`;
      if (cartObjItem != undefined) {
        return (
          <div className="main">
            <div className="content">
              <div style={{ 'display': (window.location.pathname === '/checkout' ? 'none' : 'block') }}>
                <NavContent cartNumber={cartObjItem.items.length} /></div>
              <h4 className="content"> My Cart ({cartObjItem.items.length} items)
              <span id="already" style={{ 'color': '#caca78' }} />
              </h4>
              <div className="cartitems">
                <div className="items">
                  {cartObjItem.items.map((item, index) => {
                    return (
                      <div className="cart" key={index}>
                        <h4 className="from">Buying From {item.category}</h4>
                        <div className="cartDetails">
                          <div className="orderDetails">
                            <div className="cartdata">
                              <div className="data1">
                                <div className="img">
                                  <img src={URL + item.image} />
                                </div>
                                <div className="productDetails">
                                  <div>{item.title}</div>
                                  <div style={{ 'display': (window.location.pathname === '/checkout' ? 'block' : 'none') }}>No of quantity {item.quantity} </div>
                                  <div style={{ 'display': (window.location.pathname === '/checkout' ? 'none' : 'block') }}>
                                    <div style={{ 'display': (this.state.userStatus === false ? 'block' : 'none') }}>
                                      Choose Quantity <Link to="/cart"><NumericInput className="formcontrol" onChange={e => this.props.orderQuantity(cartObjItem, e, item.id)} id="stepper" min={1} max={50} value={item.quantity} title="select quantity" /></Link>
                                    </div>
                                    <div style={{ 'display': (this.state.userStatus === true ? 'block' : 'none') }}>
                                      Choose Quantity <Link to="/cart"><NumericInput className="formcontrol" onChange={e => this.props.orderQuantityForLoggedUser(e, item._id)} id="stepper" min={1} max={50} value={item.quantity} title="select quantity" /></Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="productDetails">
                                <div><i className="fa fa-inr" />{item.price} * {item.quantity} = {Number(item.price * item.quantity)} </div>
                                <div className="">Delivery in 3-4 days</div>
                              </div>
                              <div className="offer">
                                <div> OFFER?</div>
                                <div>{item.offer}</div>
                              </div>
                              <div style={{ 'display': (window.location.pathname === '/checkout' ? 'none' : 'block') }}>
                                {/* <p onClick={this.removeItemFromCartForLoggedUser.bind(this, read, item._id)}>remove</p> */}
                                <div style={{ 'display': (this.state.userStatus === false ? 'block' : 'none') }}>
                                  <Link to="/cart" title="Remove Item" className="remove" onClick={this.removeItemFromCart.bind(this, cartObjItem, item.id)}>Remove</Link>
                                </div>
                                <div style={{ 'display': (this.state.userStatus === true ? 'block' : 'none') }}>
                                  <Link to="/cart" title="Remove Item" className="remove" onClick={this.removeItemFromCartForLoggedUser.bind(this, cartObjItem, item._id)}>Remove</Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="_2qUgWb _23Wk5T" style={{ 'display': (window.location.pathname === '/checkout' ? 'none' : 'block') }}>
                    <div className="_2zqhDs _1lD380" >
                      <div className="_2CQPOE">
                        <Link className="shopping" to="/">
                          <button className="_2AkmmA _14O7kc mrmU5i">
                            <svg width="16" height="13" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className="_18lbcF">
                              <path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#fff" className="_2mfUhF" />
                            </svg>
                            <span>Continue shopping</span></button></Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="total">
                  <div className="summary">
                    <div className="payment">
                      <div className="pay">Payment Summary</div>
                      <div className="subtotal">
                        <span className="text">Price({cartObjItem.items.length} items)</span>
                        <span className="price"><i className="fa fa-inr" />{totalPrice}</span>
                      </div>
                      <div className="subtotal">
                        <span className="text">Delivery Charge</span>
                        <span className="price"> + <i className="fa fa-inr" />79</span>
                      </div>
                      <div className="total-order">
                        <span className="name">Order Total</span>
                        <span className="amount"><i className="fa fa-inr" />{ordertotal}</span>
                        {this.state.showHidePromoCode === true ? <div id="discount"><span className="name">Discount</span>
                          <span className="amount"> - <i className="fa fa-inr" />{discountAmount}</span></div> : null}
                      </div>
                      <div className="total-order">
                        <span className="grandtotal">Grand Total</span>
                        <span className="amount"><i className="fa fa-inr" />{result}</span>
                      </div>
                      <div className="coupons" style={{ 'display': (this.state.userStatus === true && window.location.pathname != '/checkout' ? 'block' : 'none') }}>
                        {/* <div className="coupons"> */}
                        {this.state.showHidePromoCode === false ? <div id="apply">
                          <div className="promocode">Apply Promocode to get some instant discount !!</div>
                          <div className="_2zyy">
                            <form onSubmit={e => {
                              e.preventDefault();
                              let input = {
                                amount: result,
                                promocode: this.state.promocode
                              };
                              this.props.checkPromoCode(input);
                              e.target.reset();
                            }}>
                              <input type="text" className="h4gN" placeholder="Enter Promocode" onChange={this.hnadleChange.bind(this)} value={this.state.promocode} required />
                              <button type="submit" className="_1li7 button" >Apply</button>
                            </form>
                            <div id="invalid" style={{ 'color': 'red' }} />
                          </div>
                          <div className="_2p6F">
                            {this.props.coupons.map((c, i) => {
                              if (this.props.coupons.length > 0) {
                                return (
                                  <div key={i}>
                                    <div className="_1tPW">
                                      <div className="_2FwA">
                                        <label> <input id="option" type="radio" onChange={this.hnadleChange.bind(this)} name="option1" value={c.name} />
                                          <span className="y-s_"> {c.name} </span>
                                        </label>
                                      </div>
                                      <div className="_2cVl">{c.description}<span style={{ 'color': 'red' }}>*</span></div>
                                      <div className="_2cVl">And You will get <span style={{ 'color': 'red' }}>{c.discount}%</span> discount</div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </div> : true}
                        {this.state.showHidePromoCode === true ? <div id="applied">
                          <div className="_2zyy">
                            <div className="F1Q0">
                              <div>{this.props.validPromocode.name}</div>
                              <div className="_3bZ7">
                                Applied Successfully
                                <span className="_1aVW" />
                              </div>
                            </div>
                          </div>
                          <div className="_1zse">{this.props.validPromocode.description}</div>
                          <div className="ExjT" onClick={() => { this.props.checkPromoCode(); this.setState({ promocode: '', showHidePromoCode: false }); }}>
                            Clear Promocode
                            <span className="_3maO" />
                          </div>
                        </div> : null}
                      </div>
                    </div>
                  </div>
                  <div className="login" style={{ 'display': (this.state.userStatus === false ? 'block' : 'none') }}>
                    <div className="loginproceed"><button className="link" onClick={this.proceedOrder.bind(this)} title="Login to proceed" >LOGIN TO PROCEED</button></div>
                  </div>
                  <div className="login" style={{ 'display': (this.state.userStatus === true && window.location.pathname != '/checkout' ? 'block' : 'none') }}>
                    {/* <p onClick={this.OrderItems.bind(this, this.props.items, result,this.props)}>proceed</p> */}
                    <a style={{ 'color': '#fff' }} onClick={this.OrderItems.bind(this, this.props.items, result, this.props)}><div className="proceed">PLACE ORDER</div></a>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ 'display': (window.location.pathname != '/checkout' ? 'block' : 'none') }}>
              <Footer />
            </div>
          </div >
        );
      }
    } else {
      return (
        <div className="main">
          <div className="content">
            <NavContent cartNumber={0} />
            <center>
              <img src="http://myhomeexperts.in/images/empty-cart.png" alt="Network Issue" title="" />
              <Link to="/" style={{ 'color': '#fff' }}><div className="moreshopping">Continue Shopping</div></Link>
            </center>
          </div>
          <div style={{ 'display': (window.location.pathname != '/checkout' ? 'block' : 'none') }}>
            <Footer />
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.orderCart,
    user: state.userAuth,
    coupons: state.coupons,
    validPromocode: state.validPromocode
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: bookId => dispatch(bookActions.fetchCart(bookId)),
    removeItemFromCartForLoggedUser: (items, _id) => dispatch(bookActions.removeItemFromCartForLoggedUser(items, _id)),
    removeItemFromCart: (items, id) => dispatch(bookActions.removeItemFromCart(items, id)),
    orderQuantity: (items, count, id) => dispatch(bookActions.orderQuantity(items, count, id)),
    orderQuantityForLoggedUser: (count, id) => dispatch(bookActions.orderQuantityForLoggedUser(count, id)),
    getPromoCode: () => dispatch(bookActions.getPromoCode()),
    OrderItems: (order, props) => dispatch(bookActions.OrderItems(order, props)),
    checkPromoCode: (code) => dispatch(bookActions.checkPromoCode(code)),
  };
};

CartPage.propTypes = {
  fetchCart: PropTypes.func.isRequired,
  dispatch: PropTypes.func,
  getPromoCode: PropTypes.func,
  OrderItems: PropTypes.func,
  checkPromoCode: PropTypes.func,
  validPromocode: PropTypes.object,
  removeItemFromCartForLoggedUser: PropTypes.func.isRequired,
  orderQuantityForLoggedUser: PropTypes.func.isRequired,
  removeItemFromCart: PropTypes.func.isRequired,
  orderQuantity: PropTypes.func.isRequired,
  items: PropTypes.array,
  router: PropTypes.object,
  coupons: PropTypes.array,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPage));
