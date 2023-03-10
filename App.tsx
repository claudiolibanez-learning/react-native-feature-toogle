import { useState, useEffect } from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  Pressable,
  Text
} from 'react-native';
import remoteConfig from '@react-native-firebase/remote-config';

export default function App() {
  const [showButtonFlag, setShowButtonFlag] = useState(false);
  const [titleButtonText, setTitleButtonText] = useState('');

  async function fetchRemoteConfig() {
    await remoteConfig()
      .setConfigSettings({
        minimumFetchIntervalMillis: 3000, // 3 seconds; default is 12 hours
      });

    await remoteConfig().setDefaults({
      show_button_toggle: false,
      title_button_text: '',
    });

    await remoteConfig().fetchAndActivate();

    // const showButton = remoteConfig()
    //   .getValue('show_button_toggle')
    //   .asBoolean();

    const { show_button_toggle, title_button_text } = remoteConfig().getAll();

    setShowButtonFlag(show_button_toggle.asBoolean());
    setTitleButtonText(title_button_text.asString());
  }

  useEffect(() => {
    fetchRemoteConfig();
  }, []);

  return (
    <>
      <StatusBar
        barStyle='dark-content'
        backgroundColor="transparent"
        translucent
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text>Hello World!</Text>
        </View>
        {showButtonFlag && (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>{titleButtonText}</Text>
            </Pressable>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});
