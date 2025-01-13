import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: 'home page',
        }}
      />
      <Tabs.Screen
        name="users/[slug]"
        options={{
          headerTitle: 'user page',
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;