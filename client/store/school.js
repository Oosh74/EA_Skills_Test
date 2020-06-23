import axios from 'axios';

//ACTION TYPES
const GET_DATA = 'GET_DATA';

//ACTION CREATORS
const getData = (data) => ({type: GET_DATA, data});

//THUNKS
export const schoolData = () => async (dispatch) => {
  try {
    const {data} = await axios.get(
      'https://api.data.gov/ed/collegescorecard/v1/schools?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=zzjr15eeTFdxvmeMjB7CVCB6WtMzw1uh9IikvyMA'
    );
    dispatch(getData(data));
  } catch (err) {
    console.error(err);
  }
};

//INITIAL STATE
const schoolDataState = {};

//REDUCER
export default function (state = schoolDataState, action) {
  switch (action.type) {
    case GET_DATA:
      return action.data;
    default:
      return state;
  }
}
