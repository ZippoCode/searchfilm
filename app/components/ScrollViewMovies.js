import * as React from 'react';

import { View, ScrollView, Image, TouchableOpacity, useWindowDimensions } from 'react-native';

// Importing from React-Native-Elements
import { Text } from 'react-native-elements';

// Importing custom Hooks
import { useStateMovie } from './CustomHooks';


function ImageMovie({ id }) {
    const movie = useStateMovie(id);
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    return (
        <>
            {movie
                ? <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                    style={{
                        width: windowWidth * 0.3,
                        height: windowHeight * 0.2,
                        resizeMode: 'cover',
                    }}
                />
                : <></>
            }
        </>
    )
}

export default function ScrollViewMovies({ title, movies, navigation }) {

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', paddingRight: 16 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 24, fontWeight: '700' }}>{title}</Text>
                </View>
                <View style={{ flex: 1, alignContent: 'flex-end' }}>
                    <Text
                        style={{ textAlign: 'right', fontWeight: '400', color: 'blue' }}
                        onPress={() => {
                            navigation.navigate('ListMovies', {
                                listMovies: movies,
                            })
                        }}
                    >
                        Vedi tutto
                    </Text>
                </View>
            </View>
            <ScrollView horizontal>
                {movies.map((movie) =>
                    <TouchableOpacity
                        key={movie.id}
                        style={{ width: windowWidth * 0.31, height: windowHeight * 0.2 }}
                        onPress={() => {
                            navigation.navigate('DetailsMovie', {
                                movieID: movie.id,
                            })
                        }}>
                        <ImageMovie id={movie.id} />
                        <Text numberOfLines={2}>{movie.title}</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}