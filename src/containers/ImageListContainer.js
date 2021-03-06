import React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import * as imageActions from '../actions/ImageActions';
import ImageList from '../components/ImageList';
import Loader from '../components/Loader';
import * as C from '../utils/consts';

class ImageListContainer extends React.Component {
  componentDidMount() {
    const tag = this.props.location.query.tag;
    if (tag) {
      this.props.fetchImagesByTag(this.props.location.query.tag);
    }
    else {
      this.props.fetchPopularImages();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.query.tag != this.props.location.query.tag) {
      this.props.fetchImagesByTag(this.props.location.query.tag);
    }
  }

  render() {
    if (this.props.images.isFetching) return <Loader />;
    return <ImageList tag={this.props.location.query.tag} images={this.props.images.data}
                      imageClick={this.props.imageClick}/>;
  }
}

function mapStateToProps(state) {
  return {images: state.images}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchImagesByTag: (tag) => {
      dispatch(imageActions.fetchImagesByTag(tag))
    },
    fetchPopularImages: () => {
      dispatch(imageActions.fetchPopularImages())
    },
    imageClick: (photoId) => {
      dispatch(routeActions.push({
        pathname: C.ROUTES.PHOTO_DETAILS,
        search: '?photoId=' + photoId
      }))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageListContainer)
