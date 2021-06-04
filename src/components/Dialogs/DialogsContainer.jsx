import { connect } from 'react-redux';
import { compose } from 'redux';
import { WithAuthRedirect } from '../../hoc/withAuthRedirect';
import { addMessageActionCreator } from '../../redux/dialogs-reducer'
import Dialogs from './Dialogs';


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    onSendMessageClick: (newMessage) => {
      dispatch(addMessageActionCreator(newMessage))
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithAuthRedirect,
)(Dialogs)
