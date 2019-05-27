import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as bookActions from '../../actions/bookActions';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import Footer from '../common/Footer';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (this.props.loginSuccess === 'OK') {
            if (this.props.location.state) {
                let newPath = this.props.location.state.path;
                this.props.router.push({ pathname: newPath });
            } else {
                this.props.fetchCart();
                this.props.router.push('/');
            }
        }
        let token = sessionStorage.getItem('user');
        if (token) {
            this.props.router.push('/');
        }
    }
    
    componentDidUpdate() {
        if (this.props.loginSuccess === 'OK') {
            if (this.props.location.state) {
                let newPath = this.props.location.state.path;
                this.props.router.push({ pathname: newPath });
            } else {
                let path = window.location.pathname;
                this.props.router.push({ pathname: '/', state: { path: path } });
            }
        }
    }

    render() {
        let read = cookie.load('order');
        document.title = 'Log In' + ' | ' + `${process.env.REACT_APP_TITLE}`;
        let emailInput, passwordInput = null;
        return (
            <MuiThemeProvider>
                <div className="main">
                    <div className="content">
                        <h1><center><Link to="/" className="bookify">BookiFy</Link></center></h1>
                        <div className="_32LSmx">
                            <div className="login-content row1 row">
                                <div className="_1XBjg- ">
                                    <span className="_1hgiYz">
                                        <span>Login</span>
                                    </span>
                                    <p className="_1NJjZd">
                                        <span>Get access to your Orders, Wishlist and Recommendations</span>
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <div className="userfailed">{this.props.loginSuccess}</div>
                                    <center>
                                        <form className="form-size" onSubmit={e => {
                                            e.preventDefault();
                                            let input = {
                                                email: emailInput.value,
                                                password: passwordInput.value,
                                            };
                                            this.props.loginUser(input);
                                            if (read) {
                                                this.props.addToCartForLoggedUser(read);
                                            }
                                            //e.target.reset();
                                        }} >
                                            <div className="field">
                                                <input placeholder="Email"
                                                    type="text"
                                                    name="email"
                                                    ref={node => emailInput = node}
                                                    className="form-control field" />
                                                <span className="alertmsg" id="loginemail" />
                                            </div>
                                            <div className="field">
                                                <input placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    ref={node => passwordInput = node}
                                                    className="form-control field" />
                                                <span className="alertmsg" id="loginpassword" />
                                            </div>
                                            <button type="submit" className="btn btn-default signupbtn">LOGIN</button>
                                        </form>
                                        <div className="form-text">
                                            <h5 className="line">New To Bookify?</h5>
                                        </div>
                                        <Link to={`/signup`}><button className="btn btn-default create">Create Account</button></Link>
                                    </center>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </MuiThemeProvider>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        loginSuccess: state.userAuth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: login => dispatch(bookActions.loginUser(login)),
        addToCartForLoggedUser: item => dispatch(bookActions.loginUser(item)),
        fetchCart: bookId => dispatch(bookActions.fetchCart(bookId)),
    };
};

Login.propTypes = {
    addToCartForLoggedUser: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
    fetchCart: PropTypes.func.isRequired,
    loginSuccess: PropTypes.string.isRequired,
    router: PropTypes.object,
    location: PropTypes.object
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
