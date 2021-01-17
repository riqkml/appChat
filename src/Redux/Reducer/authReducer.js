const authData = {
  isLogin: false,
  fireStoreKey:
    'key=AAAAi2M3DSw:APA91bHrglbRNtvyLu9IFEXF0gZC_b5Szbf7FHDuiULULQI_JEmq24FT1bUnJNBw7zkxfnujJKuNHponsL2D58oXkKO9wovgsuPBJnATlrTbHBT04wsCo9AKDUrzldi5xVXmmffhMl_c',
  userLoginData: {},
};

const authReducer = (state = authData, action) => {
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
