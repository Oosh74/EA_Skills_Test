//ACTION TYPES
const PROG_BUTN = 'PROG_BUTN';
const ETHN_BUTN = 'ETHN_BUTN';
const RET_BUTN = 'RET_BUTN';

//ACTION CREATORS
export const handleProgClick = () => ({type: PROG_BUTN});
export const handleEthnClick = () => ({type: ETHN_BUTN});
export const handleRetClick = () => ({type: RET_BUTN});

//THUNKS
export const handleProgClickThunk = () => (dispatch) => {
  dispatch(handleProgClick());
};
export const handleEthnClickThunk = () => (dispatch) => {
  dispatch(handleEthnClick());
};
export const handleRetClickThunk = () => (dispatch) => {
  dispatch(handleRetClick());
};

//INITIAL STATE
const buttonState = {progBtn: false, ethnBtn: false, retBtn: false};

//REDUCER
export default function (state = buttonState, action) {
  switch (action.type) {
    case PROG_BUTN:
      return {...state, progBtn: true, ethnBtn: false, retBtn: false};
    case ETHN_BUTN:
      return {...state, progBtn: false, ethnBtn: true, retBtn: false};
    case RET_BUTN:
      return {...state, progBtn: false, ethnBtn: false, retBtn: true};
    default:
      return state;
  }
}
