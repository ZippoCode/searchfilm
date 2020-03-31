import * as React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

function fromDateToString(data_row) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var data = new Date(data_row);
    return data.getDate() + ' ' + monthNames[data.getMonth()] + ' ' + data.getFullYear();
}

// Import custom Components
import { SubTitle, Description } from '../../components/Text';

function timeConvert(time) {
    var hours = Math.floor(time / 60);
    var minutes = Math.round(((time / 60) - hours) * 60);
    if (minutes !== 0)
        return hours + ' h ' + minutes + ' min';
    return hours + ' h'
}

export default function Details({ movie }) {

    const navigation = useNavigation();

    return (
        <View>
            <SubTitle>Regista</SubTitle>
            {movie.directors.map((director) =>
                <Description
                    key={director.name}
                    onPress={() => {
                        navigation.navigate('DetailsPerson', {
                            personID: director.id,
                        })
                    }}>
                    {director.name}
                </Description>
            )}
            <View style={{ paddingVertical: hp(2) }}>
                <SubTitle >Descrizione</SubTitle>
                <Description>{movie.description}</Description>
            </View>
            <View>
                <SubTitle>Dettagli</SubTitle>
                <Description>Data di rilascio: {fromDateToString(movie.release_date)}</Description>
                <Description>Titolo originale: {movie.original_title}</Description>
                <Description>Lingua originale: {movie.original_language}</Description>
                <Description>Durata: {timeConvert(movie.runtime)}</Description>
            </View>
        </View>
    )
}