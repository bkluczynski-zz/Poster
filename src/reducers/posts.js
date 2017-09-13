import { combineReducers } from 'redux'
import merge from "lodash/merge";
import sortBy from 'sort-by'
import { reducer as formReducer } from 'redux-form'

import {
  POPULATE_POSTS,
  POPULATE_CATEGORIES,
  POPULATE_COMMENTS,
  POPULATE_DETAILS,
  SORT_COMMENTS_BY,
  SORT_POSTS_BY,
  ADD_POST,
  DELETE_POST,
  MERGE_POSTS,
  EDIT_POST,
  LOAD,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  RELOAD_COMMENT,
  RECEIVE_COMMENTS,
  VOTE_POST,
  VOTE_COMMENT
} from '../actions'

const initialState = {
  posts : [],
  comments : [],
  categories : [],
  post : []
}

function posts(state = initialState, action){
    switch (action.type){
      case POPULATE_POSTS :
      return {
        ...state,
        posts : action.posts.filter((post => post.deleted === false)).reduce((acc, current) => {
          acc[current.id] = current;
          return acc;
        }, {})
    }
      case POPULATE_CATEGORIES : return {
        ...state,
        categories : action.categories.categories
    }

     case POPULATE_COMMENTS :
     console.log("comments are", action)
     return {
       ...state,
       comments : action.comments.reduce((acc, current) => {
         acc[current.id] = current;
         return acc;
       }, {})
     }

     case SORT_COMMENTS_BY :
     console.log("sorted comments are", action)
     return {
       ...state,
       comments : action.comments.reduce((acc, current) => {
         acc[current.id] = current;
         return acc;
       }, {})
     }

     case SORT_POSTS_BY :
     console.log("sorted posts are", action)
     return {
       ...state,
          posts : action.posts.reduce((acc, current) => {
            acc[current.id] = current;
            return acc;
          }, {})
     }

     case ADD_POST :
     console.log("new post is", action)
     return {
       ...state,
       posts : {
         ...state.posts,
           [action.post.id] : action.post
       }
     }

     case ADD_COMMENT :
     console.log("new comment has been added", action)
     return {
       ...state,
       comments : {
         ...state.comments,
          [action.comment.id] : action.comment
       }
     }

     case RECEIVE_COMMENTS :
     return {
       ...state,
       comments: [].concat.apply([], action.comments).reduce((acc, current) => {
         acc[current.id] = current;
         return acc;
       }, {})
     }

     case DELETE_POST :
     console.log("the deleted post is", action)
     console.log("posts are", posts)
     return {
       ...state,
       posts: Object.keys(state.posts).map(id => state.posts[id]).map(item => {
         if (item.id !== action.id){
           return item
         }
         return {
         ...item,
         deleted : true
       }
     })}

     case EDIT_POST :
     return {
       ...state,
       posts : {
         ...state.posts,
         [action.post.id] : action.post
       }
     }

     case EDIT_COMMENT :
     return {
       ...state,
       comments : {
         ...state.comments,
         [action.comment.id] : action.comment
       }
     }

     case DELETE_COMMENT :
     return {
       ...state,
       comments : {
         ...state.comments,
         [action.comment.id] : {
           ...state.comments[action.comment.id],
           delete : action.comment.delete
         }
       }
     }

     case RELOAD_COMMENT :
     return {
       ...state,
       comments : Object.keys(state.comments).map(id => state.comments[id]).filter(comment => comment.id !== action.comment.id)
     }

     case VOTE_POST :
     return {
       ...state,
       posts : {
         ...state.posts,
         [action.post.id] : {
           ...state.posts[action.post.id],
           voteScore : action.post.voteScore
         }
       }
     }

     case VOTE_COMMENT :
     return {
       ...state,
       comments : {
         ...state.comments,
         [action.comment.id] : {
           ...state.comments[action.comment.id],
           voteScore : action.comment.voteScore
         }
       }
     }


      default : return state

    }

}

export default posts;
