import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import PropTypes from 'prop-types';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address_id: ''
        };
    }
    componentWillMount() {
        //this.props.GetDeliverAddress();
    }

    confirmAddress(input) {
        let name = document.getElementsByName('name')[0].value;
        let number = document.getElementsByName('phonenumber')[0].value;
        let pincode = document.getElementsByName('pincode')[0].value;
        let address = document.getElementsByName('address')[0].value;
        let state = document.getElementsByName('state')[0].value;
        let city = document.getElementsByName('city')[0].value;
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
        } else if (pincode.length != 6) {
            document.getElementById("pincodeerror").innerText = 'Required 6 digit';
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
            if (number.length === 10 && pincode.length === 6) {
                sessionStorage.setItem('Address', JSON.stringify(input));
                this.props.router.push('/checkout');
            }
        }
    }

    render() {
        let nameInput, pincode, phone, address, city, state;
        return (
            <div >
                <form className="" onSubmit={e => {
                    e.preventDefault();
                    let input = {
                        name: nameInput.value,
                        pincode: pincode.value,
                        phone_number: phone.value,
                        address: address.value,
                        city: city.value,
                        state: state.value,
                    };
                    this.confirmAddress(input);
                }} >
                    <div className="checkoutform">
                        <div className="checkout">
                            <div className="row part">
                                <div className="col-md-6 infodetail">
                                    <input placeholder="Name"
                                        type="text"
                                        name="name"
                                        ref={node => nameInput = node}
                                        className="form-control field" required />
                                    <p id="nameerror" />
                                </div>
                                <div className="col-md-6 infodetail">
                                    <input placeholder="Phone Number"
                                        type="number"
                                        name="phonenumber"
                                        ref={node => phone = node}
                                        className="form-control field" required />
                                    <p id="phone" />
                                </div>
                            </div>
                            <div className="row part">
                                <div className="col-md-6 infodetail">
                                    <input placeholder="City"
                                        type="text"
                                        name="city"
                                        ref={node => city = node}
                                        className="form-control field" required />
                                    <p id="cityerror" />
                                </div>
                                <div className="col-md-6 infodetail">
                                    <input placeholder="Pincode"
                                        type="number"
                                        name="pincode"
                                        ref={node => pincode = node}
                                        className="form-control field" required />
                                    <p id="pincodeerror" />
                                </div>
                            </div>
                            <div className="row part">
                                <div className="col-md-6 infodetail">
                                    <textarea placeholder="Address"
                                        type="text"
                                        name="address"
                                        ref={node => address = node}
                                        className="form-control field" required />
                                    <p id="addresserror" />
                                </div>
                                <div className="col-md-6 infodetail">
                                    <input placeholder="State"
                                        type="text"
                                        name="state"
                                        ref={node => state = node}
                                        className="form-control field" required />
                                    <p id="stateerror" />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-default">confirm</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addresses: state.address
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        DeliverAddress: (address) => dispatch(bookActions.DeliverAddress(address)),
    };
};
Form.propTypes = {
    DeliverAddress: PropTypes.func,
    router: PropTypes.object
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
