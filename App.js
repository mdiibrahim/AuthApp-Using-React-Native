import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import LoginScreen from "./screens/LoginScreen";
import ContactsScreen from "./src/screens/ContactsScreen";
import ContactDetailsScreen from "./src/screens/ContactDetailsScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
