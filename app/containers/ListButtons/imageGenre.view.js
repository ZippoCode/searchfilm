import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

import { Description } from '../../components/Text';

const styles = StyleSheet.create({
    buttonGenre: {
        flex: 1,
        width: wp(20),
        height: hp(10),
        marginHorizontal: wp(0.5),
        marginVertical: hp(0.5),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        
    },
    genreImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    genreText: {
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase'
    }
});

export function ImageGenre({ item }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={styles.buttonGenre}
            onPress={() => navigation.navigate('genre',
                { type: `topPopular/${item.name}`, title: item.name })
            }
        >
            <Image
                source={ImageSource(item.name)}
                style={styles.genreImage}
            />
            <Description style={styles.genreText}>{item.name}</Description>
        </TouchableOpacity>
    )
}

const ImageSource = (genreName) => {
    switch (genreName) {
        case 'Action':
            return require('../../assets/img/Action.jpg')
        case 'Adventure':
            return require('../../assets/img/Adventure.jpg')
        case 'Comedy':
            return require('../../assets/img/Comedy.jpg')
        case 'Crime':
            return require('../../assets/img/Crime.jpg')
        case 'Drama':
            return require('../../assets/img/Drama.jpg')
        case 'Horror':
            return require('../../assets/img/Horror.jpg')
        case 'Mystery':
            return require('../../assets/img/Mystery.jpg')
        case 'Thriller':
            return require('../../assets/img/Thriller.jpg')
        default:
            return require('../../assets/img/Crime.jpg')
    }
}