import * as React from 'react';
import { connect } from 'react-redux';
import { Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
        alignItems: "center",
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

    const [modalVisible, setModalVisible] = React.useState(false);
    const isFavorite = favorites.some(elem => elem.id === movie.id);
    const isVoted = voted.voted.some(elem => elem.id === movie.id);
    const { value_vote } = voted.voted.find((elem) => { return elem.id === movie.id }) || { value_vote: null }
    const [valueVote, setValueVote] = React.useState();
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
    });

    const handleVoted = React.useCallback(() => {
        if (token)
            dispatch(manageVoted(token, 'PUT', movie.id, valueVote))
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
                        <Rating showRating ratingCount={10} imageSize={wp(7)} onFinishRating={ratingComplete} />
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                            onPress={handleVoted}
                        >
                            <Text style={styles.textStyle}>Vota</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => { setModalVisible(true) }} >
                <Icon
                    name={isVoted ? 'star' : 'star-outline'}
                    type='material-community'
                />
                {value_vote && <Description>{value_vote}</Description>}
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
        </View>
    )
}

let ButtonViewContainer = connect(state => ({
    token: state.authentication.token,
    favorites: state.favorites.favorites,
    voted: state.voted,
}))(Buttons);
export { ButtonViewContainer as Buttons }