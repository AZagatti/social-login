import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {useNavigation} from '@react-navigation/native';

const Auth: React.FC = () => {
  const {navigate} = useNavigation();

  const [data, setData] = useState<AccessToken>({} as AccessToken);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: 'web-client-id',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      navigate('Home', {
        googleInfos: userInfo,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('not_available');
      } else {
        console.log('500');
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const retrieveInfos = () => {
      function responseInfoCallback(error: any, result: any) {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          // console.log('Success fetching data: ' + result.toString());
          console.log(result);
          navigate('Home', {
            faceInfos: result,
          });
        }
      }

      const infoRequest = new GraphRequest(
        '/me?fields=name,email,picture.type(large)',
        {
          accessToken: data.accessToken,
        },
        responseInfoCallback,
      );

      new GraphRequestManager().addRequest(infoRequest).start();
    };
    if (Object.keys(data).length) {
      retrieveInfos();
    }
  }, [data, navigate]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <LoginButton
        style={{width: 240, height: 30}}
        onLoginFinished={(error, result) => {
          if (error) {
            console.log('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.log('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then((values) => {
              if (values) {
                setData(values);
                console.log(values);
                console.log(values?.accessToken.toString());
              }
            });
          }
        }}
        onLogoutFinished={() => console.log('logout.')}
      />

      <GoogleSigninButton
        style={{width: 250, height: 50, marginTop: 50}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

export default Auth;
