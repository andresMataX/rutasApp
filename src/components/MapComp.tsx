import React, { useEffect, useRef } from 'react';
import MapView, { Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { Loading } from '../screens/Loading';
import { FabIcon } from './FabIcon';

export const MapComp = () => {

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  const centerPosition = async () => {

    const { latitude, longitude } = await getCurrentLocation();

    following.current = true

    mapViewRef.current?.animateCamera({
      center: { latitude, longitude }
    })
  }

  useEffect(() => {
    followUserLocation()

    return () => {
      stopFollowUserLocation()
    }
  }, [])

  useEffect(() => {

    if (!following.current) return
    const { latitude, longitude } = userLocation;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude }
    })

  }, [userLocation])

  if (!hasLocation) {
    return <Loading />
  }

  return (
    <>
      <MapView
        ref={(el) => mapViewRef.current = el!}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{ flex: 1 }}
        onTouchStart={() => following.current = false}
      >

        <Polyline
          coordinates={routeLines}
          strokeColor="black"
          strokeWidth={3}
        />

        {/* <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Esto es un título"
          description="Esto es una descripción del marcador"
          image={require("../assets/custom-marker.png")}
        /> */}

      </MapView>

      <FabIcon
        iconName='compass-outline'
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20
        }}
      />
    </>
  )
}