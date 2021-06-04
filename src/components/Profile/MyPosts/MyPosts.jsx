import classes from './MyPosts.module.css'
import Post from './Post/Post'
import React from 'react';
import { Field, reduxForm } from 'redux-form';



const MyPosts = (props) => {
  let postElement = props.postsData.map((post) => <Post message={post.message} like={post.like} id={post.id} />)

  let addPostMessage = (data) => {
    props.addPost(data.postValue)
  }

  return (
    <div className={classes.posts}>
      <h3>My posts</h3>
      <AddPostReduxForm onSubmit={addPostMessage}/>
      <div className={classes.posts}>
        {postElement}
      </div>
    </div>
  )
}

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <div>
      <Field name='postValue' component='textarea' placeholder='Add post' />
    </div>
    <button>Add</button>
  </form>
  )
}

const AddPostReduxForm = reduxForm( {
  form: 'addPost'
})(AddPostForm)

export default MyPosts;