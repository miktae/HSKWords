import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Quiz from './screens/Quiz';
import Test from './screens/Test';
import { useRefresh } from './screens/store';
import { Pressable, Text } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const refresh = useRefresh(state => state.refresh);
  const setRefresh = useRefresh(state => state.setRefresh);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"
          options={({ navigation }) => ({
            headerTitle: () => (
              <Pressable onPress={() => {
                // console.log("Refresh");
                setRefresh(!refresh)}}>
                <Text style={{ fontWeight: 600, fontSize: 18 }}>
                  Home
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
