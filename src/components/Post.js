import React, { Component } from 'react';
import * as PostAPI from '../utils/api'
import { connect } from 'react-redux';
import { populatePosts, populateComments, getPost, deletePost,upVotePost } from '../actions'
import Category from './Category'
import GiveMeComment from './GiveMeComment'
import { has } from 'lodash';
import { Link, withRouter } from 'react-router-dom'
import sortBy from 'sort-by'
import {load as loadPost} from '../actions'
import NewCommentPage from './NewCommentPage'
import { Container, Divider, Button, Segment, List ,Statistic, Icon} from 'semantic-ui-react'
import { colorSwitcher, showSecondsMinutesOrHours } from '../utils/helpers'




class Post extends Component {

  componentDidMount(){
    this.props.fetchPosts()
  }


  render() {
    const { post, comments } = this.props
    const { id } = this.props.match.params
    console.log("these are the props", this.props)
    return (
      <div className="App">
        <Container textAlign='left'>
          <br></br>
            <List divided relaxed>
              {post.map(post => (
                <div key={post.id}>
              <List.Item>
                <List.Content>
                  <Segment color={colorSwitcher(post.voteScore)}>
                  <List.Header>
                            <p className='postTitle'>{post.title}</p>
                    </List.Header>
                    {post.body}
                    <Divider horizontal/>
                  <List.Description>
                    submitted {showSecondsMinutesOrHours(Date.now(), post.timestamp)} ago by {post.author} has {comments.filter(com => com.parentId === this.props.match.params.id).length} comment(s).
                  </List.Description>
                  <List.Description>
                    <List horizontal>
                      <List.Item>
                          <Statistic horizontal size='mini' color={colorSwitcher(post.voteScore)} value={post.voteScore}  label='point(s) to awesomness'/>
                      </List.Item>
                      <List.Item>
                        <button onClick={() => this.props.votePost(post.id, "upVote")}>
                          <Icon name='thumbs outline up'/>
                          </button>
                        <button onClick={() => this.props.votePost(post.id, "downVote")}>
                          <Icon name='thumbs outline down'/>
                        </button>
                      </List.Item>
                    </List>
                  </List.Description>
                  <Container>
                    <Container textAlign='left'>
                      <Button as={Link}
                        to={`/${post.category}/create/comments/${post.id}`}>
                          Add Comment
                      </Button>
                    </Container>
                    <Container textAlign='right'>
                      <Button as={Link} to="/" size='medium'>
                        Home
                      </Button>
                      <Button size='mini' as={Link} to="/" onClick={() => {
                          this.props.deletePost(post.id)
                        }}>
                        Delete
                      </Button>
                      <Button size='mini' as={Link} to={`/posts/${post.id}`}>
                        Edit Me
                      </Button>
                    </Container>
                  </Container>
                  </Segment>
                </List.Content>
              </List.Item>
            </div>
                ))}
            </List>
          <GiveMeComment postId={this.props.match.params.id} category={this.props.match.params.category} comments={comments.sort(sortBy('-voteScore'))}/>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  comments : Object.keys(state.post.comments).map(comId => state.post.comments[comId]),
  post : Object.keys(state.post.posts).map(id => state.post.posts[id]).filter(post => post.id === props.match.params.id)
})

const mapDispatchToProps = dispatch => ({
  deletePost:(post) => dispatch(deletePost(post)),
  getComments: (id) => dispatch(populateComments(id)),
  fetchPosts: () => dispatch(populatePosts()),
  votePost:(id,vote) => dispatch(upVotePost(id,vote))
})




export default connect(mapStateToProps, mapDispatchToProps)(Post);
