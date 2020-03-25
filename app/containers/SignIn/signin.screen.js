import 'react-native-gesture-handler';
import * as React from 'react';

import { View, StyleSheet } from 'react-native';

import { AuthContext } from './signin.navigation';

// Importing from React-Native-Elements
import { SocialIcon } from 'react-native-elements'
import { Input, Text, Button } from 'react-native-elements';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    rootView: {
    },
    loginView: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: hp(4),
        marginHorizontal: wp(5),
    },
    placeholderInput: {
        marginHorizontal: wp(4)
    },
    buttonLogin: {
        width: '100%',
        paddingTop: hp(4),
    },
    socialButtonsView: {
        justifyContent: 'flex-end'
    }
})


export default function LoginScreen() {
    const { signIn } = React.useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.rootView}>
            <View style={styles.loginView}>
                <Text style={{ fontSize: wp(6) }}>Effettua il Login</Text>
                <Input
                    placeholder='E-Mail o Username'
                    value={username}
                    onChangeText={setUsername}
                    leftIcon={{ type: 'material-community', name: 'email-outline' }}
                    leftIconContainerStyle={styles.placeholderInput}
                />
                <Input
                    secureTextEntry
                    placeholder='Password'
                    value={password}
                    onChangeText={setPassword}
                    leftIcon={{ type: 'material-community', name: 'lock-outline' }}
                    leftIconContainerStyle={styles.placeholderInput}
                />
                <Button
                    title='Login'
                    onPress={() => signIn({ username, password })}
                    containerStyle={styles.buttonLogin}
                />
            </View>
            <View style={styles.socialButtonsView}>
                <SocialIcon type='facebook' title='Loggati con Facebook' button />
                <SocialIcon type='instagram' title='Loggati con Instagram' button />
                <SocialIcon type='twitter' title='Loggati con Twitter' button />
            </View>
        </View>
    )
}