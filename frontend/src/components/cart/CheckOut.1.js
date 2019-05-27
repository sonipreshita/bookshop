import React from 'react';
import Collapsible from 'react-collapsible';
import CartPage from './CartPage';
import * as bookActions from '../../actions/bookActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavContent from '../NavContent';
import Footer from '../common/Footer';
import cookie from 'react-cookies';
import { Link, withRouter } from 'react-router';
import _ from 'lodash';
import $ from 'jquery';

class CheckOut extends React.Component {
    constructor(props) {
        //console.log('props', props)
        super(props);
        this.cartDetails = this.cartDetails.bind(this);
        this.choosePaymentOption = this.choosePaymentOption.bind(this);
        this.openDetails = this.openDetails.bind(this);
        this.openCartDetails = this.openCartDetails.bind(this);
        this.openPaymentOptions = this.openPaymentOptions.bind(this);
        this.state = { payment: '', details: true, cartDetails: false, paymentOption: false };
    }

    ComponentWillMount() {
        this.setState({ details: true });
    }

    choosePaymentOption(e) {
        this.setState({
            payment: e.currentTarget.value
        });
    }

    cartDetails() {
        //let phonenumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        let name = document.getElementById('name').value;
        let number = document.getElementById('number').value;
        let pincode = document.getElementById('pincode').value;
        let address = document.getElementById('address').value;
        let state = document.getElementById('state').value;
        let city = document.getElementById('city').value;
        if (number.length === 0) {
            document.getElementById("phone").innerText = 'Enter Mobile Number ';
        } else if (number.length != 10) {
            document.getElementById("phone").innerText = 'Not valid number';
        } else {
            document.getElementById("phone").innerText = '';
        }
        if (name.length === 0) {
            document.getElementById("nameerror").innerText = 'Enter Name ';
        } else {
            document.getElementById("nameerror").innerText = '';
        }
        if (pincode.length === 0) {
            document.getElementById("pincodeerror").innerText = 'Enter valid Pincode ';
        } else {
            document.getElementById("pincodeerror").innerText = '';
        }
        if (address.length === 0) {
            document.getElementById("addresserror").innerText = 'Enter Your address ';
        } else {
            document.getElementById("addresserror").innerText = '';
        }
        if (state.length === 0) {
            document.getElementById("stateerror").innerText = 'Required ';
        } else {
            document.getElementById("stateerror").innerText = '';
        }
        if (city.length === 0) {
            document.getElementById("cityerror").innerText = 'Required';
        } else {
            document.getElementById("cityerror").innerText = '';
        }
        if (city.length && state.length && address.length && pincode.length && name.length && number.length != 0) {
            if (number.length === 9) {
                this.setState({ cartDetails: true, details: false });
                $('.infodetail').find('p').hide();
            }
        }
    }
    paymentOption() {
        this.setState({ paymentOption: true, cartDetails: false });
    }
    openDetails() {
        this.setState({ paymentOption: false, cartDetails: false, details: true });
    }
    openCartDetails() {
        this.setState({ paymentOption: false, cartDetails: true, details: false });
    }
    openPaymentOptions() {
        this.setState({ paymentOption: true, cartDetails: false, details: false });
    }

    render() {

        let nameInput, pincode, phone, address, city, state, count, userDetails, totalPrice = 0;
        let user = localStorage.getItem('user');
        userDetails = JSON.parse(user);
        _.each(this.props.orderCart, function (d) {
            totalPrice = (totalPrice + Number(d.price * d.quantity));
        });
        const result = 79 + totalPrice;
        //console.log('result',this.props.orderCart)
        let cartObjItem = cookie.load('order');
        if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }
        return (
            <div className="main">
                <div className="content">
                    <NavContent cartNumber={count} />
                    <form className="checkoutform" onSubmit={e => {
                        e.preventDefault();
                        let input = {
                            name: nameInput.value,
                            pincode: pincode.value,
                            phone_number: phone.value,
                            address: address.value,
                            city: city.value,
                            state: state.value,
                            user: userDetails.record.email,
                            payment: this.state.payment,
                            order: this.props.orderCart,
                            totalprice: result
                        };
                        this.props.confirmOrder(input, this.props);
                        //e.target.reset();
                    }}>
                        <Collapsible trigger="Personal Details" open={this.state.details}>
                            <div className="checkoutform">
                                <div className="checkout">
                                    <div className="row part">
                                        <div className="col-md-6 infodetail">
                                            <input placeholder="Name"
                                                type="text"
                                                name="name"
                                                id="name"
                                                defaultValue={userDetails.record.name}
                                                ref={node => nameInput = node}
                                                className="form-control field" required />
                                            <p id="nameerror" />
                                        </div>
                                        <div className="col-md-6 infodetail">
                                            <input placeholder="Mobile Number"
                                                type="number"
                                                id="number"
                                                name="phonenumber"
                                                ref={node => phone = node}
                                                className="form-control field" />
                                            <p id="phone" />
                                        </div>
                                    </div>
                                    <div className="row part">
                                        <div className="col-md-6 infodetail">
                                            <input placeholder="City"
                                                type="text"
                                                name="city"
                                                id="city"
                                                ref={node => city = node}
                                                className="form-control field" required />
                                            <p id="cityerror" />
                                        </div>
                                        <div className="col-md-6 infodetail">
                                            <input placeholder="Pincode"
                                                type="number"
                                                name="Pincode"
                                                id="pincode"
                                                ref={node => pincode = node}
                                                className="form-control field" required />
                                            <p id="pincodeerror" />
                                        </div>
                                    </div>
                                    <div className="row part">
                                        <div className="col-md-6 infodetail">
                                            <input placeholder="Address"
                                                type="text"
                                                name="address"
                                                id="address"
                                                ref={node => address = node}
                                                className="form-control field" required />
                                            <p id="addresserror" />
                                        </div>
                                        <div className="col-md-6 infodetail">
                                            <input placeholder="State"
                                                type="text"
                                                name="state"
                                                id="state"
                                                ref={node => state = node}
                                                className="form-control field" required />
                                            <p id="stateerror" />
                                        </div>
                                    </div>
                                    <div className="field"><Link to="/checkout" onClick={this.cartDetails.bind(this)} className="btn btn-default last">Continue</Link></div>
                                </div>
                            </div>
                        </Collapsible>
                        <Collapsible trigger="Order Summary" open={this.state.cartDetails}>
                            <div className="ordersummary">
                                <CartPage />
                                <div className="field"><Link to="/checkout" onClick={this.paymentOption.bind(this)} className="btn btn-default last">Continue</Link></div>
                            </div>
                        </Collapsible>
                        <Collapsible trigger="Payment Option" open={this.state.paymentOption}>
                            <div className="checkoutform">
                                <div className="field"><input type="radio" name="option" value="Credit/Debit/ATM Card" onChange={this.choosePaymentOption.bind(this)} /><span> Credit/Debit/ATM Card</span></div>
                                <div className="field"><input type="radio" name="option" value="Net Banking" onChange={this.choosePaymentOption.bind(this)} /><span> Net Banking</span></div>
                                <div className="field"><input defaultChecked={true} type="radio" name="option" value="Cash On Delivery" onChange={this.choosePaymentOption.bind(this)} /><span> Cash On Delivery</span></div>
                                <div className="field"><button type="submit" className="btn btn-default last">CONFIRM ORDER</button></div>
                            </div>
                        </Collapsible>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log('called', state)
    return {
        orderCart: state.orderCart,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        confirmOrder: (details, props) => dispatch(bookActions.confirmOrder(details, props)),
        //Orderitems: (orderitem) => dispatch(bookActions.Orderitems(orderitem)),
    };
};

CheckOut.propTypes = {
    confirmOrder: PropTypes.func,
    orderCart: PropTypes.array
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckOut));