import React  from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/DrawerComponent';
import Home from '../screens/HomeScreens/HomeScreen';






const Drawer = createDrawerNavigator();


const DrawerNavigator = ({navigation}) => {
  return (
      <Drawer.Navigator
      drawerStyle={{
        borderBottomRightRadius: 16,
        borderTopRightRadius: 16,
        backgroundColor: 'white'
        }}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}>
          <Drawer.Screen name="Home" component={Home}/>
    </Drawer.Navigator>
  );
}


export default DrawerNavigator;