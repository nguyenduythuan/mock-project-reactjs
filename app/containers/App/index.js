import React, { memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Header from 'components/Header';
import Footer from 'components/Footer';
import { createStructuredSelector } from 'reselect';

import HomePage from 'containers/HomePage';
import Class from 'containers/Class';
import Login from 'containers/Login';
import NotPage from 'containers/NotFoundPage';
import InfoUser from 'containers/InfoUser';
import DetailsPage from 'containers/DetailsPage';
import PropsTypes from 'prop-types';
import People from '../People';

import GlobalStyle from '../../global-styles';
import Article from '../../components/Article';
import Wrapper from '../../components/Wrapper';
import { makeSelectLocation } from './selectors';
import GlobalLoading from '../GlobalLoading';

const linkRoute = {
  level0: [
    { id: 1, href: '/', main: HomePage, exact: true },
    { id: 2, href: '/people', main: People, exact: true },
    { id: 3, href: '/class', main: Class, exact: true },
    { id: 4, href: '/user/info/:id', main: DetailsPage, exact: false },
    { id: 5, href: '/class/info/:id', main: InfoUser, exact: false },
    { id: 6, href: '', main: NotPage, exact: false },
  ],
  level12: [
    { id: 1, href: '/', main: HomePage, exact: true },
    { id: 2, href: '/class', main: Class, exact: true },
    { id: 3, href: '/user/info/:id', main: DetailsPage, exact: false },
    { id: 4, href: '/class/info/:id', main: InfoUser, exact: false },
    { id: 5, href: '', main: NotPage, exact: false },
  ],
  level3: [
    { id: 1, href: '/', main: HomePage, exact: true },
    { id: 2, href: '/login', main: Login, exact: true },
    { id: 4, href: '', main: NotPage, exact: false },
  ],
};

function App(props) {
  let roles = 3;
  const tokenAccout = JSON.parse(localStorage.getItem('token'));
  if (tokenAccout) {
    roles = tokenAccout.level;
  }
  const getLink = arr => (
    <Switch>
      {arr.map(item => (
        <Route
          key={item.id}
          exact={item.exact}
          path={item.href}
          component={item.main}
        />
      ))}
    </Switch>
  );

  const roleLink = () => {
    switch (roles) {
      case 0:
        return getLink(linkRoute.level0);
      case 1:
        return getLink(linkRoute.level12);
      case 2:
        return getLink(linkRoute.level12);
      default:
        return getLink(linkRoute.level3);
    }
  };
  return (
    <Wrapper>
      <GlobalLoading />
      {props.path.pathname !== '/login' ? (
        <Header level={roles} user={tokenAccout} />
      ) : null}
      <Article>{roleLink()}</Article>
      {props.path.pathname !== '/login' ? <Footer /> : null}
      <GlobalStyle />
    </Wrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  path: makeSelectLocation(),
});
const withConnect = connect(mapStateToProps);

App.propTypes = {
  path: PropsTypes.object,
};

export default compose(
  withConnect,
  memo,
)(App);
