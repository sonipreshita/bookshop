import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import PropTypes from 'prop-types';
import _ from 'lodash';

class OrderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPromocode: false
        };
    }
    componentWillMount() {
        let id = sessionStorage.getItem('proceedData');
        this.props.getOrderItems(id, this.props);
    }
    componentDidMount() {
        let id = sessionStorage.getItem('proceedData');
        this.props.getOrderItems(id, this.props);
    }
    componentWillReceiveProps() {
        if (this.props.getOrderItemReducer.promocode_id != null)
            if (Object.keys(this.props.getOrderItemReducer.promocode_id)) {
                this.setState({ showPromocode: true });
            }
    }
    confirmItems(input) {
        if (input.order.length > 0) {
            sessionStorage.setItem('orderItems', JSON.stringify(input));
            this.props.router.push('/checkout');
        } else {
            document.getElementById("cartitems").innerHTML = "Your cart is empty";
        }
    }
    render() {
        if (this.props.getOrderItemReducer) {
            let cartObjItem = (this.props.getOrderItemReducer && this.props.getOrderItemReducer.order ? this.props.getOrderItemReducer.order : []);
            let promocode = (this.props.getOrderItemReducer && this.props.getOrderItemReducer.promocode_id ? this.props.getOrderItemReducer.promocode_id : []);
            let totalPrice = 0;
            let discountAmount;
            _.each(cartObjItem, function (d) {
                totalPrice = (totalPrice + Number(d.price * d.quantity));
            });
            let discount = (this.props.getOrderItemReducer && this.props.getOrderItemReducer.promocode_id ? this.props.getOrderItemReducer.promocode_id : 100);
            if (discount === 100) {
                discountAmount = 0;
            } else {
                discountAmount = Math.round((79 + totalPrice) * (discount.discount / 100));
            }
            const ordertotal = (79 + totalPrice);
            const number = (79 + totalPrice) - (discountAmount);
            const result = Math.round(number);
            let URL = `${process.env.REACT_APP_API_ENDPOINT}images/`;
            return (
                <div className="main">
                    <div className="content">
                        <h4 className="content"> My Cart ({cartObjItem.length} items)</h4>
                        <div className="cartitems">
                            <div className="items">
                                {cartObjItem.map((item, index) => {
                                    return (
                                        <div className="cart" key={index}>
                                            <h4 className="from">Buying From {item.category}</h4>
                                            <div className="cartdetails">
                                                <div className="orderDetails">
                                                    <div className="cartdata">
                                                        <div className="data1">
                                                            <div className="img">
                                                                <img src={URL + item.image} />
                                                            </div>
                                                            <div className="productDetails">
                                                                <div>{item.title}</div>
                                                                <div style={{ 'display': (window.location.pathname === '/checkout' ? 'block' : 'none') }}>No of quantity {item.quantity} </div>
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="total">
                                <div className="summary">
                                    <div className="payment">
                                        <div className="pay">Payment Summary</div>
                                        <div className="subtotal">
                                            <span className="text">Price({cartObjItem.length} items)</span>
                                            <span className="price"><i className="fa fa-inr" />{totalPrice}</span>
                                        </div>
                                        <div className="subtotal">
                                            <span className="text">Delivery Charge</span>
                                            <span className="price"><i className="fa fa-inr" />79</span>
                                        </div>
                                        <div className="total-order">
                                            <span className="name">Order Total</span>
                                            <span className="amount"><i className="fa fa-inr" />{ordertotal}</span>
                                            {this.props.getOrderItemReducer.promocode_id != null ? <div id="discount" ><span className="name">Discount</span>
                                                <span className="amount"> - <i className="fa fa-inr" />{discountAmount}</span></div> : null}
                                        </div>
                                        <div className="total-order">
                                            <span className="grandtotal">Grand Total</span>
                                            <span className="amount"><i className="fa fa-inr" />{result}</span>
                                        </div>
                                        {this.props.getOrderItemReducer.promocode_id != null ? <div className="coupons">
                                            <div id="applied">
                                                <div className="_2zyy">
                                                    <div className="F1Q0">
                                                        <div>{promocode.name}</div>
                                                        <div className="_3bZ7">
                                                            Applied Successfully
                                                        <span className="_1aVW" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <form className="" onSubmit={e => {
                            e.preventDefault();
                            let input = {
                                order: this.props.orderCart,
                            };
                            this.confirmItems(input);
                            this.props.router.push('/checkout');
                        }} >
                            <div id="cartitems" />
                            <Link to="/cart" title="Back" className="btn btn-default"><i className="fa fa-chevron-left" style={{ 'fontSize': '12px' }} aria-hidden="true" /> Back</Link>
                            <button type="submit" className="btn btn-default" style={{ 'marginLeft': '10px' }}>Confirm</button>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        orderCart: state.orderCart,
        getOrderItemReducer: state.getOrderItemReducer
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        OrderItems: (order) => dispatch(bookActions.OrderItems(order)),
        getOrderItems: (id, props) => dispatch(bookActions.getOrderItems(id, props)),
    };
};
OrderItem.propTypes = {
    orderCart: PropTypes.array,
    getOrderItems: PropTypes.func,
    router: PropTypes.object,
    getOrderItemReducer: PropTypes.object,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderItem));
