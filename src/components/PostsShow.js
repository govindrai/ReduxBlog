import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPost, deletePost } from "../actions";
import { Link } from "react-router-dom";

class PostsShow extends Component {
  componentDidMount() {
    if (!this.props.post) {
      const { id } = this.props.match.params;
      this.props.fetchPost(this.props.match.params.id);
    }
  }

  onClickHandler() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push("/");
    });
  }

  render() {
    if (!this.props.post) {
      return <div>Fetching...</div>;
    }
    const { title, categories, content } = this.props.post;
    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          onClick={this.onClickHandler.bind(this)}
          className="btn btn-danger pull-xs-right"
        >
          Delete Post
        </button>
        <h3>
          {title}
        </h3>
        <h6>
          Categories: {categories}
        </h6>
        <p>
          {content}
        </p>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
