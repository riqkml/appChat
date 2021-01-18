import {showMessage} from 'react-native-flash-message';
import {color} from 'react-native-reanimated';

const messageAlert = (msg, desc, type, position, backgroundColor, color) => {
  return showMessage({
    message: msg,
    description: desc,
    type: type,
    icon: type,
    backgroundColor: backgroundColor,
    color: color,
    position: position ? position : 'bottom',
  });
};
export {messageAlert};
