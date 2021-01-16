import {act} from 'react-test-renderer';

const chatData = {
  otherData: {},
};

const chatReducer = (state = chatData, action) => {
  switch (action.type) {
    case 'START-CHAT':
      return {
        ...state,
        otherData: {
          ...action.otherData,
        },
      };

    default:
      return state;
  }
};

export default chatReducer;
