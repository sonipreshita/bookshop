import React from 'react';
import { connect } from 'react-redux';
import Categories from '../common/Categories';
import { Link } from 'react-router';
import * as bookActions from '../../actions/bookActions';
import PropTypes from 'prop-types';
import NavContent from '../NavContent';
import cookie from 'react-cookies';
import Footer from '../common/Footer';
import _ from 'lodash';
import $ from 'jquery';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.HighToLow = this.HighToLow.bind(this);
    this.LowToHigh = this.LowToHigh.bind(this);
    this.LatestBooks = this.LatestBooks.bind(this);
    this.state = {
      class: 'sort', first: '', second: '', third: ''
    };
  }

  componentWillMount() {
    this.setState({ first: '', second: '', third: '' });
    this.props.fetchBookByCategoryID(this.props.params.id);
    this.props.getCategoryName(this.props.params.id);
  }

  componentDidMount() {
    this.props.getCategoryName(this.props.params.id);
  }

  HighToLow() {
    this.setState({ first: 'first', second: '', third: '' });
    this.props.BooksHighToLow(this.props.params.id);
  }

  LowToHigh() {
    this.setState({ first: '', second: 'second', third: '' });
    this.props.BooksLowToHigh(this.props.params.id);
  }

  LatestBooks() {
    this.setState({ first: '', second: '', third: 'third' });
    this.props.LatestBooks(this.props.params.id);
  }

  render() {
    let category;
    let pathName = window.location.pathname;
    $('#navigation a').each(function () {
      let clicked = $(this).attr('href');
      if (clicked === pathName) {
        $(this).find('li').addClass('cate');
      } else {
        $(this).find('li').removeClass('cate');
      }
    });
    _.each(this.props.categoryName, function (d) {
      category = d.name;
    });
    if (category != undefined) {
      document.title = category + ' | ' + `${process.env.REACT_APP_TITLE}`;
    } else {
      document.title = "category" + ' | ' + `${process.env.REACT_APP_TITLE}`;
    }
    let cartObjItem = cookie.load('order');
    let count;
    if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }
    let URL = `${process.env.REACT_APP_API_ENDPOINT}images/`;
    if (this.props.categorybooks.length > 0) {
      return (
        <div className="main">
          <div className="content">
            <NavContent cartNumber={count} />
            <div className="row">
              <div className="col-md-4">
                <Categories />
              </div>
              <div className="col-md-8 book">
                <span className="fromcategory">{category}</span>
                <div className="indivCategory">
                  <section className="sorting">
                    <span className="sort-by">Sort By</span>
                    <ul className="listing">
                      <li className={this.state.class + ' ' + this.state.first} onClick={this.HighToLow.bind(this)}>Price High-Low <i className="fa fa-arrow-down" aria-hidden="true" /></li>
                      <li className={this.state.class + ' ' + this.state.second} onClick={this.LowToHigh.bind(this)}>Price Low-High <i className="fa fa-arrow-up" aria-hidden="true" /></li>
                      <li className={this.state.class + ' ' + this.state.third} onClick={this.LatestBooks.bind(this)}>Latest Add <i className="fa fa-clock-o" aria-hidden="true" /></li>
                    </ul>
                  </section>
                </div>
                <div className="row">
                  {this.props.categorybooks.map((c, i) => {
                    return (
                      <div key={i} className="col-md-4 col-xs-6 text-center grow ">
                        <Link to={`/book/${c._id}`} className="bookPageLink">
                          <div className="catPageRating" />
                          <div className="bookImageBox">
                            <img className="showimg" src={URL + c.image} alt={c.title} title={c.title} />
                            <p className="truncateName1">{c.title}</p>
                            <p className="text-light text-09 truncateAuthor">
                              By {c.author.substring(0, 10) + (c.author.length > 10 ? '...' : '')}
                            </p>
                            <p>Price: <i className="fa fa-inr" /> {c.price}</p>
                          </div>
                        </Link>
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
    }
    else {
      return (
        <div className="main">
          <div className="content">
            <NavContent cartNumber={count} />
            <div className="row">
              <div className="col-md-4">
                <Categories />
              </div>
              <div className="col-md-8 book">
                <span className="fromcategory">{category}</span>
                <div className="indivCategory">
                  <section className="sorting">
                    <span className="sort-by">Sort By</span>
                    <ul className="listing">
                      <li className={this.state.class + ' ' + this.state.first} onClick={this.HighToLow.bind(this)}>Price High-Low <i className="fa fa-arrow-down" aria-hidden="true" /></li>
                      <li className={this.state.class + ' ' + this.state.second} onClick={this.LowToHigh.bind(this)}>Price Low-High <i className="fa fa-arrow-up" aria-hidden="true" /></li>
                      <li className={this.state.class + ' ' + this.state.third} onClick={this.LatestBooks.bind(this)}>Latest Add <i className="fa fa-clock-o" aria-hidden="true" /></li>
                    </ul>
                  </section>
                </div>
                <center>
                  <div className="info">
                    <b style={{ 'fontSize': '25px' }}>OOPS !! <i className="fa fa-frown-o" aria-hidden="true" /></b>
                    <p className="nodata">There are no books available for this category.</p>
                    <p className="nodata"> We will upadte that soon.Thank you <i className="fa fa-smile-o" aria-hidden="true" /></p>
                  </div>
                </center>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    categorybooks: state.categoryBooks,
    categoryName: state.categoryName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBook: book => dispatch(bookActions.createBook(book)),
    fetchBookByCategoryID: cate_id => dispatch(bookActions.fetchBookByCategoryID(cate_id)),
    BooksHighToLow: cate_id => dispatch(bookActions.BooksHighToLow(cate_id)),
    BooksLowToHigh: cate_id => dispatch(bookActions.BooksLowToHigh(cate_id)),
    LatestBooks: cate_id => dispatch(bookActions.LatestBooks(cate_id)),
    getCategoryName: cate_id => dispatch(bookActions.getCategoryName(cate_id)),
  };
};

Book.propTypes = {
  createBook: PropTypes.func.isRequired,
  BooksHighToLow: PropTypes.func.isRequired,
  getCategoryName: PropTypes.func.isRequired,
  categoryName: PropTypes.array,
  BooksLowToHigh: PropTypes.func.isRequired,
  LatestBooks: PropTypes.func.isRequired,
  fetchBookByCategoryID: PropTypes.func.isRequired,
  params: PropTypes.object,
  book: PropTypes.object,
  categorybooks: PropTypes.array,
};
export default connect(mapStateToProps, mapDispatchToProps)(Book);
