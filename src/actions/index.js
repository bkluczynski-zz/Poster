import * as PostAPI from '../utils/api'
import sortBy from 'sort-by'
export const POPULATE_POSTS = 'POPULATE_POSTS';
export const POPULATE_CATEGORIES = 'POPULATE_CATEGORIES';
export const POPULATE_COMMENTS = 'POPULATE_COMMENTS';
export const POPULATE_DETAILS = 'POPULATE_DETAILS';
export const SORT_COMMENTS_BY = 'SORT_COMMENTS_BY';
export const SORT_POSTS_BY = 'SORT_POSTS_BY'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const LOAD = 'LOAD'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const RELOAD_COMMENT = 'RELOAD_COMMENT'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const VOTE_POST = 'VOTE_POST'
export const VOTE_COMMENT = 'VOTE_COMMENT'

function sentPostsCorrectly(posts){
  return {
  type : POPULATE_POSTS,
  posts
}
}

export function addPost(post){
  return dispatch => {
    PostAPI.addPost(post).then(post => {
      dispatch({
        type : ADD_POST,
        post
      })
    })
  }
}

export function addComment(comment){
  return dispatch => {
    PostAPI.addComment(comment).then(comment => {
      dispatch({
        type: ADD_COMMENT,
        comment
      })
    })
  }
}

export function deletePost(id){
  return dispatch => {
      PostAPI.deletePost(id).then(
        dispatch({
          type: DELETE_POST,
          id
        }),
        dispatch(populatePosts())
    )
    }
  }


export function populateComments(id){
  return dispatch => {
    PostAPI.getAllComments(id).then(comments => {
      dispatch({
        type : POPULATE_COMMENTS,
        comments
      })
    })
  }
}

export function receivedAllComments(comments){
  return {
    type: RECEIVE_COMMENTS,
    comments
  }
}

export function sortComments(comments, sorter){
  return {
    type: SORT_COMMENTS_BY,
    comments : comments.sort(sortBy(sorter))
  }
}

export function sortPosts(posts, sorter){
  return {
    type: SORT_POSTS_BY,
    posts : posts.sort(sortBy(sorter))
  }
}

  export function populatePosts(){
    return dispatch => {
      PostAPI.getAll().then(result => {
        dispatch(sentPostsCorrectly(result))
         Promise.all(result.map(post =>
           PostAPI.getAllComments(post.id))).then(res => dispatch(receivedAllComments(res)))
        })
      }
    }

  export function editPost(id, post){
    return dispatch => {
      PostAPI.editPost(id, post).then(post => {
        dispatch({
          type: EDIT_POST,
          post
        })
      })
    }
  }

  export function editComment(id, comment){
    return dispatch => {
      PostAPI.editComment(id, comment).then(comment => {
        dispatch({
          type: EDIT_COMMENT,
          comment
        })
      })
    }
  }

  export function deleteComment(id){
    return dispatch => {
      PostAPI.deleteComment(id).then(comment => {
        dispatch({
          type: DELETE_COMMENT,
          comment
        }),
        dispatch({
          type: RELOAD_COMMENT,
          comment
        })
      })
    }
  }

  export function upVotePost(id,post){
    return dispatch => {
      PostAPI.voteForThePost(id,post).then(post => {
        dispatch({
          type: VOTE_POST,
          post
        })
      })
    }
  }

  export function voteComment(id, vote){
    return dispatch => {
      PostAPI.voteForTheComment(id, vote).then(comment => {
        dispatch({
          type: VOTE_COMMENT,
          comment
        })
      })
    }
  }

export function populateCategories(){
  return dispatch => {
    PostAPI.getAllCat().then(categories => {
      dispatch({
        type: POPULATE_CATEGORIES,
        categories
      })
    })
  }
}
