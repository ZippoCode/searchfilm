import * as React from 'react';
import { connect } from 'react-redux';
import { FlatList, Modal, StyleSheet, Text, TouchableHighlight, View, Keyboard, } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';


import { KEYWORDS } from '../../components/Matcher';
const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: hp(30),
        marginHorizontal: wp(5),
    },
    modalView: {
        paddingVertical: hp(3),
        paddingHorizontal: wp(5),
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    keywordButton: {
        borderRadius: 32,
        paddingHorizontal: wp(3),
        paddingVertical: hp(1),
        marginVertical: hp(0.5),
        elevation: 2,
        backgroundColor: '#70587C',
    },
    openButton: {
        borderRadius: 20,
        padding: wp(2),
        elevation: 2,
        marginVertical: hp(1),
    },
    textStyle: {
        color: "white",
        textAlign: "center",
    },
    buttonStyle: {
        borderRadius: 32,
        marginVertical: hp(2),
        marginHorizontal: wp(25),
        backgroundColor: '#70587C',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    }
});

function Tag({ keyword }) {
    const [clicked, setClicked] = React.useState(false);
    const [count, setCount] = React.useState(keyword.count);

    function handleClick() {
        if (clicked) { setCount(count - 1); setClicked(false); }
        else { setCount(count + 1); setClicked(true); }
    }

    return (
        <TouchableHighlight
            style={{
                ...styles.keywordButton,
                backgroundColor: clicked ? '#70587C' : '#E3DEDF',
            }}
            onPress={() => handleClick()}
        >
            <Text style={{
                ...styles.textStyle,
                color: clicked ? 'white' : 'black'
            }}>
                {keyword.text}: {count}
            </Text>
        </TouchableHighlight>
    )
}

function Keywords({ authentication, movie }) {
    const [modalVisible, setModalVisible] = React.useState(false);
    const navigation = useNavigation();

    function handleClick() {
        if (!authentication.token) {
            navigation.navigate('Account');
        } else {
            setModalVisible(true)
        }
    }

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {movie.keywords.map((item) =>
                                <Tag key={item.id} keyword={item}  />
                            )}
                        </View>
                        <TouchableHighlight
                            style={{
                                ...styles.openButton, backgroundColor: "#70587C",
                                paddingVertical: wp(4),
                                borderRadius: 32,
                                marginHorizontal: wp(20)
                            }}
                            onPress={() => { setModalVisible(false) }}
                        >
                            <Text style={styles.textStyle}>Conferma</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <Button
                title='Modifica Tags'
                onPress={() => handleClick()}
                buttonStyle={styles.buttonStyle}
            />
        </View >
    )
}

const KeywordsConnected = connect(state => ({ authentication: state.authentication }))(Keywords);
export { KeywordsConnected as Keywords };