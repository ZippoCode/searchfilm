import * as React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Importing custom Hooks
import { useStateMovie } from './CustomHooks';

// Importing custom components
import { SubTitle, Description } from './Text';


function ImageMovie({ id }) {
    const movie = useStateMovie(id);

    return (
        <>
            {movie
                ?
                <View style={{ flex: 1, marginRight: wp(1), width: wp(35), alignItems: 'center' }}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                        style={{
                            width: wp(35),
                            height: hp(25),
                            resizeMode: 'stretch',
                        }}
                    />
                    <Description style={{ flex: 0.5 }} numberOfLines={2}>{movie.title}</Description>
                </View>

                : <ActivityIndicator />
            }
        </>
    )
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        marginVertical: hp(1),
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    movieTouchableOpacity: {
        paddingVertical: hp(1)
    },
})

export default function ScrollViewMovies({ title, movies }) {
    const navigation = useNavigation();

    return (
        <View style={styles.rootView} >
            <View style={styles.titleView}>
                <SubTitle>{title}</SubTitle>
                <Description
                    style={{ fontSize: wp(4), fontWeight: '400' }}
                    onPress={() => {
                        navigation.navigate('ListMovies', { listDefault: movies })
                    }}
                >
                    Vedi tutto
                </Description>
            </View>
            <FlatList horizontal
                keyExtractor={(item, index) => index.toString()}
                style={styles.movieTouchableOpacity}
                data={movies}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('DetailsMovie', { movieID: item.id, })
                        }}>
                        <ImageMovie id={item.id} />
                    </TouchableOpacity>
                )}
            >
            </FlatList>
        </ View >
    )
}