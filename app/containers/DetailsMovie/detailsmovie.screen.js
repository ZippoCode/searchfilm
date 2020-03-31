import * as React from 'react';
import {
    StyleSheet, View, ScrollView,
    ActivityIndicator, Image, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Parts of Screen
import { Buttons } from './buttons.view';
import Details from './details.view';
import Genres from './genres.view';

// Import custom Components
import { Title, SubTitle, Description } from '../../components/Text';

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContainer: {
        flex: 1,
        width: wp(95),
    },
    posterImage: {
        height: hp(28),
        width: wp(39),
        resizeMode: 'cover',
    },
})

export default function DetailsMovie({ route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [movie, setMovie] = React.useState('');
    const navigation = useNavigation();

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
                        <Title>{movie.title}</Title>
                        <SubTitle>{new Date(movie.release_date).getFullYear()}</SubTitle>
                        <Genres genres={movie.genres} />
                        <View style={{ flexDirection: 'row', paddingVertical: hp(1) }}>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
                                style={styles.posterImage} />
                            <Description style={{ flex: 1, flexWrap: 'nowrap' }} numberOfLines={9} > {movie.description}</Description>
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
                                        <Description numberOfLines={2}>{item.name}</Description>
                                    </TouchableOpacity>
                                )}
                            </ScrollView>
                        </View>
                        <Details movie={movie} />
                    </ScrollView>
                )
                : (<ActivityIndicator />)
            }
        </View >
    );
}