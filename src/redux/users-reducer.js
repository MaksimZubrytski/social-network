import { userAPI} from '../api/api'

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
                usersData: state.usersData.map(user => {
                    if (user.id === action.userID) {
                        return { ...user, followed: true }
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                usersData: state.usersData.map(user => {
                    if (user.id === action.userID) {
                        return { ...user, followed: false }
                    }
                    return user;
                })
            }
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
    return (dispatch) => {
        dispatch(setIsFetching(true))
        userAPI.getUsersAPI(page, pageSize)
            .then(data => {
                dispatch(setIsFetching(false));
                dispatch(setUsers(data.items));
                dispatch(setTotalUsersCount(data.totalCount));
            })
    }
}

export const follow = (userID) => {
    return (dispatch) => {
        dispatch(setIsFollowingProgress(true, userID));
        userAPI.postFollow(userID).then(data => {
          if(data.resultCode === 0) {
            dispatch(acceptFollow(userID));
          }
          dispatch(setIsFollowingProgress(false, userID));
        })
    }
}

export const unfollow = (userID) => {
    return (dispatch) => {
        dispatch(setIsFollowingProgress(true, userID));
        userAPI.deleteFollow(userID).then(data => {
          if(data.resultCode === 0) {
            dispatch(acceptUnfollow(userID));
          }
          dispatch(setIsFollowingProgress(false, userID));
        })
    }
}

export default usersReducer;
