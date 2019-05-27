import React from 'react';
import Collapsible from 'react-collapsible';
import * as bookActions from '../../actions/bookActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavContent from '../NavContent';
import Footer from '../common/Footer';
import Form from '../common/Form';
import MultipleAddressForm from '../common/MultipleAddressForm';
import OrderItem from './OrderItems';
import PaymentOption from './PaymentOption';
import cookie from 'react-cookies';
import { withRouter } from 'react-router';

class CheckOut extends React.Component {
    constructor(props) {
        super(props);
        this.choosePaymentOption = this.choosePaymentOption.bind(this);
        this.state = { payment: '', loader: false };
    }
    componentDidMount() {
        this.props.GetDeliverAddress();
        this.props.getPromoCode();
    }
    ComponentWillMount() {
        this.setState({ details: true });
        this.props.GetDeliverAddress();
        this.props.getPromoCode();
    }
    choosePaymentOption(e) {
        this.setState({
            payment: e.currentTarget.value
        });
    }
    render() {
        document.title ='Checkout' + ' | ' +  `${process.env.REACT_APP_TITLE}`;
        let count, cartDetails = false, delivery = true, paymentOption = false,
            personDisabled = false, cartDisabled = true, paymentdisabled = true;
        let cartObjItem = cookie.load('order');
        if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }

        if (sessionStorage.getItem('Address')) {
            cartDetails = true; delivery = false; paymentOption = false;
            personDisabled = true; cartDisabled = false; paymentdisabled = true;
        }
        if (sessionStorage.getItem('orderItems')) {
            cartDetails = false; delivery = false; paymentOption = true;
            personDisabled = true; cartDisabled = true; paymentdisabled = false;
        }
        if (this.props.addresses.length > 0) {
            return (
                <div className="main">
                    <div className="content">
                        <NavContent cartNumber={count} />
                        <div className="checkoutform" >
                            <Collapsible trigger="Person Details" open={delivery} triggerDisabled={personDisabled}>
                                <MultipleAddressForm />
                            </Collapsible>
                            <Collapsible trigger="Order Summary" open={cartDetails} triggerDisabled={cartDisabled} >
                                <OrderItem />
                            </Collapsible>
                            <Collapsible trigger="Payment Option" open={paymentOption} triggerDisabled={paymentdisabled}>
                                <PaymentOption />
                            </Collapsible>
                        </div>
                    </div>
                    <div className="loading" style={{ 'display': 'none' }}>
                        <img className="loader" src="http://www.wallies.com/filebin/images/loading_apple.gif" alt="loading" />
                    </div>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div className="main">
                    <div className="content">
                        <NavContent cartNumber={count} />
                        <div className="checkoutform" >
                            <Collapsible trigger="Person Details" open={delivery} triggerDisabled={personDisabled}>
                                <Form />
                            </Collapsible>
                            <Collapsible trigger="Order Summary" open={cartDetails} triggerDisabled={cartDisabled}>
                                <OrderItem />
                            </Collapsible>
                            <Collapsible trigger="Payment Option" open={paymentOption} triggerDisabled={paymentdisabled}>
                                <PaymentOption />
                            </Collapsible>
                        </div>
                    </div>
                    <div className="loading" style={{ 'display': 'none' }}>
                        <img className="loader" src="http://www.wallies.com/filebin/images/loading_apple.gif" alt="loading" />
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        orderCart: state.orderCart,
        addresses: state.address,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        confirmOrder: (details, props) => dispatch(bookActions.confirmOrder(details, props)),
        GetDeliverAddress: () => dispatch(bookActions.GetDeliverAddress()),
        getPromoCode: () => dispatch(bookActions.getPromoCode()),
        getOrderItems: (id) => dispatch(bookActions.getOrderItems(id)),
    };
};

CheckOut.propTypes = {
    confirmOrder: PropTypes.func,
    getPromoCode: PropTypes.func,
    GetDeliverAddress: PropTypes.func,
    orderCart: PropTypes.array,
    router: PropTypes.object,
    addresses: PropTypes.array
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckOut));