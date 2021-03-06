/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import TextArea from '../common/textArea';
import SubmitButton from '../common/SubmitButton';

class CommentForm extends Component {
  state = {
    comment: '',
  };

  componentDidMount() {
    const { currentValue } = this.props;
    if (currentValue) {
      this.setState({ comment: currentValue });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { comment } = this.state;
    const { saveComment } = this.props;
    const { slug } = this.props;
    if (comment.length) {
      saveComment(comment, slug);
    }
    this.setState({ comment: '' });
  };

  render() {
    const { comment } = this.state;
    const { buttonLabel } = this.props;

    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <TextArea
            handleChange={this.handleChange}
            placeholder="Add your comment"
            name="comment"
            value={comment}
          />
          <SubmitButton type="submit" name="comment" value={buttonLabel} />
        </form>
      </div>
    );
  }
}
export default CommentForm;
