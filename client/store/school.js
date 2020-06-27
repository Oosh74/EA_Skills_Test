import axios from 'axios';

//ACTION TYPES
const GET_SCHOOL = 'GET_SCHOOL';
const GET_ETHN = 'GET_ETHN';
const GET_PROG = 'GET_PROG';
const GET_RET = 'GET_RET';
const GET_TOTAL = 'GET_TOTAL';

//ACTION CREATORS
const getSchool = (school) => ({type: GET_SCHOOL, school});
const getEthnicity = (ethnicity) => ({type: GET_ETHN, ethnicity});
const getProgram = (program) => ({type: GET_PROG, program});
const getRetention = (retention) => ({type: GET_RET, retention});
const getTotal = (total) => ({type: GET_TOTAL, total});

//THUNKS
export const schoolData = () => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.data.gov/ed/collegescorecard/v1/schools?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=zzjr15eeTFdxvmeMjB7CVCB6WtMzw1uh9IikvyMA`
    );

    /*
    Below contains the logic to work around a bug where in this file, all data can be accessed no matter how nested it is,
    however, when trying to access deeply nested data from redux in react components, it returns undefined.
    To fix this, only data we need is grabbed and stored  in a variable in this thunk, and is passed into the reducer/redux store, allowing it to be used in the react components.
    */

    //Limits the data to the results array, making it easier to work with.
    const newData = res.data.results[0];

    //objects to store our data
    const school = {};
    const year = {};

    //Maps the correct data into the variables/objects above
    if (newData.hasOwnProperty('school')) {
      for (let key in newData.school) {
        school[key] = newData.school[key];
      }
    }
    if (newData.hasOwnProperty('2018')) {
      for (let key in newData.latest) {
        year[key] = newData.latest[key];
      }
    }

    //The needed data is grabbed and stored in a variable, ensuring we have access on the react side
    //Ethnicity Data
    const ethData = year.student.demographics.race_ethnicity;

    //Program Percentage Data
    const progData = year.academics.program_percentage;

    //Retention Data (Four Year)
    const retData = year.student.retention_rate.four_year;

    //Total # of Students
    const totalStudents = year.student.enrollment;

    //Dispatching the data
    dispatch(getSchool(school));
    dispatch(getEthnicity(ethData));
    dispatch(getProgram(progData));
    dispatch(getRetention(retData));
    dispatch(getTotal(totalStudents));
  } catch (err) {
    console.error(err);
  }
};

//INITIAL STATE
const schoolDataState = {
  school: {},
  retData: {},
  ethData: {},
  progData: {},
  total: {},
};

//REDUCER
export default function (state = schoolDataState, action) {
  switch (action.type) {
    case GET_SCHOOL:
      return {...state, school: action.school};
    case GET_ETHN:
      return {...state, ethData: action.ethnicity};
    case GET_PROG:
      return {...state, progData: action.program};
    case GET_RET:
      return {...state, retData: action.retention};
    case GET_TOTAL:
      return {...state, total: action.total};
    default:
      return state;
  }
}
