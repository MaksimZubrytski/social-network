import './App.css';
import Nav from './components/Nav/Nav';
import { Route, withRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { useEffect } from 'react';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';

const App = (props) => {
  const { initializeApp, initialized } = { ...props };

  useEffect(() => {
    initializeApp();
  }, [initializeApp])

  if (!initialized) {
    return <Preloader />
  }

  return (
    <div className="wrapper">
      <HeaderContainer />
      <Nav />
      <div className="wrapper-content">
        <Route path="/dialogs" render={() => <DialogsContainer />} />
        <Route path="/profile/:userID?" render={() => <ProfileContainer />} />
        <Route path="/users" render={() => <UsersContainer />} />
        <Route path="/login" render={() => <Login />} />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
