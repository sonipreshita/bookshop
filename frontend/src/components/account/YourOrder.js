import React from 'react';
import * as bookActions from '../../actions/bookActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavContent from '../NavContent';
import cookie from 'react-cookies';
import { Link } from 'react-router';
import Footer from '../common/Footer';

class YourOrder extends React.Component {
    constructor(props) {
        super(props);
        this.CancelItem = this.CancelItem.bind(this);
        this.ReturnItem = this.ReturnItem.bind(this);
        this.CancelOrder = this.CancelOrder.bind(this);
        this.ReturnOrder = this.ReturnOrder.bind(this);
        this.RefundOnItemCancel = this.RefundOnItemCancel.bind(this);
        this.RefundOnOrderCancel = this.RefundOnOrderCancel.bind(this);
    }

    componentWillMount() {
        this.props.yourOrder();
    }
    componentDidMount() {
        this.props.yourOrder();
    }
    CancelItem(orderid, itemid) {
        this.props.CancelItem(orderid, itemid);
    }
    ReturnItem(orderid, itemid) {
        this.props.ReturnItem(orderid, itemid);
    }
    CancelOrder(orderid) {
        this.props.CancelOrder(orderid);
    }
    ReturnOrder(orderid) {
        this.props.ReturnOrder(orderid);
    }
    RefundOnItemCancel(chargeid, orderid, itemid, price) {
        let cancelItem = {
            chargeid: chargeid,
            orderid: orderid,
            itemid: itemid,
            price: price
        };
        this.props.RefundAmount(cancelItem);
    }
    RefundOnOrderCancel(chargeid, orderid, price) {
        let cancelOrder = {
            chargeid: chargeid,
            orderid: orderid,
            price: price
        };
        this.props.RefundAmountOfOrder(cancelOrder);
    }

    render() {
        document.title = 'My Order' + ' | ' + `${process.env.REACT_APP_TITLE}`;
        let cartObjItem = cookie.load('order');
        let count;
        if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }
        let URL = `${process.env.REACT_APP_API_ENDPOINT}images/`;
        if (this.props.yourOrderDeatils != '') {
            return (
                <div className="main">
                    <div className="content">
                        < NavContent cartNumber={count} />
                        <div className="cartitems">
                            <h4 className="content">My Orders</h4>
                            <div className="orderitems">
                                {this.props.yourOrderDeatils.map((item, index) => {
                                    if (item.order_Item != undefined) {
                                        if (item.order_Item.order != undefined) {
                                            return (
                                                <div className="mainorder" key={index}>
                                                    <div className="row yourorder">
                                                        <div className="row _1LTGeE">
                                                            <div className="col-md-4">
                                                                <div className="_1-SHG3">
                                                                    <div className="DgI5Zd">OD{item._id}</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6" style={{ 'display': (item.order_Item.status === 'Cancelled' || item.payment === 'Credit/Debit/ATM Card' ? 'none' : 'block') }}>
                                                                <div className="col-md-4" style={{ 'top': '10px' }}>
                                                                    <div style={{ 'fontWeight': '550', 'display': 'inline' }}>Status : </div>
                                                                    <div style={{ 'display': 'inline' }}>{item.order_Item.status} </div>
                                                                </div>
                                                                <div className="col-md-2" style={{ 'display': (item.order_Item.status === 'Confirmed' ? 'block' : 'none') }}>
                                                                    <div className="field" style={{ 'marginLeft': '23px' }}>
                                                                        {/* <p onClick={this.CancelOrder.bind(this, item.order_Item._id)}>cancel</p> */}
                                                                        <Link onClick={this.CancelOrder.bind(this, item.order_Item._id)} to={`/orderdetails`} className="btn btn-default">Cancel Order</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2" style={{ 'display': (item.order_Item.status === 'Delivered' && item.order_Item.return_request === 'NO' ? 'block' : 'none') }}>
                                                                    <Link onClick={this.ReturnOrder.bind(this, item.order_Item._id)} to={`/orderdetails`} className="btn btn-default">Return Order</Link>
                                                                </div>
                                                                <div className="col-md-6" style={{ 'display': (item.order_Item.status === 'Delivered' && item.order_Item.return_request != 'NO' ? 'block' : 'none'), 'color': '#009fff', 'textAlign': 'center' }}>
                                                                    Successfully sent order return request
                                                            </div>
                                                            </div>
                                                            <div className="col-md-6" style={{ 'display': (item.order_Item.status === 'Cancelled' || item.payment != 'Credit/Debit/ATM Card' ? 'none' : 'block') }}>
                                                                <div className="col-md-4" style={{ 'top': '10px' }}>
                                                                    <div style={{ 'fontWeight': '550', 'display': 'inline' }}>Status : </div>
                                                                    <div style={{ 'display': 'inline' }}>{item.order_Item.status} </div>
                                                                </div>
                                                                <div className="col-md-2" style={{ 'display': (item.order_Item.status === 'Confirmed' ? 'block' : 'none') }}>
                                                                    <div className="field" style={{ 'marginLeft': '23px' }}>
                                                                        {/* <p onClick={this.CancelOrder.bind(this, item.order_Item._id)}>cancel</p> */}
                                                                        <Link onClick={this.RefundOnOrderCancel.bind(this, item.charge_id, item.order_Item._id, item.order_Item.totalPrice)} to={`/orderdetails`} className="btn btn-default">Cancel Order</Link>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-2" style={{ 'display': (item.order_Item.status === 'Delivered' && item.order_Item.return_request === 'NO' ? 'block' : 'none') }}>
                                                                    <Link onClick={this.ReturnOrder.bind(this, item.order_Item._id)} to={`/orderdetails`} className="btn btn-default">Return Order</Link>
                                                                </div>
                                                                <div className="col-md-6" style={{ 'display': (item.order_Item.status === 'Delivered' && item.order_Item.return_request != 'NO' ? 'block' : 'none'), 'color': '#009fff', 'textAlign': 'center' }}>
                                                                    Successfully sent order return request
                                                            </div>
                                                            </div>

                                                            <div className="col-md-6" style={{ 'display': (item.order_Item.status != 'Cancelled' || item.payment === 'Credit/Debit/ATM Card' ? 'none' : 'block'), 'color': 'red', 'textAlign': 'center', 'top': '10px' }}>
                                                                Your Order has been cancelled
                                                            </div>
                                                            <div className="col-md-6" style={{ 'display': (item.order_Item.status === 'Cancelled' && item.payment === 'Credit/Debit/ATM Card' ? 'block' : 'none'), 'color': 'red', 'textAlign': 'center', 'top': '10px' }}>
                                                                Your Order has been cancelled and amount will be refunded within seven days.
                                                            </div>
                                                            <div className="col-md-2">
                                                                <div className="field" style={{ 'marginLeft': '23px' }}><Link to={`/orderdetails/${item._id}`} className="btn btn-default">Order Details</Link></div>
                                                            </div>
                                                        </div>
                                                        {item.order_Item.order.map((order, orderitem) => {
                                                            return (
                                                                <div className="row" key={orderitem}>
                                                                    <div className="_3xiuDJ">
                                                                        <div className="row _23QCqI">
                                                                            <div className="col-md-2">
                                                                                <div className="img">
                                                                                    <Link to={`/book/${order.book_id._id}`}> <img src={URL + order.image} /></Link>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <div style={{ 'fontWeight': '550' }}>{order.title}</div>
                                                                                <div>From : {order.category}</div>
                                                                            </div>
                                                                            <div className="col-md-2">
                                                                                <div style={{ 'fontWeight': '550' }}>Price</div>
                                                                                <div><i className="fa fa-inr" /> {order.price}</div>
                                                                                <div style={{ 'fontWeight': '550' }}>Quantity</div>
                                                                                <div>{order.quantity}</div>
                                                                            </div>
                                                                            <div className="col-md-2">
                                                                                <div style={{ 'fontWeight': '550' }}>Item-Status</div>
                                                                                <div>{order.status}</div>
                                                                            </div>
                                                                            <div className="col-md-2" style={{ 'display': (order.status != 'Confirmed' || item.payment === 'Credit/Debit/ATM Card' ? 'none' : 'block') }}>
                                                                                <Link to={`/orderdetails`} onClick={this.CancelItem.bind(this, item.order_Item._id, order._id)} className="btn btn-default">Cancel Item</Link>
                                                                            </div>
                                                                            <div className="col-md-2" style={{ 'display': (order.status === 'Delivered' && order.item_return_request === 'NO' ? 'block' : 'none') }}>
                                                                                {/* <p onClick={this.ReturnItem.bind(this, item.order_Item._id, order._id)}>return</p> */}
                                                                                <Link to={`/orderdetails`} onClick={this.ReturnItem.bind(this, item.order_Item._id, order._id)} className="btn btn-default">Return</Link>
                                                                            </div>
                                                                            <div className="col-md-2" style={{ 'display': (order.status != 'Confirmed' || item.payment != 'Credit/Debit/ATM Card' ? 'none' : 'block') }}>
                                                                                <Link to={`/orderdetails`} onClick={this.RefundOnItemCancel.bind(this, item.charge_id, item.order_Item._id, order._id, order.price)} className="btn btn-default">Cancel Item</Link>
                                                                            </div>
                                                                            <div className="col-md-2" style={{ 'display': (order.status === 'Delivered' && order.item_return_request != 'NO' ? 'block' : 'none'), 'color': '#009fff' }}>
                                                                                Successfully sent return request
                                                                    </div>
                                                                            <div className="col-md-2" style={{ 'display': (order.status != 'Cancelled' || item.payment === 'Credit/Debit/ATM Card' ? 'none' : 'block'), 'color': 'red' }}>
                                                                                Your item has been cancelled
                                                                    </div>
                                                                            <div className="col-md-2" style={{ 'display': (order.status === 'Cancelled' && item.payment === 'Credit/Debit/ATM Card' ? 'block' : 'none'), 'color': 'red' }}>
                                                                                Your item has been cancelled and amount will be refunded within seven days.
                                                                    </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                        <div className="row _1LTGeE" >
                                                            <div className="col-md-6" style={{ 'color': 'black', 'float': 'left' }}>
                                                                <span>Ordered On : {item.date}</span>
                                                            </div>
                                                            <div className="col-md-6" style={{ 'color': 'black', 'float': 'right' }}>
                                                                <span className="_27lDDD">Order Total:</span>
                                                                <span className="_1B26g2"> <i className="fa fa-inr" />{item.order_Item.totalPrice} </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        else {
                                            return (
                                                <div className="mainorder" key={index}>
                                                    <div className="row _1LTGeE">
                                                        <div className="col-md-5">
                                                            <div className="_1-SHG3">
                                                                <div className="DgI5Zd">OD{item._id}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-5" >There is some problem to fetch data</div>
                                                        <div className="col-md-2">
                                                            <div className="field" style={{ 'marginLeft': '23px' }}><Link to={`/orderdetails/${item._id}`} className="btn btn-default">Order Details</Link></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    } else {
                                        return (
                                            <div className="mainorder" key={index}>
                                                <div className="row _1LTGeE">
                                                    <div className="col-md-5">
                                                        <div className="_1-SHG3">
                                                            <div className="DgI5Zd">OD{item._id}</div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5" >There is some problem to fetch data</div>
                                                    <div className="col-md-2">
                                                        <div className="field" style={{ 'marginLeft': '23px' }}><Link to={`/orderdetails/${item._id}`} className="btn btn-default">Order Details</Link></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div className="main">
                    <div className="content">
                        <NavContent cartNumber={0} />
                        <center>
                            You have not ordered anything yet. Hurry up and grab the awesome books
                            <Link to="/" style={{ 'color': '#fff' }}><div className="moreshopping">Grab Books</div></Link>
                        </center>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        yourOrderDeatils: state.yourOrder,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        yourOrder: () => dispatch(bookActions.yourOrder()),
        CancelItem: (orderid, itemid) => dispatch(bookActions.CancelItem(orderid, itemid)),
        ReturnItem: (orderid, itemid) => dispatch(bookActions.ReturnItem(orderid, itemid)),
        CancelOrder: (orderid) => dispatch(bookActions.CancelOrder(orderid)),
        ReturnOrder: (orderid) => dispatch(bookActions.ReturnOrder(orderid)),
        RefundAmount: (charge) => dispatch(bookActions.RefundAmount(charge)),
        RefundAmountOfOrder: (charge) => dispatch(bookActions.RefundAmountOfOrder(charge)),
    };
};

YourOrder.propTypes = {
    yourOrder: PropTypes.func,
    CancelItem: PropTypes.func,
    ReturnItem: PropTypes.func,
    ReturnOrder: PropTypes.func,
    CancelOrder: PropTypes.func,
    RefundAmountOfOrder: PropTypes.func,
    RefundAmount: PropTypes.func,
    yourOrderDeatils: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(YourOrder);