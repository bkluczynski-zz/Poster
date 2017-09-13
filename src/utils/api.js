import axios from 'axios'
import uniqueId from 'lodash.uniqueid'
import uuidv4 from 'uuid'

const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const addPost = (post) => {
  const timestamp = Date.now()
  const id = uuidv4();
   post = {...post, id, timestamp}
  return axios.post(`${api}/posts`, post , {headers}).then(res => res.data)
}

export const getAllComments = (postId) =>
  axios.get(`${api}/posts/${postId}/comments`, { headers })
  .then(res => res.data)

export const getAll = () =>
  axios.get(`${api}/posts`, { headers })
  .then(res => res.data)

export const getPostDetails = (id) =>
    axios.get(`${api}/posts/${id}`, { headers })
    .then(res => res.data)

export const deletePost = (id) =>
    axios.delete(`${api}/posts/${id}`, { headers })
    .then(res => res.data)

export const deleteComment = (id) =>
    axios.delete(`${api}/comments/${id}`, {headers})
    .then(res => res.data)

export const editPost = (id, post) =>
  axios.put(`${api}/posts/${id}`, post, {headers})
  .then(res => res.data)

export const editComment = (id, comment) =>
  axios.put(`${api}/comments/${id}`, comment, { headers })
  .then(res => res.data)

export const addComment = (comment) => {
  const timestamp = Date.now()
  const id = uuidv4();
   comment = {...comment, id, timestamp}
   console.log("comment", comment)
  return axios.post(`${api}/comments`, comment, { headers }).then(res => res.data)
}

export const voteForThePost = (id, vote) => {
  console.log("post", vote)
  return axios.post(`${api}/posts/${id}`, { option : vote}, { headers }).then(res => res.data)
}

export const voteForTheComment = (id, vote) => {
  console.log("comment", vote)
  return axios.post(`${api}/comments/${id}`, { option : vote}, {headers}).then(res =>
  res.data)
}
export const getAllCat = () =>
axios.get(`${api}/categories`, { headers })
    .then(res => res.data)
