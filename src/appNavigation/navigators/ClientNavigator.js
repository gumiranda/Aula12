import {createAppContainer} from 'react-navigation';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import {createStackNavigator} from 'react-navigation-stack';
import {darken} from 'polished';
import {useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {createDrawerNavigator} from 'react-navigation-drawer';
import appMetrics from '../../utils/appMetrics';
import {signOut} from '../../appStore/appModules/auth/actions';
import Profile from '../../screens/Profile/Profile';
import Home from '../../screens/Home/Home';
import PaymentAddress from '../../screens/Payment/PaymentAddress/PaymentAddress';
import PaymentCart from '../../screens/Payment/PaymentCart/PaymentCart';
import CompleteRegister from '../../screens/Payment/CompleteRegister/CompleteRegister';
import Chats from '../../screens/Chat/List/Chats/Chats';
import Users from '../../screens/Chat/List/Users/Users';
import ChatDetails from '../../screens/Chat/ChatDetails/ChatDetails';
import {appColors} from '../../utils/appColors';
import Plans from '../../screens/Payment/Plans/Plans';
import CheckoutEasy from '../../screens/Payment/CheckoutEasy/CheckoutEasy';
import CardList from '../../screens/Payment/CardList/CardList';
import Background from '../../components/Background/Background';

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signOut());
  }, [dispatch]);
  return <Background />;
}

const RootStack = createDrawerNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: () => ({drawerLabel: 'Inicio'}),
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({drawerLabel: 'Meu perfil'}),
    },
    CompleteReg: {
      screen: createStackNavigator(
        {
          CompleteRegister,
          RegPaymentAddress: {screen: PaymentAddress},
          RegPaymentCart: {screen: PaymentCart},
          RegPlans: {screen: Plans},
        },
        {
          initialRouteName: 'CompleteRegister',
          defaultNavigationOptions: {
            headerTransparent: true,
            headerTintColor: appColors.white,
            headerLeftContainerStyle: {
              marginLeft: 0,
            },
          },
        },
      ),
      navigationOptions: () => ({drawerLabel: 'Completar registro'}),
    },
    Payment: {
      screen: createStackNavigator(
        {
          CardList,
          PaymentAddress,
          PaymentCart,
          CheckoutEasy,
          Plans,
        },
        {
          initialRouteName: 'CardList',

          defaultNavigationOptions: {
            headerTransparent: true,

            headerTintColor: appColors.white,
            headerLeftContainerStyle: {
              marginLeft: 0,
            },
          },
        },
      ),
      navigationOptions: () => ({drawerLabel: 'Pagamento'}),
    },
    Chat: {
      screen: createStackNavigator(
        {
          Chats,
          Users,
          ChatDetails,
        },
        {
          initialRouteName: 'Users',
          defaultNavigationOptions: {
            headerTransparent: true,
            headerTintColor: appColors.white,
            headerLeftContainerStyle: {
              marginLeft: 0,
            },
          },
        },
      ),
      navigationOptions: () => ({drawerLabel: 'Chat'}),
    },
    Logout: {
      screen: Logout,
      navigationOptions: () => ({drawerLabel: 'Sair'}),
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'float',
    navigationOptions: ({navigation}) => ({
      headerBackground: () => (
        <LinearGradient
          colors={[darken(0.2, appColors.primary), appColors.primary]}
          style={{flex: 1}}
        />
      ),
      headerTintColor: appColors.white,
      title: 'Dev Doido',

      headerLeft: () => (
        <Icon
          style={{padding: 10, color: appColors.white}}
          name="three-bars"
          size={30}
          color={appColors.black}
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      ),
      headerTitleStyle: {
        paddingLeft: appMetrics.DEVICE_WIDTH / 5.5,
        color: appColors.white,
      },
    }),
  },
);

export default createAppContainer(
  createStackNavigator({RootStack: {screen: RootStack}}),
);
