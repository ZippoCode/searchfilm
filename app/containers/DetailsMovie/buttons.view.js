import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

// Importing from React-Native-Elements
import { Icon, Rating } from 'react-native-elements';

// Importing Actions
import { fetchAsyncFavorites, manageFavorite } from './favorite.action';
import { fetchAsyncVoted, manageVoted } from './voted.action';

// Importing custom components
import { Description } from '../../components/Text';

const styles = StyleSheet.create({
    rootView: {
        paddingVertical: hp(1),
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'baseline',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        marginHorizontal: wp(10),
        paddingVertical: hp(5),
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
    openButton: {
        width: wp(30),
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: hp(3),
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default function Buttons({ movie, token, favorites, voted, dispatch }) {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = React.useState(false);
    const isFavorite = favorites.some(elem => elem.id === movie.id);
    const isVoted = voted.voted.some(elem => elem.id === movie.id);
    const { value_vote } = voted.voted.find((elem) => { return elem.id === movie.id }) || { value_vote: 0 }
    const [valueVote, setValueVote] = React.useState(value_vote);
    const typeRequest = isFavorite ? 'DELETE' : 'PUT';

    React.useEffect(() => {
        const fetchData = async () => {
            if (token) {
                dispatch(fetchAsyncFavorites(token));
                dispatch(fetchAsyncVoted(token));
            }
        };
        fetchData();
    }, []);

    const ratingComplete = (rating) => { setValueVote(rating); }

    const handleFavorite = React.useCallback(() => {
        if (token)
            dispatch(manageFavorite(token, typeRequest, movie.id))
        else
            navigation.navigate('Account')
    });

    const handleVoted = React.useCallback(() => {
        if (token)
            dispatch(manageVoted(token, 'PUT', movie.id, valueVote))
        else
            navigation.navigate('Account')
        setModalVisible(!modalVisible);
    })
    return (
        <View style={styles.rootView}>
            <View style={{ alignItems: 'center' }}>
                <Icon
                    name='star'
                    type='material-community'
                    color='#ffd600'
                />
                <Description>{Math.round(movie.vote_average, 2)} / 10</Description>
                <Description>{movie.vote_counter}</Description>
            </View>
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
                        <Rating showRating ratingCount={10} imageSize={wp(7)} startingValue={valueVote} onFinishRating={ratingComplete} />
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-evenly' }}>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={handleVoted}
                            >
                                <Text style={styles.textStyle}>Vota</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2055C3" }}
                                onPress={() => { setModalVisible(false), setValueVote(value_vote) }}
                            >
                                <Text style={styles.textStyle}>Cancella</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { setModalVisible(true) }} >
                <Icon
                    name={isVoted ? 'star' : 'star-outline'}
                    type='material-community'
                />
                {isVoted && <Description>{value_vote}</Description>}
                <Description>Vota</Description>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFavorite}>
                <Icon
                    name={isFavorite ? 'heart' : 'heart-outline'}
                    type='material-community'
                    color='#C11B17'
                />
                <Description>Preferiti</Description>
            </TouchableOpacity>
        </View >
    )
}

let ButtonViewContainer = connect(state => ({
    token: state.authentication.token,
    favorites: state.favorites.favorites,
    voted: state.voted,
}))(Buttons);
export { ButtonViewContainer as Buttons }