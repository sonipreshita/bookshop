import React from 'react';
import NavContent from '../NavContent';
import AccountOptions from './AccountOptions';
import cookie from 'react-cookies';
import Footer from '../common/Footer';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        let count;
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
                                            <span className="_10it6k">Personal Information</span>
                                        </div>
                                        <form className="form-size">
                                            <div className="field">
                                                <input placeholder="Name"
                                                    type="text"
                                                    name="name"
                                                    className="form-control field" required />
                                            </div>
                                            <div className="field">
                                                <input placeholder="Surname"
                                                    type="password"
                                                    name="surname"
                                                    className="form-control field" required />
                                            </div>
                                            <div className="field">
                                                <input placeholder="Email"
                                                    type="password"
                                                    name="email"
                                                    className="form-control field" required />
                                            </div>
                                            <div className="field">
                                                <input placeholder="Phone"
                                                    type="password"
                                                    name="phone"
                                                    className="form-control field" required />
                                            </div>
                                            <div className="field">
                                                <div className="oZoRPi">Save Details</div>
                                            </div>
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

export default Account;
