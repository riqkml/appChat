import Reactotron from 'reactotron-react-native';

const yeOldeConsoleLog = console.log;

console.log = (...args) => {
  yeOldeConsoleLog(...args);
  Reactotron.display({
    name: 'CONSOLE.LOG',
    value: args,
    preview: args.length > 0 && typeof args[0] === 'string' ? args[0] : null,
  });
};
Reactotron.configure({
  name: 'chatbox',
}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect();
