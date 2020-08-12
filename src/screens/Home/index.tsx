import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

// import { Container } from './styles';

interface Params {
  key: string;
  name: string;
  params: {
    faceInfos: {
      id: string;
      name: string;
      picture: {
        data: {
          url: string;
        };
      };
    };
    googleInfos: {
      idToken: string;
      scopes: string[];
      serverAuthCode: string;
      user: {
        email: string;
        familyName: string;
        givenName: string;
        id: string;
        name: string;
        photo: string;
      };
    };
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatar: {
    width: 200,
    height: 200,
  },
});

const Home: React.FC = () => {
  const {navigate} = useNavigation();
  const route = useRoute<Params>();
  const {faceInfos, googleInfos} = route.params;

  useEffect(() => {
    if (!faceInfos && !googleInfos) {
      navigate('Auth');
    }
  }, [navigate, faceInfos, googleInfos]);

  if (faceInfos) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{faceInfos.name}</Text>
        <Image
          style={styles.avatar}
          source={{uri: faceInfos.picture.data.url}}
        />
      </View>
    );
  }

  if (googleInfos) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{googleInfos.user.name}</Text>
        <Text style={styles.text}>{googleInfos.user.email}</Text>
        <Image style={styles.avatar} source={{uri: googleInfos.user.photo}} />
      </View>
    );
  }

  return <View />;
};

export default Home;
