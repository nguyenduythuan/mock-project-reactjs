import React, { useEffect, memo } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropsTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Section from '../../components/Section';
import { getData } from './actions';
import reducer from './reducers';
import { makeSelectData } from './selectors';
import { makeSelectLocation } from '../App/selectors';
import saga from './sagas';
import ItemInfo from '../ItemInfo';

const key = 'info';

function Info(props) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const token = JSON.parse(localStorage.getItem('token'));
  const roleAdmin = 0;
  const roleTeacher = 1;
  const roleStudent = 2;

  const [state, setState] = React.useState({
    teachers: [],
    students: [],
  });

  const id = props.path ? props.path.pathname.slice(12) : null;

  function getTeacher(arrClass, arrTeacher) {
    const dataTeacher = [];
    arrClass[0].teacherId.forEach(tId =>
      dataTeacher.push(...arrTeacher.filter(item => item.id === tId)),
    );
    return dataTeacher;
  }

  function getClass(arr) {
    const data = arr.filter(cla => cla.id === id);
    return data;
  }

  function getStudent(arr, idClass) {
    const dataStudent = [];
    arr.forEach(item =>
      item.classId.filter(classId =>
        classId === idClass ? dataStudent.push(item) : null,
      ),
    );
    return dataStudent;
  }

  function checkRole(role, allClass, teachers, students) {
    const dataClass =
      role === roleAdmin || role === roleStudent ? getClass(allClass) : null;
    const dataTeacher =
      role === roleAdmin || role === roleStudent
        ? getTeacher(dataClass, teachers)
        : null;
    const dataStudent =
      role === roleTeacher || role === roleAdmin
        ? getStudent(students, id)
        : null;
    setState({
      ...state,
      teachers: dataTeacher || [],
      students: dataStudent || [],
    });
  }

  useEffect(() => {
    props.onGetData();
  }, []);

  useEffect(() => {
    if (props.data && props.data.dataClass) {
      checkRole(
        token.level,
        props.data.dataClass,
        props.data.dataTeacher,
        props.data.dataStudent,
      );
    }
  }, [props.data]);

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      {state.teachers.length > 0 ? (
        <Section style={{ width: '50%', padding: '50px 5px' }}>
          <h2 style={{ textAlign: 'center' }}>Giáo Viên Đứng Lớp</h2>
          {state.teachers.map(teacher => (
            <ExpansionPanel key={teacher.id}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography>{teacher.id}</Typography>
                <Typography style={{ marginLeft: '20px', fontWeight: '900' }}>
                  {`${teacher.firstName}${teacher.lastName}`}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ItemInfo teacher={teacher} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Section>
      ) : null}
      {state.students.length > 0 ? (
        <Section style={{ width: '50%', padding: '50px 5px' }}>
          <h2 style={{ textAlign: 'center' }}>Danh Sách Học Viên</h2>
          {state.students.map(student => (
            <ExpansionPanel key={student.id}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography>{student.id}</Typography>
                <Typography style={{ marginLeft: '20px', fontWeight: '900' }}>
                  {`${student.firstName}${student.lastName}`}
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <ItemInfo student={student} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </Section>
      ) : null}
      <ToastContainer autoClose={2000} />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  path: makeSelectLocation(),
});
const mapDispatchToProps = dispatch => ({
  onGetData: () => {
    dispatch(getData());
  },
});
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
Info.propTypes = {
  onGetData: PropsTypes.func,
  data: PropsTypes.object,
  path: PropsTypes.object,
};

export default compose(
  withConnect,
  memo,
)(Info);
