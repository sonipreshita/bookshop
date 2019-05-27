import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as bookActions from '../../actions/bookActions';
import PropTypes from 'prop-types';
import Footer from '../common/Footer';


class Signup extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (this.props.signupSuccess === 'OK') {
            if (this.props.location.state) {
                let newPath = this.props.location.state.path;
                this.props.router.push({ pathname: newPath });
            } else {
                this.props.router.push('/');
            }
        }
        let token = sessionStorage.getItem('user');
        if (token) {
            this.props.router.push('/');
        }
    }

    componentDidUpdate() {
        if (this.props.signupSuccess === 'OK') {
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
        document.title = 'Sign Up' + ' | ' + `${process.env.REACT_APP_TITLE}`;
        let nameInput, emailInput, passwordInput = null;
        return (
            <MuiThemeProvider>
                <div className="main">
                    <div className="content">
                        <h1><center><Link to="/" className="bookify">BookiFy</Link></center></h1>
                        <div className="_32LSmx">
                            <div className="login-content row1 row">
                                <div className="_1XBjg- ">
                                    <span className="_1hgiYz">
                                        <span>Signup</span>
                                    </span>
                                    <p className="_1NJjZd">
                                        <span>Get access to your Orders, Wishlist and Recommendations</span>
                                    </p>
                                </div>
                                <div className="col-md-8">
                                    <center>
                                        <form className="form-size" onSubmit={e => {
                                            e.preventDefault();
                                            let input = {
                                                name: nameInput.value,
                                                email: emailInput.value,
                                                password: passwordInput.value,
                                            };
                                            this.props.createUser(input);
                                        }}>
                                            <div className="field">
                                                <input placeholder="Name"
                                                    type="text"
                                                    name="name"
                                                    ref={node => nameInput = node}
                                                    className="form-control field" />
                                                <span className="alertmsg" id="name" />
                                            </div>
                                            <div className="field">
                                                <input placeholder="Email"
                                                    type="text"
                                                    name="email"
                                                    ref={node => emailInput = node}
                                                    className="form-control field" />
                                                <span className="alertmsg" id="email" />
                                            </div>
                                            <div className="field">
                                                <input placeholder="Password"
                                                    type="password"
                                                    name="password"
                                                    ref={node => passwordInput = node}
                                                    className="form-control field" />
                                                <span className="alertmsg" id="password" />
                                            </div>
                                            <button type="submit" className="btn btn-default signupbtn">SIGN UP</button>
                                        </form>
                                        <div className="form-text">Already have an account?<Link to={`/login`}>Login</Link></div>
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
        categorybooks: state.categoryBooks,
        signupSuccess: state.createUserAuth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: user => dispatch(bookActions.createUser(user)),
    };
};

Signup.propTypes = {
    createUser: PropTypes.func.isRequired,
    signupSuccess: PropTypes.string.isRequired,
    router: PropTypes.object,
    location: PropTypes.object
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
