import React from 'react';

import NavBar from '../NavBar';
import LinkHeader from '../LinkHeader';
import MenuLink from '../MenuLink';

function LinkTeacher() {
  return (
    <MenuLink>
      <NavBar>
        <LinkHeader exact to="/">
          Trang Chủ
        </LinkHeader>
      </NavBar>
      <NavBar>
        <LinkHeader exact to="/class">
          Lớp Học
        </LinkHeader>
      </NavBar>
    </MenuLink>
  );
}

export default LinkTeacher;
