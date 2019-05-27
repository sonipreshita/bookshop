import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as bookActions from '../../actions/bookActions';
import Categories from '../common/Categories';
import PropTypes from 'prop-types';
import NavContent from '../NavContent';
import cookie from 'react-cookies';
import Footer from '../common/Footer';

class SearchBook extends React.Component {
    constructor(props) {
        super(props);
        this.SearchBook = this.SearchBook.bind(this);
    }
    componentWillMount() {
        this.SearchBook();
    }

    SearchBook() {
        this.props.SearchBook();
    }
    render() {
        let cartObjItem = cookie.load('order');
        let count;
        if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }
        let URL = `${process.env.REACT_APP_API_ENDPOINT}images/`;
        return (
            <div className="main">
                <div className="content">
                    < NavContent cartNumber={count} />
                    <div className="row">
                        <div className="col-md-4">
                            <Categories />
                        </div>
                        <div className="col-md-8">
                            {this.props.searchBook.map((c, i) => {
                                return (
                                    <div key={i} className="col-md-4 col-xs-6 text-center ">
                                        <Link to={`/book/${c._id}`} className="bookPageLink">
                                            <div className="catPageRating">
                                                <div className="userStoreSpecificRatingBox ratingPositive">
                                                    4.2
                                            </div>
                                            </div>
                                            <div className="bookImageBox">
                                                <img className="showimg" src={URL + c.image} alt={c.title} title={c.title} />
                                            </div>
                                            <div className="truncateName1">{c.title}</div>
                                            <div className="text-light text-09 truncateAuthor">
                                                By {c.author.substring(0, 10) + (c.author.length > 10 ? '...' : '')}
                                            </div></Link>
                                    </div>
                                );
                            })}
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
        searchBook: state.searchBook
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        SearchBook: () => dispatch(bookActions.SearchBook()),
    };
};
SearchBook.propTypes = {
    searchBook: PropTypes.array,
    SearchBook: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBook);
