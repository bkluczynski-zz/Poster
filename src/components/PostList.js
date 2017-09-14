import React, { Component } from 'react';
import * as PostAPI from '../utils/api'
import { connect } from 'react-redux';
import { populatePosts, populateComments, getPostDetails, upVotePost, deletePost, sortComments, sortPosts  } from '../actions'
import Category from './Category'
import GiveMeComment from './GiveMeComment'
import Post from './Post'
import {Link, withRouter} from 'react-router-dom'
import { Container, Divider, Button, Segment, List ,Statistic, Icon} from 'semantic-ui-react'


class PostList extends Component {

  render() {
    const { posts, comments } = this.props
    const { category } = this.props.match.params


    function isCategoryMounted(posts){
      return category === undefined ? posts : posts.filter(post => post.category === category)
    }

    function showSecondsMinutesOrHours(present,past){

      let difference = ((present - past)/1000)

        if (difference >= 60 && difference <= 3600){
          return `${Math.round(difference/60)} minute(s)`
        } else if (difference >= 3600 && difference <= 216000){
          return `${Math.round(difference/60/60)} hour(s)`
        } else if (difference >= 216000){
          return `${Math.round(difference/60/60/24)} day(s)`
        } else {
          return `${Math.round(difference)} second(s)`
        }

    }


    function colorSwitcher(value) {
  let answer = "";
  switch( value ) {
    case -1: case -2: case -3: case -4: case -5:
      answer = 'red'
      break;
    case 1: case 2: case 3: case 4: case 5:
      answer = "olive";
      break;
    case 5: case 6: case 7: case 8: case 9:
      answer = "teal";
      break;
    case 10: case 11: case 12: case 13: case 14: case 15:
      answer = "yellow";
      break;
      case 16: case 17: case 18: case 19: case 20: case 21:
        answer = "purple";
        break;
      case 22: case 23: case 24: case 25: case 26: case 27: case 28:
      answer = "pink"
    default:
      answer = "green";
  }
  return answer;
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
              </div>
          )}
          <Divider horizontal />
              {posts && isCategoryMounted(posts).map(post => (
                      <div key={post.id}>
                        <List divided relaxed>
                          <List.Item>
                            <List.Content>
                              <List.Header>
                                    <p className='postTitle'>{post.title}</p>
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
                            </List.Content>
                          </List.Item>
                        <Button size='mini' as={Link} to={`/${post.category}/${post.id}`}>
                          See details
                        </Button>
                        <Button size='mini' as={Link} to="/" onClick={() => {
                            this.props.deletePost(post.id)
                          }}>
                          Delete
                        </Button>
                        <Button size='mini' as={Link} to={`/posts/${post.id}`}>
                          Edit Me
                        </Button>
                        </List>
                      </div>
                    ))}
          </ol>
        </Segment>
          <Link to={'/post/create'}>
            Create new post
          </Link>
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
