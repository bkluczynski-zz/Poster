import React, { Component } from 'react';
import * as PostAPI from '../utils/api'
import { connect } from 'react-redux';
import { populatePosts, populateComments, getPostDetails, upVotePost, deletePost, sortComments, sortPosts  } from '../actions'
import Category from './Category'
import GiveMeComment from './GiveMeComment'
import Post from './Post'
import {Link, withRouter} from 'react-router-dom'
import { Container, Divider, Button, Segment, List ,Statistic, Icon} from 'semantic-ui-react'
import { colorSwitcher, showSecondsMinutesOrHours } from '../utils/helpers'

class PostList extends Component {

  render() {
    const { posts, comments } = this.props
    const { category } = this.props.match.params


    function isCategoryMounted(posts){
      return category === undefined ? posts : posts.filter(post => post.category === category)
    }
    return (
      <div>
        <Container textAlign='left'>
          <Category
              />
              <Segment>
            <ol>
            {posts && category === undefined && (
                <div>
                <Button size='tiny' onClick={(event) => {this.props.sortPosts(posts, "-timestamp")}}>Show most recent</Button>
                <Button size='tiny' onClick={(event) => {this.props.sortPosts(posts, "-voteScore")}}>Show most popular</Button>
                <Button as={Link} to={'/post/create'}>
                  Create new post
                </Button>
              </div>
          )}
          <Divider horizontal />
              {posts && isCategoryMounted(posts).map(post => (
                      <div key={post.id}>
                        <List divided relaxed>
                          <List.Item>
                            <List.Content>
                              <Segment color={colorSwitcher(post.voteScore)}>
                              <List.Header>
                                      <Link to={`/${post.category}/${post.id}`}>
                                        <p className='postTitle'>{post.title}</p>
                                      </Link>
                                </List.Header>
                              <List.Description>
                                submitted {showSecondsMinutesOrHours(Date.now(), post.timestamp)} ago by {post.author} has {comments.filter(com => com.parentId === post.id).length} comment(s).
                              </List.Description>
                              <List.Description>
                                <List horizontal>
                                  <List.Item>
                                      <Statistic horizontal size='mini' color={colorSwitcher(post.voteScore)} value={post.voteScore}  label='points to awesomness'/>
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
                              <Container textAlign='right'>
                                <Button size='mini' as={Link} to="/" onClick={() => {
                                    this.props.deletePost(post.id)
                                  }}>
                                  Delete
                                </Button>
                                <Button size='mini' as={Link} to={`/posts/${post.id}`}>
                                  Edit Me
                                </Button>
                              </Container>
                              </Segment>
                              <br></br>
                            </List.Content>
                          </List.Item>
                        </List>
                      </div>
                    ))}
          </ol>
        </Segment>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
posts : Object.keys(state.post.posts).map(postId => state.post.posts[postId]),
comments : Object.keys(state.post.comments).map(com => state.post.comments[com])

})

const mapDispatchToProps = dispatch => ({
  votePost : (id, post) => dispatch(upVotePost(id,post)),
  deletePost:(post) => dispatch(deletePost(post)),
  sortPosts:(posts, sorter) => dispatch(sortPosts(posts,sorter)),
})



export default connect(mapStateToProps, mapDispatchToProps)(PostList)
