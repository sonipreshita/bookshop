import React from 'react';
import { Link } from 'react-router';
import * as bookActions from '../../actions/bookActions';
import NavContent from '../NavContent';
import AccountOptions from './AccountOptions';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import Footer from '../common/Footer';
import PropTypes from 'prop-types';

class Wishlist extends React.Component {
    constructor(props) {
        super(props);
        this.removeItemWishlist = this.removeItemWishlist.bind(this);
        this.state = {
        };
    }

    componentWillMount() {
        this.props.getWishlist();
    }

    removeItemWishlist(id) {
        this.props.removeItemWishlist(id);
    }

    render() {
        document.title = 'WishList' + ' | ' + `${process.env.REACT_APP_TITLE}`;
        let count;
        let URL = `${process.env.REACT_APP_API_ENDPOINT}images/`;
        let cartObjItem = cookie.load('order');
        if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }
        if (this.props.wishList.length > 0) {
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
                                    <h4>Your Wishlist</h4>
                                    {this.props.wishList.map((item, i) => {
                                        return (
                                            <div key={i}>
                                                <div className="_2HW10N">
                                                    <div className="_1MIUfH">
                                                        <p className="ZBYhh4">
                                                            <span className="_2Fw4MM img">
                                                                <Link to={`/book/${item.book_id._id}`}> <img src={URL + item.book_id.image} title={item.book_id.title} /></Link>
                                                            </span>
                                                            <span style={{ 'color': 'black' }} className="_3MbGVP _2Fw4MM">{item.book_id.title}</span>
                                                            <span className="_3MbGVP _2Fw4MM">Price: <i className="fa fa-inr" /> {item.book_id.price}</span>
                                                            <span className="removeIcon _3MbGVP _2Fw4MM">
                                                                <Link className="removeIcon" to={`/wishlist`} onClick={this.removeItemWishlist.bind(this, item._id)}>
                                                                    <i className="fa fa-trash-o" aria-hidden="true" title="Remove" />
                                                                </Link>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div className="main">
                    <div className="content">
                        <NavContent cartNumber={count} />
                        <div className="content">
                            <div className="row">
                                <div className="col-md-4">
                                    <AccountOptions />
                                </div>
                                <center>
                                    <img src="data:image/png;base64,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" alt="Network Issue" title="" />
                                </center>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div >
            );
        }
    }
}
const mapStateToProps = (state) => {
    return {
        wishList: state.wishList,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getWishlist: () => dispatch(bookActions.getWishlist()),
        removeItemWishlist: (id) => dispatch(bookActions.removeItemWishlist(id)),
    };
};
Wishlist.propTypes = {
    getWishlist: PropTypes.func,
    removeItemWishlist: PropTypes.func,
    wishList: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
