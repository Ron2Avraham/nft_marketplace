import React, { useRef } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MotorcycleScreen from './src/screens/motorCycle/MotorcycleScreen';
import AutomotiveScreen from './src/screens/autoMotive/AutomotiveScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import analytics from '@react-native-firebase/analytics';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  const routeNameRef = useRef<string>();
  const navigationRef = useNavigationContainerRef();

  const navStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {

      // Save the current route name for later comparison
      routeNameRef.current = currentRouteName;

      analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
  }

  const onReadyNav = () => {
    if (routeNameRef) {
      const currentRouteName = navigationRef.getCurrentRoute()?.name;
      routeNameRef.current = currentRouteName;
      analytics().logScreenView({
        screen_name: currentRouteName,
        screen_class: currentRouteName,
      });
    }
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReadyNav}
      onStateChange={navStateChange}

    >
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName = '';
          if (route.name === 'Motorcycles') {
            iconName = 'motorbike';
          } else if (route.name === 'Automotives') {
            iconName = 'car-estate';
          }
          return <MaterialCommunityIcons name={iconName} size={40} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      
      >
        <Tab.Screen name="Motorcycles" component={MotorcycleScreen} />
        <Tab.Screen name="Automotives" component={AutomotiveScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
