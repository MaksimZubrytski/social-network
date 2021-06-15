import React from 'react';
import Pagination from '../common/Pagination/Pagination';
import User from './User/User';

const Users = ({ totalUsersCount, pageSize, currentPage, onPageChanged, users, ...props }) => {

  return (
    <div>
      <Pagination
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
      />
      {
        users.map(user => (
          <User
            user={user}
            followingInProgress={props.followingInProgress}
            key={user.id}
            unfollow={props.unfollow}
            follow={props.follow}
          />
        ))
      }
    </div>
  )
}


export default Users;
