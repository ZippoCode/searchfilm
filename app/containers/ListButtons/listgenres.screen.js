import * as React from 'react';

import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importing from React-Navite-Elements
import { Button } from 'react-native-elements';

export default function ListGenresScreen({ route }) {
    const { genres } = route.params;
    const navigation = useNavigation();
    return (
        <View style={{ paddingHorizontal: 8 }}>
            <ScrollView>
                {genres.map((genre) =>
                    <Button
                        key={genre.name}
                        title={genre.name}
                        titleStyle={{ fontSize: 25 }}
                        onPress={() => navigation.navigate('genre', { type: `topPopular/${genre.name}`, title: genre.name })}
                    />
                )}
            </ScrollView>
        </View>
    )
}