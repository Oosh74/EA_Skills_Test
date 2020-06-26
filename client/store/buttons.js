//ACTION TYPES
const PROG_BUTN = 'PROG_BUTN';
const ETHN_BUTN = 'ETHN_BUTN';
const RET_BUTN = 'RET_BUTN';

//ACTION CREATORS
export const handleProgClick = () => ({type: PROG_BUTN});
export const handleEthnClick = () => ({type: ETHN_BUTN});
export const handleRetClick = () => ({type: RET_BUTN});

// export const incrementOrDecrement = (productId, method) => ({
//   type: INCREMENT_OR_DECREMENT,
//   productId,
//   method,
// });

//THUNKS
// function updateQuantityLocal(productId, method) {
//   let localCart = JSON.parse(localStorage.getItem('cart'));
//   for (let i = 0; i < localCart.length; i++) {
//     if (localCart[i].id === productId && method === '+') {
//       localCart[i].quantity++;
//       break;
//     }
//     if (localCart[i].id === productId && method === '-') {
//       localCart[i].quantity--;
//       break;
//     }
//   }
//   localStorage.setItem('cart', JSON.stringify(localCart));
//   return [...localCart];
// }

export const handleProgClickThunk = () => (dispatch) => {
  //   return console.log('Prog Clicked');
  dispatch(handleProgClick());
};
export const handleEthnClickThunk = () => (dispatch) => {
  //   return console.log('Ethn Clicked');
  dispatch(handleEthnClick());
};
export const handleRetClickThunk = () => (dispatch) => {
  //   return console.log('Ret Clicked');
  dispatch(handleRetClick());
};

//INITIAL STATE
const buttonState = {progBtn: false, ethnBtn: false, retBtn: false};

//REDUCER
export default function (state = buttonState, action) {
  switch (action.type) {
    case PROG_BUTN:
      console.log('Prog Clicked');
      return {...state, progBtn: true, ethnBtn: false, retBtn: false};
    case ETHN_BUTN:
      console.log('Ethn Clicked');
      return {...state, progBtn: false, ethnBtn: true, retBtn: false};
    case RET_BUTN:
      console.log('Ret Clicked');
      return {...state, progBtn: false, ethnBtn: false, retBtn: true};
    default:
      return state;
  }
}
