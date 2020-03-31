import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Importing from React-Native-elements
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: wp(3),
    },
    containerGenre: {
        paddingHorizontal: wp(1),
        paddingVertical: hp(0.5),
    },
    genreButton: {
        marginRight: wp(0.8),
    },
})

export default function Genres({ genres }) {
    const navigation = useNavigation();

    return (
        <View style={styles.rootView}>
            {genres.map((genre) =>
                <Button
                    key={genre.id}
                    title={genre.name}
                    type="outline"
                    style={styles.genreButton}
                    buttonStyle={styles.containerGenre}
                    onPress={() => navigation.navigate('genre', { type: `topPopular/${genre.name}`, title: genre.name })}
                />
            )}
        </View>
    )
}