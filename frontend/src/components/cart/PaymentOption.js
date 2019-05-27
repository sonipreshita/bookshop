import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as bookActions from '../../actions/bookActions';
import _ from 'lodash';
import StripeCheckout from 'react-stripe-checkout';
import $ from 'jquery';

class PaymentOption extends React.Component {
    constructor(props) {
        super(props);
        this.choosePaymentOption = this.choosePaymentOption.bind(this);
        this.onToken = this.onToken.bind(this);
        this.state = {
            payment: '', promocode: ''
        };
    }
    componentWillMount() {
        //this.props.getPromoCode();
    }

    onToken(token) {
        setTimeout(function () { $('.loading').show(); }, 2000);
        let address = JSON.parse(sessionStorage.getItem('Address'));
        const number = Number(sessionStorage.getItem('result'));
        const result = Math.round(number);
        let orderData = [];
        let tokenData = {
            description: 'test',
            source: token.id,
            currency: 'USD',
            amount: result
        };
        let input = {
            payment: this.state.payment,
            address: address,
            order: sessionStorage.getItem('proceedData'),
            promocode_id: sessionStorage.getItem('promocode'),
        };
        orderData.tokenData = tokenData;
        orderData.input = input;
        this.props.PayWithCard(orderData, this.props);
    }

    choosePaymentOption(e) {
        if (e.currentTarget.value === 'Credit/Debit/ATM Card') {
            let personDetails = sessionStorage.getItem('Address');
            let order = sessionStorage.getItem('orderItems');
            if (order && personDetails) {
                $('#credit').append('#card');
                $('#card').show();
                $('#submitbtn').hide();
                this.setState({
                    payment: e.currentTarget.value
                });
                document.getElementById('nopayment').innerHTML = "";
            }
        } else {
            this.setState({
                payment: e.currentTarget.value
            });
            $('#card').hide();
            $('#submitbtn').show();
        }
    }

    render() {
        let totalPrice = 0;
        let address = sessionStorage.getItem('Address');
        let orderItem = sessionStorage.getItem('orderItems');
        if (orderItem) {
            let orders = JSON.parse(orderItem);
            _.each(orders.order, function (d) {
                totalPrice = (totalPrice + Number(d.book_id.price * d.quantity));
            });
        }
        const number = Number(sessionStorage.getItem('result'));
        const result = Math.round(number);
        return (
            <div className="">
                <div className="credit">
                    <div className="row">
                        <div className="col-md-4">
                            <form className="row" onSubmit={e => {
                                e.preventDefault();
                                let input = {
                                    payment: this.state.payment,
                                    address: JSON.parse(address),
                                    order: sessionStorage.getItem('proceedData'),
                                    promocode_id: sessionStorage.getItem('promocode'),
                                    charge: ''
                                };
                                this.props.confirmOrder(input, this.props);
                                e.target.reset();
                            }} >
                                <div className="paymentoption col-md-10">
                                    <div id="nopayment" />
                                    <label className="radio_option"><input id="credit" type="radio" onChange={this.choosePaymentOption.bind(this)} name="option1" value="Credit/Debit/ATM Card" /><span> Credit/Debit/ATM Card</span></label>
                                    <label className="radio_option"><input type="radio" onChange={this.choosePaymentOption.bind(this)} name="option1" value="Net Banking" /><span> Net Banking</span></label>
                                    <label className="radio_option"><input onChange={this.choosePaymentOption.bind(this)} type="radio" name="option1" value="Cash On Delivery" /><span> Cash On Delivery</span></label>
                                    <div id="items" />
                                </div>
                                <div id="submitbtn" className="col-md-2" style={{ 'display': 'none' }} ><button type="submit" id="abc" className="btn btn-default">Confirm order</button></div>
                            </form>
                        </div>
                        <div id="card" className="col-md-8" style={{ 'display': 'none' }}>
                            <StripeCheckout
                                token={this.onToken}
                                amount={result}
                                stripeKey="pk_test_P8xnL87IPY198TbrPBFADABf"
                            /><div className="amountLabel"><span className="payableamount">Your extending amount is ₹ {result}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orderCart: state.orderCart,
        coupons: state.coupons
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        confirmOrder: (details, props) => dispatch(bookActions.confirmOrder(details, props)),
        PayWithCard: (token, props) => dispatch(bookActions.PayWithCard(token, props)),
    };
};
PaymentOption.propTypes = {
    confirmOrder: PropTypes.func,
    PayWithCard: PropTypes.func,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentOption));
