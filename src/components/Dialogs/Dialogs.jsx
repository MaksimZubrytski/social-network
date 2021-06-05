import classes from './Dialogs.module.css';
import React from 'react';
import Message from './Message/Message';
import DialogItem from './DialogItem/DialogItem'
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormsControl/FormsControl';
import { maxLengthCreator, required } from '../../utils/validators/validators';

const maxLength30 = maxLengthCreator(30);

const Dialogs = (props) => {

  let addNewMessage = (data) => {
    props.onSendMessageClick(data.newMessageBody)
  }

  let state = props.dialogsPage;


  let dialogsElements = state.dialogsData
    .map((dialog) => <DialogItem id={dialog.id} key={dialog.id} name={dialog.name} />)

  let messagesElements = state.messagesData
    .map((message) => <Message message={message.message} id={message.id} key={message.id} />)

  if (props.isAuth === false) {
    return <Redirect to={'/login'} />
  }

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogs__list}>
        {dialogsElements}
      </div>
      <div className="messages">
        <div>{messagesElements}</div>
        <AddMessageReduxForm onSubmit={addNewMessage}/>
      </div>
    </div>
  )
}


const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field placeholder="enter your message..." 
      name="newMessageBody" 
      component={Textarea}
      validate={[required, maxLength30]}
       />
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}


const AddMessageReduxForm = reduxForm( {
  form: 'addNewMessage'
})(AddMessageForm)


export default Dialogs;