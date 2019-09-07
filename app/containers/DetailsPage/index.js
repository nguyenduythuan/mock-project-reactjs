import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropsTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MaterialTable from 'material-table';
import Skeleton from 'react-loading-skeleton';

import StyleAvt from './StyleAvt';
import ButtonAvt from './ButtonAvt';
import reducer from './reducers';
import { makeSelectUser, selectSave } from './selectors';
import saga from './sagas';
import { fetchUser, editUser, calcelEdit } from './actions';
import Section from '../../components/Section';

import useStyles from './styles';

const key = 'detpage';

function DetailsPage(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const userLevel = JSON.parse(localStorage.getItem('token'));
  const [disabled, setDisabled] = React.useState({
    is: true,
  });
  useEffect(() => {
    props.onFetchUser();
  }, []);
  const classes = useStyles();
  const [state, setState] = React.useState();

  function editClick() {
    const {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      position,
      description,
      dateBirth,
      address,
      avatar,
    } = props.dataUser;
    setDisabled({
      is: false,
    });
    setState({
      id,
      firstName,
      lastName,
      email,
      phoneNumber: phoneNumber || '',
      gender: gender || '',
      position: position || '',
      description: description || '',
      dateBirth: dateBirth || '',
      address: address || '',
      avatar: avatar || '',
    });
  }
  function onCancel() {
    setDisabled({
      is: true,
    });
    props.onCancelEdit();
  }
  function onSave() {
    props.onEditUser(state);

    setDisabled({
      is: true,
    });
  }
  function onBack() {
    window.history.back();
  }

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  // load avatar
  const handleChangeAvt = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    const file = event.target.files[0];
    getBase64(file).then(base64 => {
      setState({
        ...state,
        avatar: base64,
      });
    });
  };

  const { dataUser = false } = props;

  return (
    <Section>
      {props.dataUser ? (
        <Grid
          container
          item
          xs={12}
          justify="center"
          className={classes.boxInfo}
        >
          {
            <Paper>
              <div>
                {props.dataUser && Object.keys(props.dataUser).length > 0 ? (
                  <h2 className={classes.titleH2}>Thông tin cá nhân</h2>
                ) : (
                  <Skeleton width={300} height={50} />
                )}
              </div>
              <Grid container item spacing={2} xs={12} justify="center">
                {props.dataUser.avatar ? (
                  <Grid item>
                    <ButtonAvt>
                      <StyleAvt
                        alt="complex"
                        src={
                          state && state.avatar
                            ? state.avatar
                            : props.dataUser.avatar
                        }
                      />
                    </ButtonAvt>
                  </Grid>
                ) : (
                  <Skeleton circle height={250} width={250} />
                )}

                <Grid item xs={6} container justify="center">
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      {disabled.is ? (
                        <React.Fragment>
                          {Object.keys(props.dataUser).length > 0 ? (
                            <h2 variant="subtitle1">
                              {`${props.dataUser.firstName} ${
                                props.dataUser.lastName
                              }`}
                            </h2>
                          ) : (
                            <Skeleton height={50} />
                          )}
                        </React.Fragment>
                      ) : null}
                      {!disabled.is ? (
                        <div>
                          <TextField
                            id="standard-name"
                            label="First Name"
                            onChange={handleChange}
                            defaultValue={props.dataUser.firstName}
                            className={classes.textField}
                            margin="normal"
                            name="firstName"
                          />
                          <TextField
                            id="standard-name"
                            label="Last Name"
                            onChange={handleChange}
                            defaultValue={props.dataUser.lastName}
                            className={classes.textField}
                            margin="normal"
                            name="lastName"
                          />
                        </div>
                      ) : null}
                      {props.dataUser.email ? (
                        <TextField
                          disabled={disabled.is || true}
                          id="standard-email"
                          label="Email"
                          onChange={handleChange}
                          value={props.dataUser.email}
                          className={classes.textField}
                          margin="normal"
                          name="email"
                        />
                      ) : (
                        <Skeleton width={150} height={50} />
                      )}
                      {props.dataUser.phoneNumber ? (
                        <TextField
                          disabled={disabled.is}
                          id="standard-phone"
                          label="Phone Number"
                          onChange={handleChange}
                          value={props.dataUser.phoneNumber}
                          className={classes.textField}
                          margin="normal"
                          name="phoneNumber"
                        />
                      ) : (
                        <Skeleton width={150} height={50} />
                      )}

                      {props.dataUser.gender ? (
                        <TextField
                          disabled={disabled.is}
                          id="standard-select-currency-native"
                          select
                          label="Gender select"
                          className={classes.textFieldSelect}
                          value={props.dataUser.gender}
                          onChange={handleChange}
                          name="gender"
                          SelectProps={{
                            native: true,
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </TextField>
                      ) : (
                        <Skeleton width={150} height={50} />
                      )}

                      {props.dataUser.position ? (
                        <TextField
                          disabled={disabled.is}
                          id="standard-select-standard-position"
                          select
                          label="Position select"
                          className={classes.textFieldSelect}
                          value={props.dataUser.position}
                          name="position"
                          onChange={handleChange}
                          SelectProps={{
                            native: true,
                            MenuProps: {
                              className: classes.menu,
                            },
                          }}
                        >
                          <option value="Giám đốc">Giám đốc</option>
                          <option value="Nhân viên">Nhân viên</option>
                          <option value="Phó Giám Đốc">Phó Giám Đốc</option>
                        </TextField>
                      ) : (
                        <Skeleton width={150} height={50} />
                      )}
                      {props.dataUser.description ? (
                        <TextField
                          disabled={disabled.is}
                          id="standard-description"
                          label="Description"
                          name="description"
                          multiline
                          rowsMax="5"
                          onChange={handleChange}
                          value={props.dataUser.description}
                          className={classes.textField}
                          margin="normal"
                        />
                      ) : null}
                      {props.dataUser.dateBirth ? (
                        <React.Fragment>
                          <TextField
                            disabled={disabled.is}
                            id="date"
                            label="Birthday"
                            type="date"
                            name="dateBirth"
                            onChange={handleChange}
                            value={props.dataUser.dateBirth}
                            className={classes.textFieldSelect}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <TextField
                            disabled={disabled.is}
                            id="standard-address"
                            label="Address"
                            name="address"
                            onChange={handleChange}
                            value={props.dataUser.address}
                            className={classes.textFieldSe}
                            margin="normal"
                          />
                        </React.Fragment>
                      ) : null}
                      {disabled.is === false ? (
                        <React.Fragment>
                          <input
                            name="avatar"
                            accept="image/*"
                            className={classes.input}
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={handleChangeAvt}
                          />
                          <label
                            htmlFor="raised-button-file"
                            className={classes.labelUp}
                          >
                            <Button
                              component="span"
                              className={classes.buttonUp}
                            >
                              Upload Avatar
                            </Button>
                          </label>
                        </React.Fragment>
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <div className={classes.divBtn}>
                {props.dataUser && Object.keys(props.dataUser).length > 0 ? (
                  <React.Fragment>
                    <Button
                      className={classes.button}
                      onClick={
                        disabled.is === false && userLevel.level === 0
                          ? onCancel
                          : onBack
                      }
                      variant="contained"
                      color="secondary"
                      type="reset"
                    >
                      {disabled.is === false && userLevel.level === 0
                        ? 'Cancel'
                        : 'Back'}
                    </Button>
                    {userLevel.level === 0 ? (
                      <Button
                        className={classes.button}
                        onClick={disabled.is === true ? editClick : onSave}
                        variant="contained"
                        color="secondary"
                      >
                        {disabled.is === true ? 'Edit' : 'Save'}
                      </Button>
                    ) : null}
                  </React.Fragment>
                ) : (
                  <Skeleton width={300} height={50} />
                )}
              </div>
            </Paper>
          }
        </Grid>
      ) : null}
      {dataUser && dataUser.classTeacher ? (
        <React.Fragment>
          {dataUser.classTeacher.length > 0 ? (
            <MaterialTable
              title="Thông tin giảng dạy"
              columns={[
                { title: 'STT', field: 'id' },
                { title: 'Phòng học', field: 'classWeekday.roomNumber' }, // classWeekday.roomNumber
                { title: 'Tên Khóa Học', field: 'name' },
                { title: 'Ngày bắt đầu', field: 'startDay' },
                { title: 'Ngày kết thúc', field: 'endDay' },
                {
                  title: 'Lịch dạy',
                  field: 'lichday',
                  render: rowData => {
                    const weekdayHours = rowData.classWeekday.weekdayHours.map(
                      item => <p key={item.weekday}>{item.weekday}</p>,
                    );
                    return weekdayHours;
                  },
                },
                {
                  title: 'Giờ dạy',
                  field: 'gioday',
                  render: rowData => {
                    const hours = rowData.classWeekday.weekdayHours.map(
                      item => <p key={item.hours}>{item.hours}</p>,
                    );
                    return hours;
                  },
                },
              ]}
              data={props.dataUser.classTeacher}
              options={{
                sorting: false,
                search: false,
                showFirstLastPageButtons: false,
                paging: false,
              }}
            />
          ) : null}
        </React.Fragment>
      ) : (
        <Skeleton height={100} />
      )}
      {dataUser && dataUser.classStudent && dataUser.classStudent.length > 0 ? (
        <MaterialTable
          title="Lịch học của học viên"
          columns={[
            { title: 'STT', field: 'id' },
            { title: 'Phòng học', field: 'classWeekday.roomNumber' }, // classWeekday.roomNumber
            { title: 'Tên Khóa Học', field: 'name' },
            { title: 'Ngày bắt đầu', field: 'startDay' },
            { title: 'Ngày kết thúc', field: 'endDay' },
            {
              title: 'Lịch học',
              field: 'lichday',
              render: rowData => {
                const weekdayHours = rowData.classWeekday.weekdayHours.map(
                  item => <p key={item.weekday}>{item.weekday}</p>,
                );
                return weekdayHours;
              },
            },
            {
              title: 'Giờ học',
              field: 'gioday',
              render: rowData => {
                const hours = rowData.classWeekday.weekdayHours.map(item => (
                  <p key={item.hours}>{item.hours}</p>
                ));
                return hours;
              },
            },
          ]}
          data={props.dataUser.classStudent}
          options={{
            sorting: false,
            search: false,
            showFirstLastPageButtons: false,
            paging: false,
          }}
        />
      ) : null}
      <ToastContainer autoClose={2000} />
    </Section>
  );
}

const mapStateToProps = createStructuredSelector({
  dataUser: makeSelectUser(),
  isSave: selectSave(),
});
const mapDispatchToProps = dispatch => ({
  onFetchUser: () => {
    dispatch(fetchUser());
  },
  onEditUser: values => {
    dispatch(editUser(values));
  },
  onCancelEdit: () => {
    dispatch(calcelEdit());
  },
});

// format avt
const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
DetailsPage.propTypes = {
  onFetchUser: PropsTypes.func,
  dataUser: PropsTypes.object,
  onEditUser: PropsTypes.func,
  onCancelEdit: PropsTypes.func,
};

export default compose(
  withConnect,
  memo,
)(DetailsPage);
