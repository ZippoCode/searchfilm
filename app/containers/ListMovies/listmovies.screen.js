import 'react-native-gesture-handler';
import * as React from 'react';
import {
    ActivityIndicator, ScrollView, View,
    TouchableOpacity, Image, Text, StyleSheet
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

// Importing custom Hooks
import { useStateMovie } from '../../components/CustomHooks';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContainer: {
        flex: 1,
        width: wp(95),
    },
    itemContainer: {
        flexDirection: 'row',
        marginVertical: hp(0.5),
    },
    posterImage: {
        height: hp(20),
        width: wp(30),
        resizeMode: 'cover'
    },
    containerText: {
        flex: 1,
        flexWrap: 'nowrap',
        marginVertical: hp('1%'),
        marginHorizontal: wp('1%'),
    },
    titleMovieText: {
        fontSize: wp('7%'),
    }
})

export function DetailsItem({ id, navigation }) {
    const movie = useStateMovie(id);

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {
                navigation.navigate('DetailsMovie', { movieID: movie.id, })
            }}
        >
            <Image
                source={{
                    uri: movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : 'https://cdn0.iconfinder.com/data/icons/video-editing/100/5-512.png'
                }}
                style={styles.posterImage} />
            <View style={styles.containerText}>
                <Text style={styles.titleMovieText}>{movie.title}</Text>
                <Text numberOfLines={3}>{movie.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function ListMovieScreen({ route, navigation }) {
    const { listMovies } = route.params || false;
    const { title } = route.params || false
    if (title)
        navigation.setOptions({ title: title })

    return (
        <View style={styles.container}>
            {listMovies
                ? <ScrollView style={styles.scrollViewContainer}>
                    {listMovies.map((movie) =>
                        <DetailsItem key={movie.id} id={movie.id} navigation={navigation} />
                    )}
                </ScrollView>
                : <ActivityIndicator />
            }
        </View>
    )
}
