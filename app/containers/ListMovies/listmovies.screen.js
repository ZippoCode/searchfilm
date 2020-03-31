import * as React from 'react';
import {
    ActivityIndicator, FlatList, View,
    TouchableOpacity, Image, StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { useStateMovie } from '../../components/CustomHooks';

import { SubTitle, Description } from '../../components/Text';

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
    textView: {
        flex: 1,
        flexWrap: 'nowrap',
        marginVertical: hp('1%'),
        marginHorizontal: wp('1%'),
    },
})

export function DetailsItem({ idMovie }) {
    const navigation = useNavigation();
    const movie = useStateMovie(idMovie)

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => { navigation.navigate('DetailsMovie', { movieID: movie.id, }) }}
        >
            <Image
                source={{
                    uri: movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : 'https://cdn0.iconfinder.com/data/icons/video-editing/100/5-512.png'
                }}
                style={styles.posterImage} />
            <View style={styles.textView}>
                <SubTitle>{movie.title}</SubTitle>
                <Description numberOfLines={3}>{movie.description}</Description>
            </View>
        </TouchableOpacity>
    )
}

export default function ListMovieScreen({ route }) {
    const { type, title, listDefault } = route.params || { type: false, title: false, listDefault: [] };
    const navigation = useNavigation();
    const [listMovies, setListMovies] = React.useState(listDefault);
    const [numPage, setNumPage] = React.useState(2);

    if (title)
        navigation.setOptions({ title: title })

    React.useEffect(() => {
        if (type)
            fetch(`http://192.168.1.13:8000/movie/api/${type}/`)
                .then((response) => response.json())
                .then((responseJson) => {
                    setListMovies(responseJson.results);
                })
                .catch((error) => { console.log(error) })
    }, []);

    function onLoadMore() {
        if (type)
            fetch(`http://192.168.1.13:8000/movie/api/${type}/?page=${numPage}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.results) {
                        setListMovies(listMovies.concat(responseJson.results));
                        setNumPage(numPage + 1);
                    }
                })
                .catch((error) => { console.log(error) })
    }

    return (
        <View style={styles.container}>
            {listMovies
                ? <FlatList
                    style={styles.scrollViewContainer}
                    data={listMovies}
                    onEndReached={() => onLoadMore()}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <DetailsItem idMovie={item.id} />
                    )}
                />
                : <ActivityIndicator />
            }
        </View>
    )
}
