import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Quiz from './screens/Quiz';
import Test from './screens/Test';
import { useRefresh, toggleDarkMode } from './screens/store';
import { Pressable, Text } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const refresh = useRefresh(state => state.refresh);
  const setRefresh = useRefresh(state => state.setRefresh);
  const isDarkMode = toggleDarkMode(state => state.isDarkMode);
  const setDarkMode = toggleDarkMode(state => state.setDarkMode);

  const backgroundColor = isDarkMode ? '#121212' : '#fff';
  const color = isDarkMode ? '#fafafa' : '#000';

  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Home"
          options={({ navigation }) => ({
            headerTitle: () => (
              <Pressable onPress={() => {
                // console.log("Refresh");
                setRefresh(!refresh)
              }}>
                <Text style={{ fontWeight: 600, fontSize: 18 }}>
                  Home
                </Text>
              </Pressable>
            ),
            headerRight: () => (
              <Pressable onPress={() => setDarkMode(!isDarkMode)}>
                <Text style={{ fontWeight: 600, fontSize: 18, padding: 12,
                   marginRight: 10, backgroundColor, color }}>
                  {isDarkMode ? 'Light mode' : 'Dark mode'}
                </Text>
              </Pressable>
            ),
          })}
          component={Home} />
        <Stack.Screen name="Questions" component={Quiz} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

