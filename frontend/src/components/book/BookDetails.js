import React from 'react';
import { Link, withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import NavContent from '../NavContent';
import cookie from 'react-cookies';
import ReactStars from 'react-stars';

class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.ratingChanged = this.ratingChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      userStatus: '',
      title: 'Excellent',
      rateStar: 5,
      value: ''
    };
  }
  componentWillMount() {
    let token = sessionStorage.getItem('user');
    if (token) {
      this.setState({ userStatus: true });
    } else {
      this.setState({ userStatus: false });
    }
  }

  componentWillReceiveProps() {
    let token = sessionStorage.getItem('user');
    if (token) {
      this.setState({ userStatus: true });
    } else {
      this.setState({ userStatus: false });
    }
  }
  
  addToCart(book) {
    const item = {
      book_id: book._id,
      title: book.title,
      price: book.price,
      image: book.image,
      offer: book.offer,
      category: book.cate_id.name,
      quantity: 1
    };
    this.props.dispatch(bookActions.addToCart(item));
  }

  addToCartForLoggedUser(book) {
    let token = sessionStorage.getItem('user');
    let userName = JSON.parse(token);
    const item = {
      book_id: book._id,
      title: book.title,
      price: book.price,
      image: book.image,
      offer: book.offer,
      user: userName.record.email,
      category: book.cate_id.name,
      quantity: 1
    };
    this.props.dispatch(bookActions.addToCartForLoggedUser(item));
  }

  addToWishlist(book) {
    let token = sessionStorage.getItem('user');
    let userName = JSON.parse(token);
    const item = {
      book_id: book._id,
      user: userName.record._id,
    };
    this.props.dispatch(bookActions.addToWishlist(item));
  }

  ratingChanged(newRating) {
    let user = sessionStorage.getItem('user');
    let userName = JSON.parse(user);
    let user_id = (userName && userName.record._id ? userName.record._id : null);
    let rateData = {
      user_id: user_id,
      book_id: this.props.book._id,
      rate: newRating,
    };
    this.setState({ rateStar: newRating });
    this.props.dispatch(bookActions.giveRatings(rateData));
    if (newRating === 5) { this.setState({ title: 'Excellent' }); }
    if (newRating === 4) { this.setState({ title: 'Very Good' }); }
    if (newRating === 3) { this.setState({ title: 'Good' }); }
    if (newRating === 2) { this.setState({ title: 'Okay' }); }
    if (newRating === 1) { this.setState({ title: 'Not recommended ' }); }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    let cartObjItem = cookie.load('order');
    let count, review = [], ratings = [], oneRating = [], twoRating = [], threeRating = [], fourRating = [], fiveRating = [], total = 0;
    let user = sessionStorage.getItem('user');
    let userName = JSON.parse(user);
    let user_id = (userName && userName.record._id ? userName.record._id : null);
    if (cartObjItem && cartObjItem.items.length > 0) { count = cartObjItem.items.length; }
    let URL = `${process.env.REACT_APP_API_ENDPOINT}images/`;

    for (let i of this.props.allRating) {
      ratings.push(i);
      let divide = ratings.length;
      total = (total + i.rate) / divide;
      if (i.comment != undefined) { review.push(i); }
      if (i.rate === 5) { fiveRating.push(i); }
      if (i.rate === 4) { fourRating.push(i); }
      if (i.rate === 3) { threeRating.push(i); }
      if (i.rate === 2) { twoRating.push(i); }
      if (i.rate === 1) { oneRating.push(i); }
    }
    return (
      <div className="content1">
        <NavContent cartNumber={count} />
        <div className="row">
          <div className="col-sm-4 ">
            <center>
              <img className="bookMainImage" src={this.props.book && this.props.book.image ? URL + this.props.book.image : ''} alt="Placehold" />
            </center>
          </div>
          <div className="row col-md-8 col-smx-8 bookAggregateInfoBox">
            <div className="col-md-12">
              <h1 className="bookMainTitle">Title -
                {this.props.book && this.props.book.title ? this.props.book.title : null}</h1>
              <div>Author : {this.props.book && this.props.book.author ? this.props.book.author : null}</div>
              <div>Publisher : {this.props.book && this.props.book.publisher ? this.props.book.publisher : null}</div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <h2 className="bookPageHeading">Book Price</h2>
                <span><i className="fa fa-inr" /> {this.props.book && this.props.book.price ? this.props.book.price : null}</span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card">
                <h2 className="bookPageHeading">Book Information</h2>
                <div>ISBN-13 : {this.props.book && this.props.book.isbn_13 ? this.props.book.isbn_13 : null}</div>
                <div>ISBN-10 : {this.props.book && this.props.book.isbn_10 ? this.props.book.isbn_10 : null}</div>
                <div>Pages : {this.props.book && this.props.book.pages ? this.props.book.pages : null}</div>
              </div>
            </div>
            <div className="col-md-12" style={{ 'display': 'inline-block' }}>
            {/* <p onClick={this.addToCartForLoggedUser.bind(this, this.props.book)}>hello</p> */}
              <div className="col-md-1"><div style={{ 'display': (this.state.userStatus === true ? 'none' : 'block') }}> <Link className="carticon" onClick={this.addToCart.bind(this, this.props.book)} to={`/cart`}><i className="fa fa-shopping-cart" title="Add to Cart" aria-hidden="true" /></Link></div>
                <div style={{ 'display': (this.state.userStatus === false ? 'none' : 'block') }}> <Link className="carticon" onClick={this.addToCartForLoggedUser.bind(this, this.props.book)} to={`/cart`}><i className="fa fa-shopping-cart" title="Add to Cart" aria-hidden="true" /></Link></div>
              </div>
              <div style={{ 'display': (this.state.userStatus === false ? 'none' : 'block'), 'top': '4px' }} className="col-md-1 heart"><a className="favouriteicon" onClick={this.addToWishlist.bind(this, this.props.book)} ><i title="Add to wishlist" className="fa fa-heart" aria-hidden="true" /></a></div>
              <div id="added" style={{ 'marginTop': '9px' }} />
              <div id="added1" style={{ 'marginTop': '9px' }} />
            </div>
            <div className="col-md-12">
              <div className="card">
                <h2 className="bookPageHeading">Rating & Review</h2>
                <button className="userrate _2XOAEz" style={{ 'display': (this.state.userStatus === true ? 'block' : 'none') }} data-toggle="modal" data-target="#myModal">Rate this book</button>
                <div className="modal fade" id="myModal" role="dialog">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" >&times;</button>
                        <h4 className="modal-title">Your Rate
                        </h4>
                      </div>
                      <div className="modal-body star">
                        <div className="ratingstar">
                          <ReactStars
                            count={5}
                            value={this.state.rateStar}
                            onChange={this.ratingChanged}
                            size={50}
                            color2={'#ffd700'}
                            half={false} />
                        </div>
                        <div id="ratemessage" />
                      </div>
                      <div className="modal-header review">
                        <h4 className="modal-title">Your Review
                        </h4>
                      </div>
                      <form onSubmit={e => {
                        e.preventDefault();
                        let input = {
                          title: this.state.title,
                          book_id: this.props.book._id,
                          user_id: user_id,
                          comment: this.state.value,
                          rate: this.state.rateStar
                        };
                        this.props.dispatch(bookActions.giveRatings(input));
                        $('#myModal').modal('hide');
                        e.target.reset();
                      }}>
                        <div className="modal-body comment">
                          <input className="title" placeholder="Title" value={this.state.title} readOnly required />
                          <textarea className="description" placeholder="Description " onChange={this.handleChange} required />
                        </div>
                        <div className="modal-footer">
                          <button id="submit" type="submit" className="btn btn-default" >Submit</button>
                          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="row _1Ahy2t">
                  <div className="_2eB0mV">
                    <div className="row">
                      <div className="col-md-3">
                        <div><span className="totalrate">{parseFloat(total).toFixed(1)}★</span></div>
                        <div>{this.props.allRating.length} Rating & {review.length} Reviews</div>
                      </div>
                      <div className="col-md-9">
                        <div className="_1n1j36 DrZOea">
                          <ul>
                            <li className="_58ZIbs _1V6lUx">
                              <div className="col _1atKHO col-1-12">5★</div>
                              <div className="col col-9-12">
                                <div className="_1WmLa3 ">
                                  <span className="_1Yym6V five" style={{ "width": (fiveRating.length) + '%' }} />
                                </div>
                              </div>
                              <div className="col col-2-12">
                                <div className="ratingCount">{fiveRating.length}</div>
                              </div>
                            </li>
                            <li className="_58ZIbs _1V6lUx">
                              <div className="col _1atKHO col-1-12">4★</div>
                              <div className="col col-9-12">
                                <div className="_1WmLa3 ">
                                  <span className="_1Yym6V five" style={{ "width": (fourRating.length) + '%' }} />
                                </div>
                              </div>
                              <div className="col col-2-12">
                                <div className="ratingCount">{fourRating.length}</div>
                              </div>
                            </li>
                            <li className="_58ZIbs _1V6lUx">
                              <div className="col _1atKHO col-1-12">3★</div>
                              <div className="col col-9-12">
                                <div className="_1WmLa3 ">
                                  <span className="_1Yym6V five" style={{ "width": (threeRating.length) + '%' }} />
                                </div>
                              </div>
                              <div className="col col-2-12">
                                <div className="ratingCount">{threeRating.length}</div>
                              </div>
                            </li>
                            <li className="_58ZIbs _1V6lUx">
                              <div className="col _1atKHO col-1-12">2★</div>
                              <div className="col col-9-12">
                                <div className="_1WmLa3 ">
                                  <span className="_1Yym6V two" style={{ "width": (twoRating.length) + '%' }} />
                                </div>
                              </div>
                              <div className="col col-2-12">
                                <div className="ratingCount">{twoRating.length}</div>
                              </div>
                            </li>
                            <li className="_58ZIbs _1V6lUx">
                              <div className="col _1atKHO col-1-12">1★</div>
                              <div className="col col-9-12">
                                <div className="_1WmLa3 ">
                                  <span className="_1Yym6V one" style={{ "width": (oneRating.length) + '%' }} />
                                </div>
                              </div>
                              <div className="col col-2-12">
                                <div className="ratingCount">{oneRating.length}</div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row _2aFisS">
                  {this.props.allRating.map((item, index) => {
                    if (this.props.allRating.length > 0) {
                      if (item.comment != undefined)
                        return (
                          <div className="showReview" key={index}>
                            <div className="col">
                              <div className="col _390CkK">
                                <div className="row">
                                  <div className="hGSR34 _2beYZw E_uFuv">{item.rate}★</div>
                                  <p className="_2xg6Ul">{item.title}</p>
                                </div>
                                <div className="row">
                                  <div className="qwjRop">{item.comment}</div>
                                </div>
                                <div className="row">
                                  <p className="_3LYOAd">By {item.user_id.name}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                    } else {
                      return (
                        <div>no review yet</div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 bookDetailInfoBox">
            <div className="card" id="bookDescription">
              <h2 className="bookPageHeading">Book Description</h2>
              <span className="readable_box_small" itemProp="description">{this.props.book && this.props.book.desc ? this.props.book.desc : null}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(bookActions.addToCart(item)),
    addToCartForLoggedUser: (item) => dispatch(bookActions.addToCartForLoggedUser(item)),
    addToWishlist: (item) => dispatch(bookActions.addToWishlist(item)),
    giveRatings: (rateData) => dispatch(bookActions.giveRatings(rateData)),
  };
};
BookDetails.propTypes = {
  book: PropTypes.object,
  addToCart: PropTypes.func,
  addToCartForLoggedUser: PropTypes.func,
  dispatch: PropTypes.func,
  allRating: PropTypes.array
};
export default withRouter(connect(mapDispatchToProps)(BookDetails));
