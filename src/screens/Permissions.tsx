import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { PermissionsContext } from '../context/PermissionsContext';
import { BlackButton } from '../components/BlackButton';

export const Permissions = () => {

  const { permissions, askLocationsPermission } = useContext(PermissionsContext);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Es necesario el uso del GPS para usar esta aplicación</Text>

      <BlackButton
        title="Permiso"
        onPress={askLocationsPermission}
      />

      <Text style={{ color: 'black' }}>{JSON.stringify(permissions, null, 5)}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    color: 'black'
  }
});