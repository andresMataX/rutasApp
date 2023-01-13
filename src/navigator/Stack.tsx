import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Permissions } from '../screens/Permissions';
import { Map } from '../screens/Map';
import { PermissionsContext } from '../context/PermissionsContext';
import { Loading } from '../screens/Loading';

export type RootStackParams = {
  Permissions: undefined;
  Map: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {

  const { permissions } = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <Loading />
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >

      {
        (permissions.locationStatus === 'granted')
          ? <Stack.Screen name="Map" component={Map} />
          : <Stack.Screen name="Permissions" component={Permissions} />
      }

    </Stack.Navigator>
  );
}