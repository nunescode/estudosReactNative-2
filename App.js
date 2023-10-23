import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import DrawerRouter from '../meu-app/src/routes/DrawerRouter';

export default function App() {
  return (
    <PaperProvider>
      {/** <Router /> */}
      <DrawerRouter/>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});