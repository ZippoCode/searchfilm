import * as React from 'react';
import {
    StyleSheet, View, ScrollView,
    ActivityIndicator, TouchableOpacity, RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Parts of Screen
import { Buttons } from './buttons.view';
import Details from './details.view';
import Genres from './genres.view';
import { Keywords } from './keywords.view';

// Import custom Components
import { Title, SubTitle, Description } from '../../components/Text';
import { ImagePosterMovie, ImagePerson } from '../../components/Image';

// Importing URL
import { GET_MOVIE } from '../../components/Matcher';

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    descriptionMovie: {
        flex: 1,
        flexWrap: 'nowrap',
        paddingHorizontal: wp(3)
    },
    scrollViewContainer: {
        flex: 1,
        marginHorizontal: wp(4),
        marginBottom: hp(1),
    },
    posterImage: {
        height: hp(30),
        width: wp(40),
        resizeMode: 'cover',
    },
})

export default function DetailsMovie({ route }) {
    const navigation = useNavigation();
    const { movieID } = route.params
    const [isLoading, setIsLoading] = React.useState(true);
    const [movie, setMovie] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetch(GET_MOVIE.concat(movieID).concat('/'))
            .then((response) => response.json())
            .then((responseJson) => {
                setMovie(responseJson);
                setIsLoading(false);
                setRefreshing(false);
            })
            .catch((error) => { console.log(error) });
    }, [refreshing]);

    React.useEffect(() => {
        const fetchAsyncData = async () => {
            fetch(GET_MOVIE.concat(movieID).concat('/'))
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
                    <ScrollView
                        style={styles.scrollViewContainer}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    >
                        <Title>{movie.title}</Title>
                        <SubTitle>{new Date(movie.release_date).getFullYear()}</SubTitle>
                        <Genres genres={movie.genres} />
                        <View style={{ flexDirection: 'row', paddingVertical: hp(1) }}>
                            <ImagePosterMovie
                                path={movie.poster_path}
                                style={styles.posterImage}
                            />
                            <Description style={styles.descriptionMovie} numberOfLines={9}> {movie.description}</Description>
                        </View>
                        <Buttons movie={movie} />
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                                <SubTitle>Cast</SubTitle>
                                <Description
                                    style={{ textAlign: 'right' }}
                                    onPress={() => navigation.navigate('FullCast', { actors: movie.actors })}
                                >
                                    Visualizza tutti
                                </Description>
                            </View>
                            <ScrollView horizontal>
                                {movie.actors.map((item) =>
                                    <TouchableOpacity
                                        key={item.id}
                                        style={{ width: wp(25), marginHorizontal: wp(1), height: hp(27) }}
                                        onPress={() => {
                                            navigation.navigate('DetailsPerson', { personID: item.id, })
                                        }}>
                                        <ImagePerson
                                            path={item.profile_img}
                                            style={{
                                                width: wp(25),
                                                height: hp(20),
                                                resizeMode: 'cover',
                                            }}
                                        />
                                        <Description numberOfLines={2}>{item.name}</Description>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>
                        <Details movie={movie} />
                        <Keywords movie={movie} />
                    </ScrollView>
                )
                : (<ActivityIndicator />)
            }
        </View >
    );
}