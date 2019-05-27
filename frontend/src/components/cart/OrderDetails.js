import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import NavContent from '../NavContent';
import cookie from 'react-cookies';
import Footer from '../common/Footer';
import HandleStatus from './HandleStatus';

class OrderDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount() {
        this.props.OrderDetails(this.props.params.id);
    }

    componentDidMount() {
        this.props.OrderDetails(this.props.params.id);
    }

    render() {
        document.title = `${process.env.REACT_APP_TITLE}` + ' | ' + 'Orderdetails';
        let cartObjItem = cookie.load('order');
        let count;
        if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }
        let URL = `${process.env.REACT_APP_API_ENDPOINT}images/`;
        return (
            <div className="main">
                <div className="content">
                    <NavContent cartNumber={count} />
                    <div className="content">
                        <h4><Link className="myorder" title="My Order" to="/orderdetails">My Orders</Link> <i className="fa fa-chevron-right" style={{ 'fontSize': '12px' }} aria-hidden="true" /> <span style={{ 'cursor': 'pointer' }}>Details</span></h4> </div>
                    {this.props.orderdetail.map((item, index) => {
                        if (item.order_Item != undefined) {
                            if (item.order_Item.order != undefined) {
                                return (
                                    <div key={index}>
                                        <div className="_1GRhLX _1YeuTr _3WyGKy">
                                            <div className="row _3pPK-R">
                                                <span className="col-md-6 _3r-GIZ">Order Details</span>
                                                <span className="col-md-6 _3r-GIZ _2Xiaqb"> delivery Address</span>
                                            </div>

                                            <div className="row _3pPK-R">
                                                <div className="_2m1Usk col-md-6">
                                                    <div className="row _2ebRXN">
                                                        <div className="col-md-3 _1hrSE-">
                                                            <span className="eYgzGn">Order ID</span>
                                                        </div>
                                                        <div className="col-md-8">
                                                            <div><span style={{ 'textTransform': 'Uppercase' }}>OD{item._id}</span><span className="_2GcYu-"> ({item.order_Item.length} items)</span></div>
                                                        </div>
                                                    </div>
                                                    <div className="row _2ebRXN">
                                                        <div className="col-md-3 _1hrSE-">
                                                            <span className="eYgzGn">Order Date</span>
                                                        </div>
                                                        <div className="col-md-8">{item.date}</div>
                                                    </div>
                                                    <div className="row _2ebRXN">
                                                        <div className="col-md-3 _1hrSE-">
                                                            <span className="eYgzGn">Total Amount</span>
                                                        </div>
                                                        <div className="col-md-8"><div><span>₹{item.order_Item.totalPrice}</span>
                                                            <span className="_1brAgx"> through {item.payment}</span>
                                                            <span>(including +79 delivery charge)</span>
                                                            {item.promocode_id != null ?
                                                                <div>You have applied
                                                            <span style={{ 'color': 'black' }}> {item.promocode_id.name} </span>
                                                                    coupon code and got
                                                            <span style={{ 'color': 'black' }}> {item.promocode_id.discount}%</span> discount
                                                        </div>
                                                                : null}
                                                        </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 _3dynR2 _3OsVcL _2m1Usk">
                                                    <div className="_1MbX3l">{item.deliver_id.name}</div>
                                                    <div className="_3N_1fR">{item.deliver_id.address}, {item.deliver_id.city}, {item.deliver_id.pincode}, {item.deliver_id.state}</div>
                                                    <div className="_1GAUB_">
                                                        <span className="_1MbX3l">Phone</span>
                                                        <span className="_3eXX5M"> - {item.deliver_id.phone_number}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="_1GRhLX _1YeuTr" >
                                            {item.order_Item.order.map((order, orderitem) => {
                                                return (
                                                    <div className="row x77_9t" key={orderitem}>
                                                        <div className="col-md-1">
                                                            <div className="img">
                                                                <Link to={`/book/${order.book_id._id}`}><img src={URL + order.image} /></Link>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <div className="_2AkmmA row NPoy5u">{order.title}</div>
                                                            <div className="row _3Vj7el">
                                                                <span className="_3PqwaQ">
                                                                    <span className="_3Vj7el">Author:</span>
                                                                    <span className="_14N9bh">{order.book_id.author}</span>
                                                                </span>
                                                            </div>
                                                            <div className="row _3Vj7el">
                                                                <span className="_3PqwaQ">
                                                                    <span className="_3Vj7el">Publisher:</span>
                                                                    <span className="_14N9bh">{order.book_id.publisher}</span>
                                                                </span>
                                                            </div>
                                                            <div className="row _3Vj7el">
                                                                <span className="_3PqwaQ">
                                                                    <span className="_3Vj7el">Quantity:</span>
                                                                    <span className="_14N9bh">{order.quantity}</span>
                                                                </span>
                                                                <span className="_3PqwaQ">
                                                                    <span className="_3Vj7el">Price:</span>
                                                                    <span className="_14N9bh">{order.price}</span>
                                                                </span>
                                                                <span className="_3PqwaQ">
                                                                    <span className="_3Vj7el">Total Price:</span>
                                                                    <span className="_14N9bh">{order.price * order.quantity}</span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-8 _2osiT7">
                                                            <div className="">
                                                                <div className="_3pgCve _3FA7sv">
                                                                    <div id={`round${order._id}`} className="_2Lh8O4 " />
                                                                    <div id={`confirmed${order._id}`} className="_2WCkH8" ><span>Confirmed</span></div>
                                                                    <div className="_3fauu1"><div id={`line${order._id}`} className="empty" /></div>
                                                                </div>
                                                                <div id={`cancel${order._id}`} className="_3pgCve _3FA7sv" style={{ 'display': 'none' }}>
                                                                    <div className="_2Lh8O4 _34zSUK" />
                                                                    <div id="cancelled" className="_2WCkH8 IfEXn5"><span>Cancelled</span></div>
                                                                    <div className="_3fauu1" />
                                                                </div>
                                                                <div className="_3pgCve _3FA7sv">
                                                                    <div id={`pround${order._id}`} className="_2Lh8O4 _3d2A_X" />
                                                                    <div id={`packed${order._id}`} className="_2WCkH8 _3_eq33"><span>Packed</span></div>
                                                                    <div className="_3fauu1"><div id={`pline${order._id}`} className="empty" /></div>
                                                                </div>
                                                                <div className="_3pgCve _3FA7sv">
                                                                    <div id={`sround${order._id}`} className="_2Lh8O4 _3d2A_X" />
                                                                    <div id={`shipped${order._id}`} className="_2WCkH8 _3_eq33"><span>Shipped</span></div>
                                                                    <div className="_3fauu1"><div id={`sline${order._id}`} className="empty" /></div>
                                                                </div>
                                                                <div className="_3pgCve _3FA7sv">
                                                                    <div id={`dround${order._id}`} className="_2Lh8O4 _3d2A_X" />
                                                                    <div id={`delivered${order._id}`} className="_2WCkH8 _3_eq33"><span>Delivered</span></div>
                                                                    <div className="_3fauu1"><div id={`dline${order._id}`} className="empty" /></div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                        <HandleStatus status={order.status} />
                                                    </div>
                                                );
                                            })}
                                            <div className="_1OJGFU">
                                                <div className="_11dQu7">
                                                    <span className="_27lDDD">Total:</span>
                                                    <span className="_1B26g2"> <i className="fa fa-inr" />{item.order_Item.totalPrice} (including +79 delivery charge)</span>
                                                </div>
                                                {item.promocode_id != null ?
                                                    <div>You have applied
                                                <span style={{ 'color': 'black' }}> {item.promocode_id.name} </span>
                                                        coupon code and got
                                             <span style={{ 'color': 'black' }}> {item.promocode_id.discount}%</span> discount
                                            </div>
                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className="_1GRhLX _1YeuTr _3WyGKy" key={index}>
                                        <center>
                                            <p className="issue">Network issue to get order details</p>
                                            <Link className="issue" to="/orderdetails"><i className="fa fa-chevron-left" style={{ 'fontSize': '12px' }} aria-hidden="true" /> Back</Link>
                                        </center>
                                    </div>
                                );
                            }
                        } else {
                            return (
                                <div key={index}>
                                    <div className="_1GRhLX _1YeuTr _3WyGKy">
                                        <div className="row _3pPK-R">
                                            <span className="col-md-6 _3r-GIZ">Order Details</span>
                                            <span className="col-md-6 _3r-GIZ _2Xiaqb"> delivery Address</span>
                                        </div>
                                        <div className="row _3pPK-R">
                                            <div className="_2m1Usk col-md-6">
                                                <div className="row _2ebRXN">
                                                    <div className="col-md-3 _1hrSE-">
                                                        <span className="eYgzGn">Order ID</span>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <div><span style={{ 'textTransform': 'Uppercase' }}>OD{item._id}</span></div>
                                                    </div>
                                                </div>
                                                <div className="row _2ebRXN">
                                                    <div className="col-md-3 _1hrSE-">
                                                        <span className="eYgzGn">Order Date</span>
                                                    </div>
                                                    <div className="col-md-8">{item.date}</div>
                                                </div>
                                                <div className="row _2ebRXN">
                                                    <div className="col-md-3 _1hrSE-">
                                                        <span className="eYgzGn">Total Amount</span>
                                                    </div>
                                                    <div className="col-md-8"><div>
                                                        <span className="_1brAgx"> through {item.payment}</span>
                                                        <span>(including +79 delivery charge)</span>
                                                        {item.promocode_id != null ?
                                                            <div>You have applied
                                                            <span style={{ 'color': 'black' }}> {item.promocode_id.name} </span>
                                                                coupon code and got
                                                            <span style={{ 'color': 'black' }}> {item.promocode_id.discount}%</span> discount
                                                        </div>
                                                            : null}
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 _3dynR2 _3OsVcL _2m1Usk">
                                                <div className="_1MbX3l">{item.deliver_id.name}</div>
                                                <div className="_3N_1fR">{item.deliver_id.address}, {item.deliver_id.city}, {item.deliver_id.pincode}, {item.deliver_id.state}</div>
                                                <div className="_1GAUB_">
                                                    <span className="_1MbX3l">Phone</span>
                                                    <span className="_3eXX5M"> - {item.deliver_id.phone_number}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="_1GRhLX _1YeuTr" >
                                        <p className="network">Network issues to track your order</p>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orderdetail: state.orderdetail
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        OrderDetails: orderId => dispatch(bookActions.OrderDetails(orderId)),
    };
};
OrderDetails.propTypes = {
    OrderDetails: PropTypes.func,
    orderdetail: PropTypes.array,
    params: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
