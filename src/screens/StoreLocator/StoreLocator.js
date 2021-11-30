import React from 'react'
import { View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Icons from 'react-native-vector-icons/MaterialIcons';
import HeaderScreen from '../../components/Header';


 const StoreLocator = (props) => {
    
  return (
      <View style={{ flex: 1 }}>
          <HeaderScreen header="Store Locator" onPress={()=> props.navigation.goBack()}/>
          <MapView
              style={styles.map}
              initialRegion={{
                  latitude: 19.190795877445505,
                  longitude: 72.92963201677117,
                  latitudeDelta: 1,
                  longitudeDelta: 4,
              }}>
              <Marker coordinate={{ latitude: 19.090795877445505, longitude: 72.82963201677117 }}
                  title="NeoSTORE, Mumbai " style={styles.marker}>
                  <Icons color='red' name="location-pin" size={32} />
              </Marker>
              <Marker coordinate={{ latitude: 18.613445197389776, longitude: 73.73731460548694 }}
                  title="NeoSTORE, Pune " style={styles.marker}>
                  <Icons color='red' name="location-pin" size={32} />
              </Marker>
              <Marker coordinate={{ latitude: 19.141079, longitude: 73.008824 }}
                  title="NeoSTORE, Navi Mumbai " style={styles.marker}>
                  <Icons color='red' name="location-pin" size={32} />
              </Marker>


          </MapView>
      </View>
  )
}
const styles = StyleSheet.create({
  map: {
      flex: 1,
  },
  marker: {
      height: 30,
      width: 30
  }
})
export default StoreLocator
