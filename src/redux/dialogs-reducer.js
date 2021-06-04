const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
  dialogsData: [
    { id: 1, name: "Dimon" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Valera" },
    { id: 4, name: "Vika" }
  ],
  messagesData: [
    { id: 1, message: "Hello" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "Yo" }
  ],
}

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_MESSAGE:
      let newMessage = action.newMessage
      return {
        ...state,
        messagesData: [...state.messagesData, {id: 6, message: newMessage}],
      };

    default:
      return state;
  }
}

export const addMessageActionCreator = (newMessage) => {
  return { type: ADD_MESSAGE, newMessage }
}

export const updateNewMessageBodyActionCreator = (text) => {
  return { type: UPDATE_NEW_MESSAGE_BODY, body: text }
}


export default dialogsReducer;