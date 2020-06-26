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
const buttonState = [];

//REDUCER
export default function (state = buttonState, action) {
  switch (action.type) {
    case PROG_BUTN:
      return [...state, console.log('Prog Clicked')];
    case ETHN_BUTN:
      return [...state, console.log('ETHN Clicked')];
    case RET_BUTN:
      return [...state, console.log('RET Clicked')];
    default:
      return state;
  }
}
