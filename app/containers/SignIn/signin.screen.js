import * as React from 'react';
import { connect } from 'react-redux';
import { Keyboard, ImageBackground, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

// Importing from React-Native-Elements
import { SocialIcon } from 'react-native-elements'
import { Input, Button } from 'react-native-elements';

// Import Actions
import { login } from './authentication.action';
import { SubTitle, Description } from '../../components/Text';

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: 'rgba(227,222,223,0.45)',
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
    },
    socialButtonsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp(7),
        marginVertical: hp(3)
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: wp(3),
        marginBottom: hp(3),
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'center'
    }
})


export default function LoginScreen({ authentication, dispatch }) {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { error } = authentication;
    return (
        <ImageBackground source={require('../../assets/img/Login.jpg')} style={styles.backgroundImage}>
            <View style={styles.rootView} onTouchStart={() => Keyboard.dismiss()}>
                <View style={styles.containerView}>
                    <SubTitle style={{ textAlign: 'center', marginVertical: hp(7) }}>
                        Crea il tuo account per accedere a tutte le funzionalità
                    </SubTitle>
                    {error
                        ? <Description style={{ textAlign: 'center', color: 'red' }}>Username o password errati</Description>
                        : <Description></Description>
                    }
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
                    <View style={styles.buttonContainer}>
                        <Button
                            hitSlop={{ top: hp(1), left: wp(1), bottom: hp(1), right: wp(1) }}
                            title='Sign In'
                            onPress={() => dispatch(login(username, password))}
                            buttonStyle={{
                                borderRadius: 32,
                                backgroundColor: '#70587C',
                                width: wp(85),
                                marginVertical: hp(2)
                            }}
                            titleStyle={{ marginVertical: wp(2) }}
                        />
                        <Description>Password dimenticata?</Description>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

const LoginScreenConnected = connect(state => ({ authentication: state.authentication }))(LoginScreen);
export { LoginScreenConnected as LoginScreen }