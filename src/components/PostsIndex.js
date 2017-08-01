import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchPosts } from "../actions";
import { Link } from "react-router-dom";

class PostsIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    let posts = [];
    Object.keys(this.props.posts).forEach(key => {
      posts.push(
        <li className="list-group-item" key={key}>
          <Link to={`/posts/${key}`}>
            {this.props.posts[key].title}
          </Link>
        </li>
      );
    });
    return posts;
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/posts/new" className="btn btn-primary">
            Create Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return { posts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPosts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
