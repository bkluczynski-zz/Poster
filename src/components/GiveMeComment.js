import React, {Component} from 'react';
import * as PostAPI from '../utils/api'
import {connect} from 'react-redux';
import {populatePosts, populateComments, sortComments, deleteComment, voteComment} from '../actions'
import {Link, withRouter} from 'react-router-dom'
import sortBy from 'sort-by'
import {
    Container,
    Divider,
    Button,
    Segment,
    List,
    Statistic,
    Icon,
    Comment,
    Header
} from 'semantic-ui-react'
import {colorSwitcher, showSecondsMinutesOrHours} from '../utils/helpers'

class GiveMeComment extends Component {

    render()
    {
        const {comments} = this.props
        console.log("comments", this.props)
        return (
            <div className="App">
                {comments.length >= 1 && (
                    <Comment.Group>
                        <Header as='h3' dividing>Comments</Header>
                        <div>
                            <Button size='tiny' onClick={(event) => {
                                this.props.sortComments(comments, "-timestamp")
                            }}>Show most recent</Button>
                            <Button size='tiny' onClick={(event) => {
                                this.props.sortComments(comments, "-voteScore")
                            }}>Show most popular</Button>
                        </div>
                        {this.props.comments.filter(comment => comment.parentId === this.props.postId).map(comment => (
                            <Segment key={comment.id} color={colorSwitcher(comment.voteScore)}>
                                <Comment key={comment.id}>
                                    <Comment.Content>
                                        <Comment.Author>{comment.author}</Comment.Author>
                                        <Comment.Metadata>
                                            <div>{showSecondsMinutesOrHours(Date.now(), comment.timestamp)}
                                                ago</div>
                                        </Comment.Metadata>
                                        <Comment.Text>
                                            {comment.body}
                                            <Divider horizontal/>
                                            <div><Statistic horizontal size='mini' color={colorSwitcher(comment.voteScore)} value={comment.voteScore} label='point(s) to commenting greatness'/></div>
                                            <div>
                                                <button onClick={() => this.props.voteComment(comment.id, "upVote")}>
                                                    <Icon name='thumbs outline up'/>
                                                </button>
                                                <button onClick={() => this.props.voteComment(comment.id, "downVote")}>
                                                    <Icon name='thumbs outline down'/>
                                                </button>
                                            </div>
                                        </Comment.Text>
                                    </Comment.Content>
                                    <Container textAlign='right'>
                                        <Button size='mini' as={Link} to={`${this.props.postId}`} onClick={() => this.props.deleteComment(comment.id)}>
                                            Delete
                                        </Button>
                                        <Button size='mini' as={Link} to={`/${this.props.category}/edit/comments/${comment.id}`}>
                                            Edit
                                        </Button>
                                    </Container>
                                </Comment>
                            </Segment>
                        ))}
                    </Comment.Group>
                )}
            </div>

        )
    }
}

const mapStateToProps = (state, props) => ({
    comments: Object.keys(state.post.comments).map(id => state.post.comments[id])
})

const mapDispatchToProps = (dispatch) => ({
    sortComments: (comments, sorter) => dispatch(sortComments(comments, sorter)),
    deleteComment: (id) => dispatch(deleteComment(id)),
    voteComment: (id, vote) => dispatch(voteComment(id, vote))

})

export default connect(mapStateToProps, mapDispatchToProps)(GiveMeComment);
