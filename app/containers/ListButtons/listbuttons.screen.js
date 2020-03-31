import * as React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

// Importing from React-Native-Elements
import { Button } from 'react-native-elements';

// Importing custom components
import { SubTitle, Description } from '../../components/Text';

const styles = StyleSheet.create({
    rootView: {
        marginHorizontal: wp(2),
    },
    buttonsView: {
        marginHorizontal: wp(7),
    },
    buttonStyle: {
        borderRadius: 15,
        marginVertical: hp(3),
    },
    buttonGenre: {
        flex: 1,
        width: wp(20),
        height: hp(10),
        marginHorizontal: wp(0.5),
        marginVertical: hp(0.5),
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderRadius: 6,
        borderWidth: wp(0.2),
        backgroundColor: 'transparent',
    },
    genreImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    genreText: {
        textAlign: 'center',
        color: 'white',
        textTransform: 'uppercase'
    }
})

export default function ButtonScreen() {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = React.useState(true);
    const [genres, setGenres] = React.useState([]);

    React.useEffect(() => {
        const fetchAsyncGenres = async () => {
            fetch('http://192.168.1.13:8000/movie/api/genres/')
                .then((response) => response.json())
                .then((responseJson) => {
                    setGenres(responseJson);
                    setIsLoading(false);
                })
                .catch((error) => { console.log(error) })
        }
        fetchAsyncGenres();
    }, []);

    return (
        <View style={styles.rootView}>
            {!isLoading &&
                <FlatList
                    ListHeaderComponent={<HeaderFlatList genres={genres} />}
                    data={genres.slice(0, 8)}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.buttonGenre}
                            onPress={() => navigation.navigate('genre',
                                { type: `topPopular/${item.name}`, title: item.name })
                            }
                        >
                            <Image
                                source={ImageGenre(item.name)}
                                style={styles.genreImage}
                            />
                            <Description style={styles.genreText}>{item.name}</Description>
                        </TouchableOpacity>
                    )}
                />
            }
        </View>
    )
}

function HeaderFlatList(props) {
    const { genres } = props;
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.buttonsView}>
                <Button
                    title='I più popolari'
                    onPress={() => navigation.navigate('topPopular', { type: 'topPopular' })}
                    titleStyle={{ fontSize: 30 }}
                    buttonStyle={styles.buttonStyle}
                />
                <Button
                    title='I più votati'
                    onPress={() => navigation.navigate('topRanking', { type: 'topRanking' })}
                    titleStyle={{ fontSize: 30 }}
                    buttonStyle={styles.buttonStyle}
                />
                <Button
                    title='I più recenti'
                    onPress={() => navigation.navigate('last', { type: 'last' })}
                    titleStyle={{ fontSize: 30 }}
                    buttonStyle={styles.buttonStyle}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: hp(1) }}>
                <SubTitle>Generi Popolari</SubTitle>
                <Description
                    style={{ textAlign: 'right' }}
                    onPress={() => { navigation.navigate('Generi', { genres: genres }) }}
                >
                    Visualizzali tutti
                    </Description>
            </View>
        </View>
    )
}

function ImageGenre(genreName) {
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