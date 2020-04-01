import * as React from 'react';
import {
    ScrollView, View, TouchableOpacity
} from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

// Importing custom components
import { SubTitle, Description } from '../../components/Text';
import { ImagePerson } from '../../components/Image';


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
                    <ImagePerson
                        path={actor.profile_img}
                        style={{
                            width: widthPercentageToDP(30),
                            height: heightPercentageToDP(20),
                            resizeMode: 'cover',
                        }}
                    />
                    <View style={{ justifyContent: 'center', marginHorizontal: widthPercentageToDP(2) }}>
                        <SubTitle>{actor.name}</SubTitle>
                        <Description>{actor.name_character}</Description>
                    </View>
                </TouchableOpacity>
            )}
        </ScrollView>
    )

}