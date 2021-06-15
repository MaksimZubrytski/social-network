import classes from './User.module.css';
import userPhoto from '../../../assets/images/users.jpg';
import React from 'react';
import { NavLink } from 'react-router-dom';

const User = ({ user, followingInProgress, follow, unfollow }) => {

  return (
    <div>
      <span>
        <div>
          <NavLink to={'/profile/' + user.id}>
            <img src={user.photos.small != null ? user.photos.small : userPhoto} className={classes.img} alt="Димыч" />
          </NavLink>

        </div>
        <div>
          {!user.followed ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
            follow(user.id);
          }
          }>follow

                  </button> :

            <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
              unfollow(user.id)
            }}>
              Unfollow
                    </button>}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
      </span>
    </div>
  )
}


export default User;