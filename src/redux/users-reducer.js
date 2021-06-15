import { userAPI } from '../api/api'
import { updateObjectInArray } from '../utils/object-helpers';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  usersData: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
  fake: 10,
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userID, 'id', { followed: true })
      };
    case UNFOLLOW:
      return {
        ...state,
        usersData: updateObjectInArray(state.usersData, action.userID, 'id', { followed: false })
      };
    case SET_USERS: {
      return {
        ...state,
        usersData: [...action.users],
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      }
    }
    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      }
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching ? [...state.followingInProgress, action.userID] :
          state.followingInProgress.filter(id => id !== action.userID)
      }
    }
    default:
      return state;
  }
}

export const acceptFollow = (userID) => {
  return { type: FOLLOW, userID }
}

export const acceptUnfollow = (userID) => {
  return { type: UNFOLLOW, userID }
}

export const setUsers = (users) => {
  return { type: SET_USERS, users }
}

export const setCurrentPage = (currentPage) => {
  return { type: SET_CURRENT_PAGE, currentPage }
}

export const setTotalUsersCount = (totalUsersCount) => {
  return { type: SET_TOTAL_USERS_COUNT, totalUsersCount }
}

export const setIsFetching = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching }
}

export const setIsFollowingProgress = (isFetching, userID) => {
  return { type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userID }
}

export const requestUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true))
    let data = await userAPI.getUsersAPI(page, pageSize)

    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));

  }
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
  dispatch(setIsFollowingProgress(true, userID));
  let data = await apiMethod(userID)

  if (data.resultCode === 0) {
    dispatch(actionCreator(userID));
  }

  dispatch(setIsFollowingProgress(false, userID));
}

export const follow = (userID) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userID, userAPI.postFollow, acceptFollow);
  }
}

export const unfollow = (userID) => {
  return async (dispatch) => {
    followUnfollowFlow(dispatch, userID, userAPI.deleteFollow, acceptUnfollow);
  }
}

export default usersReducer;
