import * as React from 'react';
import { connect } from 'react-redux';
import { Keyboard, ImageBackground, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

// Importing from React-Native-Elements
import { SocialIcon } from 'react-native-elements'
import { Input, Button } from 'react-native-elements';

// Import Actions
import { login } from './authentication.action';
import { Description } from '../../components/Text';

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    containerView: {
        flex: 1,
        marginHorizontal: wp(5),
    },
    placeholderInput: {
        marginHorizontal: wp(4),
        alignItems: 'flex-start',
        marginVertical: hp(1),
    },
    inputContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: wp(0.3),
        borderBottomWidth: wp(0.3),
        borderRadius: 32,
        marginVertical: wp(2),
        opacity: 0.9
    },
    socialButtonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(7),
        marginVertical: hp(7)
    },
    buttonLogin: {
        flex: 1,
        paddingBottom: hp(5),
        justifyContent: 'flex-end',
    },
})


export default function LoginScreen({ dispatch }) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.rootView} onTouchStart={() => Keyboard.dismiss()}>
            <ImageBackground source={require('../../assets/img/Login.jpg')} style={styles.backgroundImage}>
                <View style={styles.containerView}>
                    <Description style={{ textAlign: 'center', marginVertical: wp(15) }}>
                        Crea il tuo account per accedere a tutte le funzionalità
                    </Description>
                    <Input
                        keyboardType='email-address'
                        placeholder='Email o username'
                        value={username}
                        onChangeText={setUsername}
                        leftIcon={{ type: 'material-community', name: 'email-outline' }}
                        leftIconContainerStyle={styles.placeholderInput}
                        inputContainerStyle={styles.inputContainer}

                    />
                    <Input
                        secureTextEntry
                        placeholder='Password'
                        value={password}
                        onChangeText={setPassword}
                        leftIcon={{ type: 'material-community', name: 'lock-outline' }}
                        leftIconContainerStyle={styles.placeholderInput}
                        inputContainerStyle={styles.inputContainer}
                    />
                    <View style={styles.socialButtonsView}>
                        <SocialIcon type='google' title='Loggati con Google' />
                        <SocialIcon type='facebook' title='Loggati con Facebook' />
                        <SocialIcon type='instagram' title='Loggati con Instagram' />
                        <SocialIcon type='twitter' title='Loggati con Twitter' />
                    </View>
                    <Button
                        hitSlop={{ top: hp(1), left: wp(1), bottom: hp(1), right: wp(1) }}
                        title='Sign In'
                        onPress={() => dispatch(login(username, password))}
                        containerStyle={styles.buttonLogin}
                        buttonStyle={{ borderRadius: 32 }}
                        titleStyle={{ marginVertical: wp(2) }}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

const LoginScreenConnected = connect()(LoginScreen);
export { LoginScreenConnected as LoginScreen }