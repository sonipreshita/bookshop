import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import NavContent from '../NavContent';
import AccountOptions from './AccountOptions';
import cookie from 'react-cookies';
import Footer from '../common/Footer';

class ManageAddress extends React.Component {
    constructor(props) {
        super(props);
        this.removeAddress = this.removeAddress.bind(this);
        this.state = {
            details: true,
            showFormId: '',
            editFormShow: false,
            newForm: false,
            cancelAddress: false,
            hide: false
        };
    }
    componentWillMount() {
        this.setState({ newForm: false });
        this.props.GetDeliverAddress();
    }

    componentDidMount() {
        this.props.GetDeliverAddress();
    }

    removeAddress(id) {
        this.setState({ newForm: false });
        this.props.removeAddress(id);
    }

    handleValidation(input) {
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
                this.setState({ newForm: false });
                this.props.DeliverAddress(input);
            }
        }
    }

    render() {
        document.title = 'My Account' + ' | ' + `${process.env.REACT_APP_TITLE}`;
        let count, nameInput, pincode, phone, address, city, state;
        let cartObjItem = cookie.load('order');
        if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }
        return (
            <div className="main">
                <div className="content">
                    <NavContent cartNumber={count} />
                    <div className="content">
                        <div className="row">
                            <div className="col-md-4">
                                <AccountOptions />
                            </div>
                            <div className="col-md-8 _1GRhLX">
                                <div className="_1JMKW3">
                                    <div className="l022CW">
                                        <div className="_2aK_Hc">
                                            <span className="_10it6k">Address Detail</span>
                                        </div>
                                        <div className="Collapsible Collapsible__trigger" onClick={() => { this.setState({ newForm: true }); }} >+ Add New Address</div>
                                        {this.state.newForm === true ? <form className="" onSubmit={e => {
                                            e.preventDefault();
                                            let input = {
                                                name: nameInput.value,
                                                pincode: pincode.value,
                                                phone_number: phone.value,
                                                address: address.value,
                                                city: city.value,
                                                state: state.value,
                                            };
                                            this.handleValidation(input);
                                            //e.target.reset();
                                        }} >
                                            <div className="newform">
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
                                                    <button type="submit" style={{ 'marginRight': '15px' }} className="btn btn-default">Confirm</button>
                                                    <input id="cancel" type="button" onClick={() => { this.setState({ newForm: false }); }} className="btn btn-default" value="Cancel" />
                                                </div>
                                            </div>
                                        </form> : null}
                                        {this.props.addresses.map((a, i) => {
                                            if (a.is_deleted === 'false')
                                                return (
                                                    <div key={i}>
                                                        <div id={`card${a._id}`} className="_2HW10N">
                                                            <div id={`address${a._id}`} className="_1MIUfH">
                                                                <div className="ZBYhh4"><span className="_2Fw4MM">{a.name}</span>
                                                                    <span className="_3MbGVP _2Fw4MM">{a.phone_number}</span>
                                                                    <span className=" _3MbGVP _2Fw4MM">
                                                                        <a className="deleteIcon" onClick={() => { this.setState({ showFormId: a._id, cancelAddress: true }); }}>
                                                                            <i className="fa fa-trash-o" aria-hidden="true" title="Remove" />
                                                                        </a>
                                                                        <a className="editIcon" onClick={() => { this.setState({ showFormId: a._id, editFormShow: true, cancelAddress: false }); }}>
                                                                            <i className="icon-edit" aria-hidden="true" title="Edit" />
                                                                        </a>
                                                                    </span>
                                                                    {a._id === this.state.showFormId && this.state.cancelAddress === true ?
                                                                        <div className="alert_msg">
                                                                            <div className="textConfirm">Are you sure??</div>
                                                                            <div className="text_center">
                                                                                <a className="btn btn-xs btn-primary rightIcon" onClick={this.removeAddress.bind(this, a._id)}>
                                                                                    <i className="fa fa-check" aria-hidden="true" title="Confirm" />
                                                                                </a>
                                                                                <a className="btn btn-xs btn-default closeIcon" onClick={() => { this.setState({ showFormId: '', cancelAddress: false }); }}>
                                                                                    <i className="fa fa-close" aria-hidden="true" title="Cancel" />
                                                                                </a>
                                                                            </div>
                                                                        </div> : null}
                                                                    <span className="ZBYhh4 _1Zn3iq">{a.address},{a.pincode}</span>
                                                                    <span className="_3n0HwW">{a.city}, {a.state}</span>
                                                                </div>
                                                            </div>
                                                            {a._id === this.state.showFormId && this.state.editFormShow === true ? <form id={a._id} onSubmit={e => {
                                                                e.preventDefault();
                                                                let input = {
                                                                    name: this.textInput.value,
                                                                    pincode: this.pincode.value,
                                                                    phone_number: this.phone.value,
                                                                    address: this.address.value,
                                                                    city: this.city.value,
                                                                    state: this.state.value,
                                                                };
                                                                this.props.updateAddress(a._id, input);
                                                            }} >
                                                                <div className="eidtform">
                                                                    <div className="_2aK_Hc" style={{ 'marginBottom': '10px' }}>
                                                                        <span className="_10it6k">Edit Address</span>
                                                                    </div>
                                                                    <div className="checkout">
                                                                        <div className="row part">
                                                                            <div className="col-md-6 infodetail">
                                                                                <input placeholder="Name"
                                                                                    type="text"
                                                                                    name="name"
                                                                                    defaultValue={a.name}
                                                                                    ref={(input) => { this.textInput = input; }}
                                                                                    className="form-control field" required />
                                                                                <p id="nameerror" />
                                                                            </div>
                                                                            <div className="col-md-6 infodetail">
                                                                                <input placeholder="Phone Number"
                                                                                    type="number"
                                                                                    name="phonenumber"
                                                                                    defaultValue={a.phone_number}
                                                                                    ref={(input) => { this.phone = input; }}
                                                                                    className="form-control field" required />
                                                                                <p id="phone" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row part">
                                                                            <div className="col-md-6 infodetail">
                                                                                <input placeholder="City"
                                                                                    type="text"
                                                                                    name="city"
                                                                                    defaultValue={a.city}
                                                                                    ref={(input) => { this.city = input; }}
                                                                                    className="form-control field" required />
                                                                                <p id="cityerror" />
                                                                            </div>
                                                                            <div className="col-md-6 infodetail">
                                                                                <input placeholder="Pincode"
                                                                                    type="number"
                                                                                    name="Pincode"
                                                                                    defaultValue={a.pincode}
                                                                                    ref={(input) => { this.pincode = input; }}
                                                                                    className="form-control field" required />
                                                                                <p id="pincodeerror" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row part">
                                                                            <div className="col-md-6 infodetail">
                                                                                <textarea placeholder="Address"
                                                                                    type="text"
                                                                                    name="address"
                                                                                    defaultValue={a.address}
                                                                                    ref={(input) => { this.address = input; }}
                                                                                    className="form-control field" required />
                                                                                <p id="addresserror" />
                                                                            </div>
                                                                            <div className="col-md-6 infodetail">
                                                                                <input placeholder="State"
                                                                                    type="text"
                                                                                    name="state"
                                                                                    defaultValue={a.state}
                                                                                    ref={(input) => { this.state = input; }}
                                                                                    className="form-control field" required />
                                                                                <p id="stateerror" />
                                                                            </div>
                                                                        </div>
                                                                        <button type="submit" className="btn btn-default" style={{ 'marginRight': '15px' }}>Update</button>
                                                                        <input id="cancel" type="button" onClick={() => { this.setState({ showFormId: '', editFormShow: false }); }} className="btn btn-default" value="Cancel" />
                                                                    </div>
                                                                </div>
                                                            </form> : null}
                                                        </div>
                                                    </div>
                                                );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
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
        GetDeliverAddress: () => dispatch(bookActions.GetDeliverAddress()),
        removeAddress: (id) => dispatch(bookActions.removeAddress(id)),
        updateAddress: (id, updateData) => dispatch(bookActions.updateAddress(id, updateData)),

    };
};
ManageAddress.propTypes = {
    DeliverAddress: PropTypes.func,
    removeAddress: PropTypes.func,
    updateAddress: PropTypes.func,
    GetDeliverAddress: PropTypes.func,
    addresses: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageAddress);
