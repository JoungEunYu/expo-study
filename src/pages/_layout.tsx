import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import api from '../common/api';
import { globalContext } from '../common/globalContext';
import { Dictionary } from '../common/types';

export const fetchTestList = async () => {
  try {
    const test = await api<Dictionary[]>('get', 'test/list', { id: 1 });
    if (test.data) {
      globalContext.menuList = test.data;
      console.log('test/list data: ', globalContext.menuList);
    }
  } catch (error) {
    console.error('Failed to fetch test list:', error);
  }
};

const RootLayout = () => {
  useEffect(() => {
    fetchTestList();
  }, []);

  const screenList = [
    { name: 'index', options: { title: 'Main' } },
    { name: 'about', options: { title: 'About Us' } },
    { name: 'details', options: { title: 'Details Page' } },
  ];

  return (
    <>
      <Stack>
        {screenList.map((screen) => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            options={screen.options}
          />
        ))}
      </Stack>
      <Toast />
    </>
  );
};

export default RootLayout;