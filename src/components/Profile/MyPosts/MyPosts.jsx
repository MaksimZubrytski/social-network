import classes from './MyPosts.module.css'
import Post from './Post/Post'
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControl/FormsControl';

const maxLength50 = maxLengthCreator(50);

const MyPosts = (props) => {
  let postElement = props.postsData.map((post) => <Post message={post.message} like={post.like} id={post.id} key={post.id} />)

  let addPostMessage = (data) => {
    props.addPost(data.postValue)
  }

  return (
    <div className={classes.posts}>
      <h3>My posts</h3>
      <AddPostReduxForm onSubmit={addPostMessage} />
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
        <Field
          name='postValue'
          component={Textarea}
          placeholder='Add post'
          validate={[required, maxLength50]}
        />
      </div>
      <button>Add</button>
    </form>
  )
}

const AddPostReduxForm = reduxForm({
  form: 'addPost'
})(AddPostForm)

export default MyPosts;