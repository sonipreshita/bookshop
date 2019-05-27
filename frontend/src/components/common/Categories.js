import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import * as bookActions from '../../actions/bookActions';

class Categories extends React.Component {
  constructor(props) {
    super(props);
  }


  fetchBooks(id) {
    this.props.fetchBookByCategoryID(id);
  }

  render() {
    return (
      <div className="main">
        <div className="content">
          <div className="category" >
            <Link to="/" className="navigationTitle">Categories</Link>
          </div>
          <div id="leftNavContainer">
            <ul id="navigation" className="navigation">
              {this.props.allcategory.map((c, i) => {
                return (
                  <Link key={i}
                    to={`/category/${c._id}`} onClick={this.fetchBooks.bind(this, c._id)} className="noDecoration">
                    <li key={i}>
                      <span id={`round${c._id}`} >{c.name}</span>
                    </li>
                  </Link>
                );
              })}
            </ul>
            <div className="clear" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allcategory: state.allcategory,
    //books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookByCategoryID: cate_id => dispatch(bookActions.fetchBookByCategoryID(cate_id)),
    fetchAllCategories: () => dispatch(bookActions.fetchAllCategories()),
  };
};

Categories.propTypes = {
  allcategory: PropTypes.array,
  fetchBookByCategoryID: PropTypes.func,
  fetchAllCategories: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
