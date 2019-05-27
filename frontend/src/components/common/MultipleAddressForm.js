import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import Form from '../common/Form';
import $ from 'jquery';
import PropTypes from 'prop-types';

class MultipleAddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.chooseAddress = this.chooseAddress.bind(this);
        this.RadioValidation = this.RadioValidation.bind(this);

        this.state = {
            address_id: ''
        };
    }
    componentWillMount() {
        this.props.GetDeliverAddress();
    }

    componentDidMount() {
        this.props.GetDeliverAddress();
    }

    chooseAddress(e) {
        this.setState({
            address_id: e.currentTarget.value
        });
    }

    RadioValidation(input) {
        if (input.address_id === "") {
            document.getElementById('radio').innerHTML = "select any address";
        } else {
            document.getElementById('radio').innerHTML = "";
            sessionStorage.setItem('Address', JSON.stringify(input));
            this.props.router.push('/checkout');
        }
    }

    render() {

        $('#addnew').on('click', function () {
            $("#form,#cancel").show();
        });
        $('#cancel').on('click', function () {
            $("#form,#cancel").hide();
        });
        return (
            <div >
                <form id="temp" className="temp" onSubmit={e => {
                    e.preventDefault();
                    let input = {
                        address_id: this.state.address_id
                    };
                    this.RadioValidation(input);
                }}>
                    {this.props.addresses.map((a, i) => {
                        return (
                            <div className="radio" key={i}>
                                <label><input type="radio" value={a._id} name="option" onChange={this.chooseAddress.bind(this)} />
                                    <div className="_2HW10N">
                                        <div className="">
                                            <p className="ZBYhh4"><span className="_2Fw4MM" style={{ 'color': 'black' }} >{a.name}</span>
                                                <span className="_3MbGVP _2Fw4MM" style={{ 'color': 'black' }}>{a.phone_number}</span>
                                                <span className="ZBYhh4 _1Zn3iq">{a.address},{a.pincode}</span>
                                                <span className="_3n0HwW">{a.city}, {a.state}</span>
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        );
                    })}
                    <div id="radio" />
                    <button type="submit" className="btn btn-default">Deliver Here</button>
                </form>
                <button id="addnew" style={{ 'marginLeft': '10px' }} className="btn btn-default">+ Add New Address</button>
                <button id="cancel" style={{ 'display': 'none', 'marginLeft': '10px' }} className="btn btn-default">Cancel</button>
                <div id="form" style={{ 'display': 'none', 'marginTop': '10px' }}>
                    <Form />
                </div>
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
    };
};
MultipleAddressForm.propTypes = {
    DeliverAddress: PropTypes.func,
    GetDeliverAddress: PropTypes.func,
    router: PropTypes.object,
    addresses: PropTypes.array
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MultipleAddressForm));
