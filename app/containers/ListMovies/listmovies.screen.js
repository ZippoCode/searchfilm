import * as React from 'react';
import {
    ActivityIndicator, FlatList, View,
    TouchableOpacity, StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Custom Components
import { useStateMovie } from '../../components/CustomHooks';
import { SubTitle, Description } from '../../components/Text';
import { ImagePosterMovie } from '../../components/Image';

// Import Urls
import { GET_LIST } from '../../components/Matcher';

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
            <ImagePosterMovie
                path={movie.poster_path}
                style={styles.posterImage}
            />
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
            fetch(GET_LIST.concat(type).concat('/'))
                .then((response) => response.json())
                .then((responseJson) => {
                    setListMovies(responseJson.results);
                })
                .catch((error) => { console.log(error) })
    }, []);

    function onLoadMore() {
        if (type)
            fetch(GET_LIST.concat(type).concat('/?page='.concat(numPage)))
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
