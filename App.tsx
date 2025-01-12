import React from 'react';
import api from './src/common/api';
import Toast from 'react-native-toast-message';

import { createStackNavigator } from '@react-navigation/stack';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { globalContext } from './src/common/globalContext';
import { Dictionary } from './src/common/types';

export type ScreenProps = {
  route: any;
  navigation: StackNavigationProp<any>;
};

const Stack = createStackNavigator<any>();

const ScreenItem = (name: string, component: any, title?: string) => {
  return (
    <Stack.Screen
      name={name}
      component={component}
      key={name + title}
      // options={({ navigation }) => ({
      //   headerShown: true,
      //   title: title,
      //   headerBackTitleVisible: false,
      // })}
    />
  );
};

export const fetchMenuList = async () => {
  try {
    const test = await api<Dictionary[]>('get', 'test/list', { id: 1 });
    if (test.data) {
      globalContext.menuList = test.data;
      console.log("test/list data: ", globalContext.menuList);
    }
  } catch (error) {
    console.error("Failed to fetch menu list:", error);
  }
};
function App(): React.JSX.Element {
  fetchMenuList();

  const ScreenList: any[] = [];

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="" screenOptions={{}}>
          {ScreenList.map((component: any, index: number) => {
            return <React.Fragment key={`screenitem-${index}`}>{component}</React.Fragment>;
          })}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
