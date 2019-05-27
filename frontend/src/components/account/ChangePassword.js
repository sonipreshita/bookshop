import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import NavContent from '../NavContent';
import AccountOptions from './AccountOptions';
import cookie from 'react-cookies';
import Footer from '../common/Footer';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let count, oldInput, newInput, confirmInput;
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
                                            <span className="_10it6k">Change Password</span>
                                        </div>
                                        <center><span id="success" /></center>
                                        <form className="form-size" onSubmit={e => {
                                            e.preventDefault();
                                            let input = {
                                                oldpassword: oldInput.value,
                                                newpassword: newInput.value,
                                                confirmpassword: confirmInput.value,
                                            };
                                            this.props.updatePassword(input);
                                            e.target.reset();
                                        }} >
                                            <div className="field">
                                                <input placeholder="Old Password"
                                                    type="password"
                                                    name="oldpassword"
                                                    ref={node => oldInput = node}
                                                    className="form-control field" />
                                                <span id="oldpassword" />
                                            </div>
                                            <div className="field">
                                                <input placeholder="New Password"
                                                    type="password"
                                                    name="newpassword"
                                                    ref={node => newInput = node}
                                                    className="form-control field" />
                                                <span id="newpassword" />
                                            </div>
                                            <div className="field">
                                                <input placeholder="Confirm Password"
                                                    type="password"
                                                    name="confirmpassword"
                                                    ref={node => confirmInput = node}
                                                    className="form-control field" />
                                                <span id="confirmpassword" />
                                            </div>
                                            <button type="submit" className="btn btn-default">confirm</button>
                                        </form>
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
const mapStateToProps = () => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePassword: (details) => dispatch(bookActions.updatePassword(details)),
    };
};

ChangePassword.propTypes = {
    updatePassword:PropTypes.func,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
