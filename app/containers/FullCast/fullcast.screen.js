import * as React from 'react';
import {
    ScrollView, View, Image, TouchableOpacity
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

// Importing custom components
import { SubTitle, Description } from '../../components/Text';


export default function FullCastScreen({ route, navigation }) {
    const { actors } = route.params;

    return (
        <ScrollView>
            {actors.map((actor) =>
                <TouchableOpacity
                    key={actor.id}
                    style={{ flexDirection: 'row', marginBottom: widthPercentageToDP(1) }}
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
                            width: widthPercentageToDP(30),
                            height: heightPercentageToDP(20),
                            resizeMode: 'cover',
                        }} />
                    <View style={{ justifyContent: 'center', marginHorizontal: widthPercentageToDP(2) }}>
                        <SubTitle>{actor.name}</SubTitle>
                        <Description>{actor.name_character}</Description>
                    </View>
                </TouchableOpacity>
            )}
        </ScrollView>
    )

}