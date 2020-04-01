import * as React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


import { Title, SubTitle, Description } from '../../components/Text';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        marginHorizontal: wp(4),
    },
    sectionContainerView: {
    },
    titleView: {
        marginVertical: hp(1),
    }
});

function SettingsScreen({ authentication }) {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.rootView}>
            {authentication.token &&
                <View style={styles.sectionContainerView}>
                    <Title>Account</Title>
                    <TouchableOpacity style={styles.titleView} onPress={() => { navigation.navigate('ChangePassword') }}>
                        <SubTitle>Modifica account</SubTitle>
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.sectionContainerView}>
                <Title>Notifiche</Title>
            </View>
            <View style={styles.sectionContainerView}>
                <Title>Tema</Title>
            </View>
            <View style={styles.sectionContainerView}>
                <Title>Info</Title>
                <TouchableOpacity style={styles.titleView}>
                    <SubTitle>
                        Informazioni legali e privacy
                    </SubTitle>
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleView}>
                    <SubTitle>Seguici su Facebook</SubTitle>
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleView}>
                    <SubTitle>Segui @SearchMovie Instagram</SubTitle>
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleView}>
                    <SubTitle>Segui @SearchMovie Twitter</SubTitle>
                </TouchableOpacity>
            </View>
            <View style={styles.sectionContainerView}>
                <Title>Version</Title>
                <Description>SearchMovie 1.0.1</Description>
            </View>
        </ScrollView>
    )
}

const SettingsConnected = connect(state => ({ authentication: state.authentication }))(SettingsScreen);
export { SettingsConnected as SettingsScreen };