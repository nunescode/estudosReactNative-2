import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import DrawerRouter from './src/routes/DrawerRouter';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <DrawerRouter />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
}