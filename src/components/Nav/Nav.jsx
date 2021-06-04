import { NavLink } from 'react-router-dom';
import classes from './Nav.module.css'

const Nav = (props) => {
    return (
    <nav className={classes.nav}>
      <NavLink to="/profile" activeClassName={classes.active}>Profile</NavLink>
      <NavLink to="/dialogs" activeClassName={classes.active}>Messages</NavLink>
      <NavLink to="/users" activeClassName={classes.active}>Users</NavLink>
      <NavLink to="/news">News</NavLink>
      <NavLink to="/music">Music</NavLink>
      <NavLink to="/settings">Settings</NavLink>

    </nav>
    )
}

export default Nav;