import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropsTypes from 'prop-types';

import BoxCard from '../DetailsPage/BoxCard';
import ButtonAvt from '../DetailsPage/ButtonAvt';
import StyleAvt from '../DetailsPage/StyleAvt';
import StyleTheP from '../DetailsPage/StyleTheP';
import StyleLink from './styleLink';

function ItemInfo(props) {
  const { teacher, student } = props;
  const token = JSON.parse(localStorage.getItem('token'));
  function showDataInfo() {
    if (teacher) {
      return (
        <React.Fragment>
          <Grid container spacing={2} item xs={12} justify="center">
            <Grid item xs={6}>
              <ButtonAvt>
                <StyleAvt
                  style={{ borderRadius: '50%', marginRight: '20px' }}
                  alt="complex"
                  src={teacher.avatar}
                />
              </ButtonAvt>
            </Grid>
            <Grid item xs={6} container justify="center">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h2 variant="subtitle1">
                    {teacher.firstName + teacher.lastName}
                  </h2>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>ID:</b> {teacher.id}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Email:</b> {teacher.email}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Phone:</b>
                    {teacher.phone_number}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Gender:</b> {teacher.gender}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Description:</b> {teacher.description}
                  </StyleTheP>
                  {token && token.level === 0 ? (
                    <div style={{ marginTop: 20 }}>
                      <StyleLink to={`/user/info/${teacher.id}`}>
                        Edit
                      </StyleLink>
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    if (student) {
      return (
        <React.Fragment>
          <Grid container spacing={2} item xs={12} justify="center">
            <Grid item xs={6}>
              <ButtonAvt>
                <StyleAvt
                  style={{ borderRadius: '50%', marginRight: '20px' }}
                  alt="complex"
                  src={student.avatar}
                />
              </ButtonAvt>
            </Grid>
            <Grid item xs={6} container justify="center">
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <h2 variant="subtitle1">
                    {student.firstName + student.lastName}
                  </h2>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>ID:</b> {student.id}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Email:</b> {student.email}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Phone:</b>
                    {student.phone_number}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>Gender:</b> {student.gender}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>date_birth:</b> {student.date_birth}
                  </StyleTheP>
                  <StyleTheP variant="body1" color="textSecondary">
                    <b>address:</b> {student.address}
                  </StyleTheP>
                  {token && token.level === 0 ? (
                    <div style={{ marginTop: 20 }}>
                      <StyleLink to={`/user/info/${student.id}`}>
                        Edit
                      </StyleLink>
                    </div>
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      );
    }
    return null;
  }
  return <BoxCard style={{ boxShadow: 'none' }}>{showDataInfo()}</BoxCard>;
}

ItemInfo.propTypes = {
  student: PropsTypes.object,
  teacher: PropsTypes.object,
};

export default ItemInfo;
