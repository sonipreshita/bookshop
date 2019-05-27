import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as bookActions from '../../actions/bookActions';
import Categories from './Categories';
import Footer from './Footer';
import PropTypes from 'prop-types';
import NavContent from '../NavContent';
import cookie from 'react-cookies';
import $ from 'jquery';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      isFetching: false,
      nextPageLink: false,
      userAuth: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    if (this.props.userAuth === "OK") {
      let path = this.props.location.state;
      if (path) {
        if (this.props.location.state.path === '/login' || '/signup') {
          $('#message').show().fadeOut(3000);
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nextlink.nextPageLink) {
      this.setState({
        nextPageLink: nextProps.nextlink.nextPageLink
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  fetchBooks(id) {
    this.props.fetchBookByCategoryID(id);
  }

  handleScroll() {
    this.setState({ isFetching: true });
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.props.nextlink.nextPageLink != false) {
        this.props.fetchMoreCategories(this.props.nextlink.nextPageLink);
        this.setState({ isFetching: false });
      } else {
        this.setState({ isFetching: false });
      }
    }
  }

  render() {
    document.title = 'Home' + ' | ' + `${process.env.REACT_APP_TITLE}`;
    let cartObjItem = cookie.load('order');
    let count;
    if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }
    let URL = `${process.env.REACT_APP_API_ENDPOINT}images/`;
    return (
      <div className="main">
        <div className="content">
          <NavContent cartNumber={count} />
          <center>
            <div id="message" className="alert alert-success" style={{ 'display': 'none', 'marginTop': '10px' }}>
              <a className="close" data-dismiss="alert" aria-label="close">&times;</a>
              <strong>Success!</strong> You are logged in
            </div>
          </center>
          <div id="categories" className="row">
            <div className="col-md-4">
              <Categories />
            </div>
            <div className="col-md-8">
              <div className="indivCategory">
                <span className="indivCategoryTitle">Top Categories</span>
              </div>
              <div className="row">
                {this.props.categories.categories.map((c, i) => {
                  return (
                    <div key={i} className="col-md-4 col-xs-6 text-center grow">
                      <Link to={`/category/${c._id}`} onClick={this.fetchBooks.bind(this, c._id)} className="bookPageLink">
                        <div className="bookImageBox">
                          <img className=" showimg" src={URL + c.image} alt={c.name} title={c.name} />
                          <p className="truncateName">{c.name}</p>
                        </div>
                        <div className="text-light text-09 truncateAuthor">
                          {/* {c.author} */}</div></Link>
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
}

const mapStateToProps = (state) => {
  return {
    categories: state.category,
    nextlink: state.category,
    userAuth: state.userAuth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBook: book => dispatch(bookActions.createBook(book)),
    fetchBookByCategoryID: cate_id => dispatch(bookActions.fetchBookByCategoryID(cate_id)),
    fetchMoreCategories: newLink => dispatch(bookActions.fetchMoreCategories(newLink)),
  };
};
HomePage.propTypes = {
  nextlink: PropTypes.object,
  fetchMoreCategories: PropTypes.func,
  categories: PropTypes.object,
  fetchBookByCategoryID: PropTypes.func,
  userAuth: PropTypes.string,
  location: PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
