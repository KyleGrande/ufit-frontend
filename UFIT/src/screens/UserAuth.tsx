import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./UserAuthStack/LoginScreen";
import Signup from "./UserAuthStack/SignupScreen";

export type StackParamList = {
    Login: { setIsLoggedIn: (value: boolean) => void };
    Signup: undefined;
}

export interface UserAuthProps {
    setIsLoggedIn?: (value: boolean) => void;
}

const AuthStack = createNativeStackNavigator();

export default function UserAuth() {
    
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }
        }
        >
        <AuthStack.Screen 
            name="Login" 
            component={Login} 
            // initialParams={{ setIsLoggedIn: setIsLoggedIn }} 
        />            
        <AuthStack.Screen name="Signup" component={Signup} />
        </AuthStack.Navigator>
    );
}



