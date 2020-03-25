import * as React from 'react';

import { View } from 'react-native';

// Importing from React-Native-Elements
import { Button } from 'react-native-elements';


export default function ButtonScreen({ navigation }) {


    async function fetchAsyncListMovies(type) {
        fetch(`http://192.168.1.13:8000/movie/api/${type}/`)
            .then((response) => response.json())
            .then((responseJson) => {
                return navigation.navigate(type, { listMovies: responseJson.results });
            })
            .catch((error) => { console.log(error) })
    }

    return (
        <View style={{ flex: 1, paddingTop: 4, marginHorizontal: 16, justifyContent: 'space-evenly' }}>
            <Button
                title='I più popolari'
                onPress={() => fetchAsyncListMovies('topPopular')}
                titleStyle={{ fontSize: 30 }}
            />
            <Button
                title='I più votati'
                onPress={() => fetchAsyncListMovies('topRanking')}
                titleStyle={{ fontSize: 30 }}
            />
            <Button
                title='I più recenti'
                onPress={() => fetchAsyncListMovies('last')}
                titleStyle={{ fontSize: 30 }}
            />
            <Button
                title='Liste per genere'
                onPress={() => navigation.navigate('Generi')}
                titleStyle={{ fontSize: 30 }}
            />
        </View>
    )
}