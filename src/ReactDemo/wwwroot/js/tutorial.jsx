﻿var CommentList = React.createClass({
    render: function () {
        var commentNodes = this.props.data.map(function(comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                {comment.text}
            </Comment>
            );
        });
        return (
          <div className="commentList">
              {commentNodes}
          </div>
      );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
          <div className="commentForm">
            Hello, world! I am a CommentForm.
          </div>
      );
    }
});

var Comment = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function () {
        var md = new Remarkable();
        return (
          <div className="comment">
            <h2 className="commentAuthor">
              {this.props.author}
            </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      );
    }
});
var CommentBox = React.createClass({
    getInitialState: function () {
        return { data: [] };
    },
    loadCommentsFromServer: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = function () {
            var data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        }.bind(this);
        xhr.send();
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        window.setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
          <div className="commentBox">
            <h1>Comments</h1>
            <CommentList data={this.state.data} />
            <CommentForm />
          </div>
      );
    }
});
ReactDOM.render(
    <CommentBox url="/comments" />,
    document.getElementById('content')
);