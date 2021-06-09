import { profileAPI } from '../api/api';

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    postsData: [
        { id: 1, message: "it's my first post", like: 15 },
        { id: 2, message: "Hello how are you?", like: 18 },
    ],
    profile: null,
    status: "",
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData, { id: 3, message: action.newPostText, like: 0 }],
            };
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter((post) => post.id !== action.id),
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => {
    return { type: ADD_POST, newPostText }
}

export const deletePost = (id) => {
    return { type: DELETE_POST, id }
}

export const setUserProfile = (profile) => {
    return { type: SET_USER_PROFILE, profile }
}

export const setStatus = (status) => {
    return { type: SET_STATUS, status }
}

export const getStatus = (userID) => {
    return (dispatch) => {
        profileAPI.getUserStatus(userID)
            .then(data => {
                dispatch(setStatus(data))
            })
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateUserStatus(status)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}

export const getProfile = (userID) => {
    return (dispatch) => {
        profileAPI.getProfile(userID)
            .then(data => {
                dispatch(setUserProfile(data))
            })
    }
}

export default profileReducer;