import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropsTypes from 'prop-types';

import LinkHeader from './LinkHeader';
import MenuLink from './MenuLink';
import Accout from './Accout';
import LinkAdmin from './LinkRole/LinkAdmin';
import LinkTeacher from './LinkRole/LinkTeacher';
import LinkStudent from './LinkRole/LinkStudent';

function Header(props) {
  const [values, setValues] = useState({
    level: props.level,
    user: props.user,
  });
  useEffect(() => {
    setValues({ level: props.level });
  });

  const quyenAdmin = () => {
    switch (values.level) {
      case 0:
        return (
          <React.Fragment>
            <LinkAdmin />
            <Accout user={values.user} />
          </React.Fragment>
        );
      case 1:
        return (
          <React.Fragment>
            <LinkTeacher />
            <Accout user={values.user} />
          </React.Fragment>
        );
      case 2:
        return (
          <React.Fragment>
            <LinkStudent />
            <Accout user={values.user} />
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <MenuLink>
              <Button variant="contained" color="primary">
                <LinkHeader to="/login">Đăng Nhập</LinkHeader>
              </Button>
            </MenuLink>
          </React.Fragment>
        );
    }
  };

  return (
    <AppBar position="static">
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">Trung Tâm Anh Ngữ</Typography>
        {quyenAdmin()}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  level: PropsTypes.number,
  user: PropsTypes.object,
};

export default Header;
