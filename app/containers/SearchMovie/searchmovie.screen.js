import * as React from 'react';
import { StyleSheet, View, AsyncStorage,  FlatList, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Importing from React-Native-Elements
import { Icon } from 'react-native-elements';
import { SearchBar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

// 
import { SubTitle, Description } from '../../components/Text';

// Import Urls
import { SEARCH_MOVIE } from '../../components/Matcher';
import { ImagePosterMovie } from '../../components/Image';

const styles = StyleSheet.create({
    titleView: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginHorizontal: wp(3),
        marginBottom: hp(3),
    },
    suggestedItemView: {
        flexDirection: 'row',
        height: hp(10),
        marginHorizontal: wp(2),
    },
    imagePoster: {
        height: hp(10),
        width: wp(15),
        resizeMode: 'cover',
    }
})

export default function SearchScreen() {
    const navigation = useNavigation();
    const [query, setQuery] = React.useState('');
    const [suggestedMovie, setSuggestedMovie] = React.useState([]);
    const [searchedMovies, setSearchedMovies] = React.useState([]);

    function handleClick(movie) {
        AsyncStorage.getItem('searched_movie')
            .then((movies) => {
                const moviesArray = movies ? JSON.parse(movies) : [];
                const indexMovie = moviesArray.map(function (m) { return m.id }).indexOf(movie.id)
                if (indexMovie > -1) {
                    moviesArray.splice(indexMovie, 1)
                }
                movie['date_add'] = new Date().getDate();
                moviesArray.push(movie);
                AsyncStorage.setItem('searched_movie', JSON.stringify(moviesArray));
            })
            .catch((error) => console.log('Writing AsyncStorage Error: ', error))
        navigation.navigate('DetailsMovie', { movieID: movie.id, })
    }

    React.useEffect(() => {
        AsyncStorage.getItem('searched_movie')
            .then((movies) => {
                movies ? setSearchedMovies(JSON.parse(movies)) : setSearchedMovies([]);
            })
            .catch((error) => console.log('Reading Store Error: ', error));
    }, []);

    async function clearHistory() {
        try {
            await AsyncStorage.removeItem('searched_movie');
            setSearchedMovies([]);
            return true;
        } catch (error) { return false; }
    }

    React.useEffect(() => {
        if (query.length !== 0)
            fetch(SEARCH_MOVIE.concat(query))
                .then((response) => response.json())
                .then((responseJson) => {
                    setSuggestedMovie(responseJson)
                })
                .catch((error) => { console.log(error) })
    }, [query])

    return (
        <SafeAreaView style={{ flex: 1 }} onTouchStart={() => Keyboard.dismiss()}>
            <SearchBar
                placeholder='Search a movie ...'
                value={query}
                onChangeText={setQuery}
                onCancel={() => setIsLoading(true)}
                containerStyle={{
                    backgroundColor: 'transparent', borderWidth: 0, borderBottomColor: 'transparent', borderTopColor: 'transparent'
                }}
                inputContainerStyle={{ backgroundColor: 'transparent' }}
            />
            {query.length === 0
                ?
                <View style={styles.titleView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name='history' type='material-community' size={wp(6)} iconStyle={{ paddingRight: wp(2) }} />
                        <SubTitle>Recenti</SubTitle>
                    </View>
                    <Description style={{ textAlign: 'right' }} onPress={() => clearHistory()}>Cancella</Description>
                </View>
                : <></>
            }
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={query.length === 0 ? searchedMovies : suggestedMovie}
                renderItem={({ item }) => (
                    <Movie movie={item} onSelect={handleClick} />
                )}
                ItemSeparatorComponent={FlatListItemSeparator}
            />
        </SafeAreaView>
    )
}

function Movie({ movie, onSelect }) {
    return (
        <TouchableOpacity
            style={styles.suggestedItemView}
            onPress={() => onSelect(movie)}
        >
            <ImagePosterMovie
                path={movie.poster_path}
                style={styles.imagePoster}
            />
            <View style={{ flex: 1, alignItems: 'baseline', marginHorizontal: wp(2) }}>
                <SubTitle style={{ fontSize: wp(5) }}>{movie.title}</SubTitle>
                <Description>({new Date(movie.release_date).getFullYear()})</Description>
            </View>
        </TouchableOpacity>
    )
}

function FlatListItemSeparator() {
    return (
        <View
            style={{
                marginVertical: hp(0.5),
                height: hp(0.1),
            }}
        />
    )
}
