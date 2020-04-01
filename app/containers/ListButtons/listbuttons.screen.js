import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';

// Importing from React-Native-Elements
import { Button } from 'react-native-elements';

// Importing custom components
import { SubTitle, Description } from '../../components/Text';
import { ImageGenre } from './imageGenre.view';

// Import Urls
import { GET_GENRES } from '../../components/Matcher';

const styles = StyleSheet.create({
    rootView: {
        marginHorizontal: wp(2),
    },
    buttonsView: {
        marginHorizontal: wp(7),
    },
    buttonStyle: {
        borderRadius: 32,
        marginVertical: hp(2),
        backgroundColor: '#70587C',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    }
})

export default function ButtonScreen() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [genres, setGenres] = React.useState([]);

    React.useEffect(() => {
        const fetchAsyncGenres = async () => {
            fetch(GET_GENRES)
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
                keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={<HeaderFlatList genres={genres} />}
                    data={genres.slice(0, 8)}
                    numColumns={2}
                    renderItem={({ item }) => (<ImageGenre item={item} />)}
                />
            }
        </View>
    )
}

function HeaderFlatList(props) {
    const { genres } = props;
    const navigation = useNavigation();

    React.useEffect(() => {

    });

    return (
        <View>
            <View style={styles.buttonsView}>
                <Button
                    title='Film più popolari'
                    onPress={() => navigation.navigate('topPopular', { type: 'topPopular' })}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ marginVertical: wp(2) }}
                />
                <Button
                    title='Film più votati'
                    onPress={() => navigation.navigate('topRanking', { type: 'topRanking' })}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ marginVertical: wp(2) }}
                />
                <Button
                    title='Film più recenti'
                    onPress={() => navigation.navigate('last', { type: 'last' })}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ marginVertical: wp(2) }}
                />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginVertical: hp(1) }}>
                <SubTitle>Generi Popolari</SubTitle>
                <Description
                    style={{ textAlign: 'right' }}
                    onPress={() => { navigation.navigate('Generi', { genres: genres }) }}
                >
                    Vedi tutto
                    </Description>
            </View>
        </View>
    )
}