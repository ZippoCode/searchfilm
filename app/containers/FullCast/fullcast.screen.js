import * as React from 'react';
import {
    Text, ScrollView, View, Image, useWindowDimensions, TouchableOpacity
} from 'react-native';


export default function FullCastScreen({ route, navigation }) {
    const { actors } = route.params;
    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    return (
        <ScrollView>
            {actors.map((actor) =>
                <TouchableOpacity
                    style={{ flexDirection: 'row' }}
                    onPress={() => {
                        navigation.navigate('DetailsPerson', {
                            personID: actor.id,
                        })
                    }}>
                    <Image
                        source={{
                            uri: actor.profile_img
                                ? `https://image.tmdb.org/t/p/w500/${actor.profile_img}`
                                : 'https://lh3.googleusercontent.com/proxy/z5td1LFiFC6B86IGymPWY2ZvSZm7A14O7-GVYjqX_xyPh56MJACKJ0oMiNyVfOSOxLL82G2_AY9AqecZSIktc1pU1xmGh5Ha8jfblsTrLnMljPBiL5stJYzpMtbbU3nP8siN4hhMIHd1'
                        }}
                        style={{
                            width: windowWidth * 0.27,
                            height: windowHeight * 0.23,
                            resizeMode: 'cover',
                        }} />
                    <View>
                        <Text>{actor.name}</Text>
                        <Text>{actor.name_character}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </ScrollView>
    )

}