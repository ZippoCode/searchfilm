import * as React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


import { Title, SubTitle, Description } from '../../components/Text';

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
})
export function SettingsScreen() {

    return (
        <ScrollView style={styles.rootView}>
            <View style={styles.sectionContainerView}>
                <Title>Account</Title>
                <TouchableOpacity style={styles.titleView}>
                    <SubTitle>Modifica account</SubTitle>
                </TouchableOpacity>
            </View>
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