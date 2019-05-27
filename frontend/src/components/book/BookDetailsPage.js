import React from 'react';
import { connect } from 'react-redux';
import BookDetails from './BookDetails';
import * as bookActions from '../../actions/bookActions';
import PropTypes from 'prop-types';
import Footer from '../common/Footer';
import _ from 'lodash';

class BookDetailsPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        this.props.fetchBookById(this.props.params.id);
        this.props.showRatings(this.props.params.id);
    }

    componentDidMount() {
        this.props.fetchBookById(this.props.params.id);
        this.props.showRatings(this.props.params.id);
    }

    render() {
        let title;
        _.each(this.props.book, function (d) {
            title = d.title;
        });
        if (title != undefined) {
            document.title = title + ' | ' + `${process.env.REACT_APP_TITLE}`;
        } else {
            document.title = 'Book' + ' | ' + `${process.env.REACT_APP_TITLE}`;
        }
        return (
            <div className="details">
                <BookDetails book={this.props.book[0]} allRating={this.props.allRating} />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        book: state.book,
        allRating: state.allRating,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBookById: bookId => dispatch(bookActions.fetchBookById(bookId)),
        showRatings: (id) => dispatch(bookActions.showRatings(id)),
    };
};

BookDetailsPage.propTypes = {
    fetchBookById: PropTypes.func.isRequired,
    showRatings: PropTypes.func.isRequired,
    params: PropTypes.object,
    book: PropTypes.array,
    allRating: PropTypes.array
};
export default connect(mapStateToProps, mapDispatchToProps)(BookDetailsPage);
