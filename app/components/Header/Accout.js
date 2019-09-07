import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropsTypes from 'prop-types';

import LinhAcc from './LinkAccount';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Accout(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [valueUser] = React.useState({
    user: props.user,
  });
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  function onLogOut() {
    const token = localStorage.removeItem('token');
    if (!token) {
      localStorage.setItem('toat', 2);
      window.location.href = '/';
    }
  }
  return (
    <React.Fragment>
      {valueUser.user ? (
        <div>
          <Button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}
          >
            <i className="material-icons">account_circle </i>
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <ListItemIcon>
                <i className="material-icons">settings </i>
              </ListItemIcon>
              <LinhAcc to={`/user/info/${valueUser.user.id}`}>
                <ListItemText primary={valueUser.user.name} />
              </LinhAcc>
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemIcon>
                <i className="material-icons">exit_to_app</i>
              </ListItemIcon>
              <ListItemText primary="Đăng Xuất" onClick={onLogOut} />
            </StyledMenuItem>
          </StyledMenu>
        </div>
      ) : null}
    </React.Fragment>
  );
}

Accout.propTypes = {
  user: PropsTypes.object,
  // history: PropsTypes.object,
};
