import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import * as bookActions from '../actions/bookActions';

class NavContent extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            nav: '', userStatus: false, cartItems: 0, cookiesItems: 0
        };
    }
    componentWillMount() {
        this.props.fetchCart();
        this.props.getWishlist();
        this.setState({ cookiesItems: this.props.cartNumber });
        let token = sessionStorage.getItem('user');
        if (token) {
            this.setState({ userStatus: true });
        } else {
            this.setState({ userStatus: false });
        }
    }

    componentDidMount() {
        window.addEventListener('onbeforeunload', this.logout);
    }

    componentWillReceiveProps() {
        let token = sessionStorage.getItem('user');
        if (token) {
            this.setState({ userStatus: true });
        } else {
            this.setState({ userStatus: false });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('onbeforeunload', this.logout);
    }

    logout() {
        let token = sessionStorage.getItem('user');
        if (token) {
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('proceedData');
            sessionStorage.removeItem('promocode');
            sessionStorage.removeItem('result');
            sessionStorage.removeItem('Address');
            sessionStorage.removeItem('orderItems');
            cookie.remove('order');
        }
    }
    handleOnKeyPress(e) {
        if (e.charCode === 13) {
            const value = e.currentTarget.value.trim();
            if (value !== '') {
                const pathname = `/book/search/${value}`;
                this.props.router.push(pathname);
            }
        }
    }
    render() {
        let wishItem, cartItems = 0, wish;
        let read;
        let token = sessionStorage.getItem('user');
        let userName = JSON.parse(token);
        if (token) {
            read = { items: this.props.items };
            cartItems = read.items.length;
            wish = { items: this.props.wishList };
            wishItem = wish.items.length;
        }
        return (
            <nav id="navbar" className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/"><b>Bookify</b></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav" >
                            <input id="text" type="text" name="search" placeholder="Search.." onKeyPress={this.handleOnKeyPress} ref="query" />
                        </ul>
                        <ul style={{ 'display': (this.state.userStatus === false ? 'block' : 'none') }} className="nav navbar-nav list">
                            <li><Link to="/cart">
                                <div><i className="fa fa-shopping-cart" /></div>
                                <div className="_3vET">{this.state && this.state.cookiesItems ? this.state.cookiesItems : 0}</div>
                            </Link>
                            </li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </ul>
                        <ul style={{ 'display': (this.state.userStatus === true ? 'block' : 'none') }} className="nav navbar-nav list">
                            <li>
                                <Link to="/cart">
                                    <div><i className="fa fa-shopping-cart" /></div>
                                    <div className="_3vET">{cartItems}</div>
                                </Link>
                            </li>
                            <li style={{ 'display': (this.state.userStatus === true ? 'block' : 'none') }}>
                                <Link to="/wishlist">
                                    <div><i className="fa fa-heart" /></div>
                                    <div className="_3vET">{wishItem}</div>
                                </Link>
                            </li>
                            <li><div className="dropdown">
                                <a className="dropbtn" type="button" id="menu1">
                                    <i className="fa fa-user-circle-o" /> Hello!, {userName && userName.record.name ? userName.record.name : null}</a>
                                <div className="dropdown-content">
                                    <Link to="/account/address">Account</Link>
                                    <Link to="/orderdetails">My Order</Link>
                                    <Link to="/wishlist">Wishlist</Link>
                                    <a onClick={this.logout.bind(this)} href="/" className="cursore" role="menuitem" >Logout</a>
                                </div>
                            </div></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.orderCart,
        loginSuccess: state.userAuth,
        wishList: state.wishList
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCart: bookId => dispatch(bookActions.fetchCart(bookId)),
        getWishlist: () => dispatch(bookActions.getWishlist()),
    };
};

NavContent.propTypes = {
    loginSuccess: PropTypes.string,
    router: PropTypes.object,
    fetchCart: PropTypes.func,
    getWishlist: PropTypes.func,
    items: PropTypes.array,
    wishList: PropTypes.array,
    cartNumber: PropTypes.number
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavContent));