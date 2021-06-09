import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage, requestUsers } from "../../redux/users-reducer";
import React from 'react';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../redux/users-selectors";

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (page) => {
    this.props.requestUsers(page, this.props.pageSize)
    this.props.setCurrentPage(page)
  }

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress} />
      </>
    )
  }
}


let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
}

export default connect(mapStateToProps, {
  follow, unfollow,
  setCurrentPage, requestUsers
})(UsersContainer);
