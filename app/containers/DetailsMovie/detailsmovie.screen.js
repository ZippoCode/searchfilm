import * as React from 'react';
import {
    StyleSheet, Text, View, ScrollView,
    ActivityIndicator, Image, useWindowDimensions, PixelRatio, TouchableOpacity
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

function fromDateToString(data_row) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var data = new Date(data_row);
    return data.getDate() + ' ' + monthNames[data.getMonth()] + ' ' + data.getFullYear();
}

// Importing from React-Native-elements
import { Button } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { Icon } from 'react-native-elements'

var FONT_SIZE = {
    TITLE: 34,
    TITLE_SECTION: 28,
    SUBTITLE_SECTION: 24,
    DESCRIPTION: 18,
}

if (PixelRatio.get() <= 2) {
    FONT_SIZE.TITLE = 32;
    FONT_SIZE.TITLE_SECTION = 26;
    FONT_SIZE.SUBTITLE_SECTION = 22;
    FONT_SIZE.DESCRIPTION = 16;
}

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContainer: {
        flex: 1,
        width: wp(95),
        marginTop: hp(1),
    },
    titleText: {
        fontSize: wp(9),
        fontWeight: 'bold',
    },
    subtitleView: {
        flexDirection: 'row',
        marginVertical: hp(1),
    },
    subtitleText: {
        fontSize: wp(5),
    },
    genreButton: {
        marginRight: wp(0.8),
    },
    posterImage: {
        height: hp(28),
        width: wp(39),
        resizeMode: 'cover',
    },
    descriptionText: {
        flex: 1,
        paddingHorizontal: wp(2),
        fontSize: wp(4),
        flexWrap: 'nowrap',
    },
    infoText: {
        paddingBottom: hp(0.5),
        fontSize: wp(4)
    }
})

function timeConvert(time) {
    var hours = Math.floor(time / 60);
    var minutes = Math.round(((time / 60) - hours) * 60);
    if (minutes !== 0)
        return hours + ' h ' + minutes + ' min';
    return hours + ' h'
}

/*
mport { mdiHeartOutline } from '@mdi/js'; (vuoto no preferiti)
import { mdiHeart } from '@mdi/js'; (pieno per preferiti)
import { mdiStarOutline } from '@mdi/js'; (per votare)
import { mdiStar } from '@mdi/js'; (voto)
import { mdiCogOutline } from '@mdi/js'; (ingranaggio)
*/

export default function DetailsMovie({ route, navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [movie, setMovie] = React.useState('');

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    React.useEffect(() => {
        const fetchAsyncData = async () => {
            const params = route.params
            fetch(`http://192.168.1.13:8000/movie/api/get/${JSON.stringify(params.movieID)}/`)
                .then((response) => response.json())
                .then((responseJson) => {
                    setMovie(responseJson);
                    setIsLoading(false);
                }, function () { })
                .catch((error) => { console.log(error) });
        };
        fetchAsyncData();
    }, []);

    return (
        <View style={styles.rootView}>
            {!isLoading
                ? (
                    <ScrollView style={styles.scrollViewContainer}>
                        <Text style={styles.titleText}>{movie.title}</Text>
                        <Text style={styles.subtitleText}>{new Date(movie.release_date).getFullYear()}</Text>
                        <View style={styles.subtitleView}>
                            {movie.genres.map((genre) =>
                                <Button
                                    title={genre.name}
                                    type="outline"
                                    style={styles.genreButton}
                                    onPress={() => { navigation.navigate('genre')}}
                                />
                            )}
                        </View>
                        <View style={{ flexDirection: 'row', paddingVertical: hp(1) }}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                                style={styles.posterImage} />
                            <Text
                                numberOfLines={9}
                                style={styles.descriptionText}
                            >
                                {movie.description}
                            </Text>
                        </View>
                        <View style={{ paddingVertical: hp(1), flexDirection: 'row', justifyContent: 'space-around' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Icon
                                    name='star'
                                    type='material-community'
                                    color='#ffd600'
                                    size={31}
                                />
                                <Text>{Math.round(movie.vote_average, 2)} / 10</Text>
                                <Text>{movie.vote_counter}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Icon
                                    name='star-outline'
                                    type='material-community'
                                    size={31}
                                />
                                <Text>Vota</Text>
                            </View>
                            <View>
                                <Icon
                                    name='heart-outline'
                                    type='material-community'
                                    size={31}
                                />
                                <Text>Preferiti</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', paddingRight: 16 }}>
                                <Text style={{ fontSize: FONT_SIZE.TITLE_SECTION, }}>Cast</Text>
                                <View style={{ flex: 1 }}>
                                    <Text
                                        style={{ textAlign: 'right' }}
                                        onPress={() => navigation.navigate('FullCast', {
                                            actors: movie.actors,
                                        })}>
                                        Visualizza tutti
                                        </Text>
                                </View>
                            </View>
                            <ScrollView horizontal>
                                {movie.actors.map((item) =>
                                    <TouchableOpacity
                                        style={{ width: wp(25), marginHorizontal: wp(1), height: hp(27) }}
                                        onPress={() => {
                                            navigation.navigate('DetailsPerson', { personID: item.id, })
                                        }}>
                                        <Image
                                            source={{
                                                uri: item.profile_img
                                                    ? `https://image.tmdb.org/t/p/w500/${item.profile_img}`
                                                    : 'https://lh3.googleusercontent.com/proxy/FxG7qwZWaJku5ijqFaQJ1YAIv9_eyIIff3iGYEyR1pDoHuecsrvHs9pTykMN_OB27mm58nyjGKMyXMq0HOiCYJ9R1wJf75zC9_saOVK93zORYBrjT1K0CQmsB086h0bZyIdYxMOYCvdp'
                                            }}
                                            style={{
                                                width: wp(25),
                                                height: hp(20),
                                                resizeMode: 'cover',
                                            }} />
                                        <Text numberOfLines={2} style={{ fontSize: wp(4) }}>{item.name}</Text>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                            <Text style={{ fontSize: FONT_SIZE.TITLE_SECTION }}>Regista</Text>
                            {movie.directors.map((director) =>
                                <Text
                                    style={{ fontSize: wp(4) }}
                                    onPress={() => {
                                        navigation.navigate('DetailsPerson', {
                                            personID: director.id,
                                        })
                                    }}>
                                    {director.name}
                                </Text>
                            )}
                        </View>
                        <View style={{ paddingVertical: hp(2) }}>
                            <Text style={{ fontSize: FONT_SIZE.TITLE_SECTION }}>Descrizione</Text>
                            <Text style={{ fontSize: FONT_SIZE.DESCRIPTION }}>{movie.description}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: FONT_SIZE.TITLE_SECTION }}>Dettagli</Text>
                            <Text style={styles.infoText}>Data di rilascio: {fromDateToString(movie.release_date)}</Text>
                            <Text style={styles.infoText}>Titolo originale: {movie.original_title}</Text>
                            <Text style={styles.infoText}>Lingua originale: {movie.original_language}</Text>
                            <Text style={styles.infoText}>Durata: {timeConvert(movie.runtime)}</Text>
                        </View>
                    </ScrollView>
                )
                : (<ActivityIndicator />)
            }
        </View>
    );

}
