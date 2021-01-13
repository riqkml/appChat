const authData = {
  isLogin: false,
  userLoginData: {},
};

const authReducer = (state = authData, action) => {
  console.log('reducerauth', action);
  switch (action.type) {
    case 'LOGIN-USER':
      return {
        ...state,
        isLogin: true,
        userLoginData: {
          ...action.userLogin,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
