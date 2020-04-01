import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Importing from React-Navite-Elements
import { Button } from 'react-native-elements';


const styles = StyleSheet.create({
    rootView: {
        marginHorizontal: wp(2),
    },
    buttonsView: {
        marginHorizontal: wp(7),
    },
    buttonStyle: {
        borderRadius: 32,
        marginBottom: hp(1),
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

const sortGenres = (genres) => {
    genres.sort(function (genreOne, genreTwo) {
        var one = genreOne.name.toUpperCase();
        var two = genreTwo.name.toUpperCase();
        if (one < two) { return -1; }
        if (one > two) { return 1; }
        return 0;
    });
    return genres;
}

export default function ListGenresScreen({ route }) {
    const { genres } = route.params;
    const navigation = useNavigation();
    return (
        <View style={{ paddingHorizontal: 8 }}>
            <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={sortGenres(genres)}
                renderItem={({ item }) => (
                    <Button
                        title={item.name}
                        titleStyle={{ fontSize: 25 }}
                        buttonStyle={styles.buttonStyle}
                        onPress={() => navigation.navigate('genre', { type: `topPopular/${item.name}`, title: item.name })}
                    />
                )}
            />
        </View>
    )
}