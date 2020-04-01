import * as React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

// Importing URLs
import { CHANGE_PASSWORD } from '../../components/Matcher';

// Importing actions
import { logout } from '../SignIn/authentication.action';

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
    inputContainer: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: wp(0.3),
        borderBottomWidth: wp(0.3),
        borderRadius: 32,
        marginVertical: wp(2),
    },
    buttonContainer: {
        flex: 1,
        paddingBottom: hp(5),
        marginHorizontal: wp(3),
        justifyContent: 'flex-end',
    },
})

function ChangePasswordScreen({ authentication, dispatch }) {
    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [repeatedPassword, setRepeatedPassword] = React.useState('');

    const handlePress = React.useCallback(() => {
        fetch(CHANGE_PASSWORD, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authentication.token}`
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
            })
        })
            .then((response) => response.json())
    })

    return (
        <View style={styles.rootView}>
            <Input
                secureTextEntry
                placeholder='Old Password'
                value={oldPassword}
                onChangeText={setOldPassword}
                inputContainerStyle={styles.inputContainer}
            />
            <Input
                secureTextEntry
                placeholder='New Password'
                value={newPassword}
                onChangeText={setNewPassword}
                inputContainerStyle={styles.inputContainer}
            />
            <Input
                secureTextEntry
                placeholder='Repeated New Password'
                value={repeatedPassword}
                onChangeText={setRepeatedPassword}
                inputContainerStyle={styles.inputContainer}
            />
            <Button
                title='Cambia'
                hitSlop={{ top: hp(1), left: wp(1), bottom: hp(1), right: wp(1) }}
                onPress={() => handlePress()}
                containerStyle={styles.buttonContainer}
                buttonStyle={{ borderRadius: 32, backgroundColor: '#70587C' }}
                titleStyle={{ marginVertical: wp(2) }}
            />
        </View>
    )
}

const ChangePasswordConnected = connect(state => ({ authentication: state.authentication }))(ChangePasswordScreen);
export { ChangePasswordConnected as ChangePasswordScreen };