import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import DetailScreen from '../screens/DetailScreen';
import SearchScreen from '../screens/SearchScreen';

const MainNavigator = createStackNavigator({
  Home: {screen: SearchScreen},
  Profile: {screen: DetailScreen},
});

const AppContainer = createAppContainer(MainNavigator);

export default AppContainer;

// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import DetailScreen from './screens/DetailScreen';
// import SearchScreen from './screens/SearchScreen';

// const MainNavigator = createStackNavigator({
//   Home: {screen: SearchScreen},
//   Profile: {screen: DetailScreen},
// });

// const AppContainer = createAppContainer(MainNavigator);

// // export default AppContainer;
// export default class App extends PureComponent {
//   constructor(props) {
//       super(props);
//   }
//   render() {
//       return <AppContainer />
//   }
// }