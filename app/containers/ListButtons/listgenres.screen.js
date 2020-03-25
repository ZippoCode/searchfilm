import 'react-native-gesture-handler';
import * as React from 'react';

import { ActivityIndicator, ScrollView, View } from 'react-native';

// Importing from React-Navite-Elements
import { Button } from 'react-native-elements';

export default function ListGenresScreen({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [genres, setGenres] = React.useState([]);

    React.useEffect(() => {
        const fetchAsyncGenres = async () => {
            fetch('http://192.168.1.13:8000/movie/api/genres/')
                .then((response) => response.json())
                .then((responseJson) => {
                    setGenres(responseJson);
                    setIsLoading(false);
                })
                .catch((error) => { console.log(error) })
        }
        fetchAsyncGenres();
    }, []);

    async function fetchAsyncListMovies(genre) {
        fetch(`http://192.168.1.13:8000/movie/api/topPopular/${genre}/`)
            .then((response) => response.json())
            .then((responseJson) => {
                return navigation.navigate('genre', { listMovies: responseJson.slice(0, 20), title: genre });
            })
            .catch((error) => { console.log(error) })
    }

    return (
        <View style={{ paddingHorizontal: 8 }}>
            {isLoading
                ? <ActivityIndicator />
                :
                <ScrollView>
                    {genres.map((genre) =>
                        <Button
                            key={genre.name}
                            title={genre.name}
                            titleStyle={{ fontSize: 25 }}
                            onPress={() => fetchAsyncListMovies(genre.name)}
                        />
                    )}
                </ScrollView>
            }
        </View>
    )
}