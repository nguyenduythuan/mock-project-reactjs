import React, { useEffect, memo } from 'react';
import MaterialTable from 'material-table';
import { Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

import { connect } from 'react-redux';
import { compose } from 'redux';
import PropsTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import Skeleton from 'react-loading-skeleton';

import Section from '../../components/Section';
import StyleLink from '../../components/StyleLink';
import { fetchClass } from './actions';
import reducer from './reducers';
import { makeSelectClass } from './selectors';
import saga from './saga';
import SectionForm from './SectionForm';
import useStyles from './styles';

const key = 'class';
const admin = 0;
const teacher = 1;
const student = 2;
const dataConst = {
  data: [],
  weekday: [],
};

function Teachers(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();
  const [isCheck, setCheck] = React.useState(false);
  const [state, setState] = React.useState({
    data: [],
    day: [],
  });
  const token = JSON.parse(localStorage.getItem('token'));

  function getWeeday(arr) {
    const weekday = [];
    arr.forEach(element =>
      element.classWeekday.weekdayHours.filter(item =>
        item.weekday !== '' ? weekday.push(item.weekday) : null,
      ),
    );
    return weekday;
  }

  function getUser(arr) {
    return arr.filter(item => item.email === token.mail);
  }

  function getClassTeacher(arr) {
    const data = [];
    arr.forEach(element => {
      element.teacherId.filter(id =>
        id === token.id ? data.push(element) : null,
      );
    });
    return data;
  }

  function getClassStudent(arr, user) {
    const data = [];
    arr.forEach(item => {
      user[0].classId.filter(id => (item.id === id ? data.push(item) : null));
    });
    return data;
  }

  function checkRole(role, arrClass, arrStudent) {
    const dataUser = role === student ? getUser(arrStudent) : null;

    const dataClassTeacher =
      role === teacher ? getClassTeacher(arrClass) : null;

    const data = role === student ? getClassStudent(arrClass, dataUser) : null;

    const dataWeeday =
      role === student || role === teacher
        ? getWeeday(role === student ? data : dataClassTeacher)
        : getWeeday(arrClass);

    const dataClass = dataClassTeacher || data;

    setState({
      ...state,
      data: role === admin ? arrClass : dataClass,
      day: [...new Set(dataWeeday)],
    });
  }

  useEffect(() => {
    props.onFetchClass();
  }, []);

  useEffect(() => {
    if (token && props.data && props.data.dataClass) {
      const { dataClass, dataStudent } = props.data;
      checkRole(token.level, dataClass, dataStudent);
    }
  }, [props.data]);

  const handleChange = ev => {
    const { value } = ev.target;
    const { dataClass } = props.data;
    const weekday = [];
    const allClass = dataClass.filter(cl =>
      cl.name
        .trim()
        .toLowerCase()
        .includes(value.trim().toLowerCase()),
    );
    allClass.forEach(element =>
      element.classWeekday.weekdayHours.filter(item =>
        item.weekday !== '' ? weekday.push(item.weekday) : null,
      ),
    );
    dataConst.data = allClass;
    dataConst.weekday = weekday;
    setState({
      ...state,
      data: allClass,
      day: [...new Set(weekday)],
      search: value,
    });
  };

  function getClass(arr, k = '') {
    const data = [];
    arr.forEach(cla =>
      cla.classWeekday.weekdayHours.filter(item =>
        item.weekday === k ? data.push(cla) : null,
      ),
    );
    return data;
  }

  const handleChangeSelect = ev => {
    const { value } = ev.target;
    const { dataClass } = props.data;
    const filterClass =
      state.search && value
        ? getClass(dataConst.data, value)
        : getClass(dataClass, value);

    setState({
      ...state,
      data: value ? filterClass : dataConst.data,
    });
  };

  const onClickInput = ev => {
    const check = !!(ev && ev.target.value !== '');
    setCheck(check);
  };

  return (
    <div>
      <SectionForm>
        <h2 style={{ textAlign: 'center' }}>Danh sách sách lớp học</h2>
        <Paper className={classes.root}>
          <TextField
            id="standard-search"
            type="search"
            className={classes.textField}
            disabled={isCheck}
            margin="normal"
            name="search"
            placeholder="Search user"
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="standard-select-currency-native"
            select
            label="Weekday select"
            className={classes.textField}
            name="select"
            onChange={handleChangeSelect}
            onClick={onClickInput}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
            helperText="Please select your item"
            margin="normal"
          >
            <option value="" />
            {state.day ? (
              state.day.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))
            ) : (
              <option value="" />
            )}
          </TextField>
        </Paper>
      </SectionForm>
      <Section className={classes.table}>
        {props.data && props.data.dataClass ? (
          <MaterialTable
            title="Thông Tin Lớp Học"
            columns={[
              // { title: 'STT', field: 'id' },
              { title: 'Phòng học', field: 'classWeekday.roomNumber' },
              { title: 'Tên Khóa Học', field: 'name' },
              { title: 'Ngày bắt đầu', field: 'startDay' },
              { title: 'Ngày kết thúc', field: 'endDay' },
              {
                title: 'Lịch dạy',
                render: rowData => {
                  const weekdayHours = rowData.classWeekday.weekdayHours.map(
                    item => <p key={item.weekday}>{item.weekday}</p>,
                  );
                  return weekdayHours;
                },
              },
              {
                title: 'Giờ dạy',
                render: rowData => {
                  const hours = rowData.classWeekday.weekdayHours.map(item => (
                    <p key={item.hours}>{item.hours}</p>
                  ));
                  return hours;
                },
              },
              {
                title: 'View Info',
                render: rowData => (
                  <StyleLink to={`/class/info/${rowData.id}`}>View</StyleLink>
                ),
              },
            ]}
            data={state.data || props.data.dataClass}
            options={{
              sorting: true,
              search: false,
            }}
          />
        ) : (
          <Skeleton count={7} height={40} />
        )}
      </Section>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectClass(),
});

const mapDispatchToProps = dispatch => ({
  onFetchClass: () => {
    dispatch(fetchClass());
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

Teachers.propTypes = {
  onFetchClass: PropsTypes.func,
  data: PropsTypes.object,
};

export default compose(
  withConnect,
  memo,
)(Teachers);
