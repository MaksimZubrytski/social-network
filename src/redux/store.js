import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
  _state: {
    profilePage: {
      postsData: [
        { id: 1, message: "it's my first post", like: 15 },
        { id: 2, message: "Hello how are you?", like: 18 },
      ],
      newPostText: ""
    },
    dialogsPage: {
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
      newMessageBody: "it-kamasur",
    },
    sideBar: {
      friends: [
        { id: 1, name: "Dimon" },
        { id: 2, name: "Jenya" }
      ]
    }
  },
  _callSubscriber() {
    console.log("State changed")
  },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._callSubscriber(this._state)
  }
}


export default store;