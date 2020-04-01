import * as React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
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
    },
    containerGenre: {
        borderColor: '#502F4C',
        borderRadius: 4,
        paddingHorizontal: wp(1.5),
        paddingVertical: hp(0.3),
    },
    genreButton: {
        marginRight: wp(0.8),
    },
})

export default function Genres({ genres }) {
    const navigation = useNavigation();

    return (
        <View style={styles.rootView}>
            <FlatList
                horizontal
                keyExtractor={(item, index) => index.toString()}
                data={genres}
                renderItem={({ item }) => (
                    <Button
                        title={item.name}
                        type="outline"
                        style={styles.genreButton}
                        buttonStyle={styles.containerGenre}
                        titleStyle={{ color: '#502F4C' }}
                        onPress={() => navigation.navigate('genre', { type: `topPopular/${item.name}`, title: item.name })}
                    />
                )}
            />

        </View>
    )
}