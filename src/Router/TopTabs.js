import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ChatScreen, DashboardScreen} from '../Pages';
const Tab = createMaterialTopTabNavigator();

export default class TopTabs {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={DashboardScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
      </Tab.Navigator>
    );
  }
}
