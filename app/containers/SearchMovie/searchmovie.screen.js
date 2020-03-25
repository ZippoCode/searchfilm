import 'react-native-gesture-handler';
import * as React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importing from React-Native-Elements
import { SearchBar } from 'react-native-elements';


export default function SearchScreen() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [query, setQuery] = React.useState('');
    const [suggestedMovie, setSuggestedMovie] = React.useState([]);

    React.useEffect(() => {
        const fetchAsyncRequest = async () => {
            if (query.length > 0)
                fetch(`http://192.168.1.13:8000/movie/api/title/?search=${query}`)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setSuggestedMovie(responseJson);
                        setIsLoading(false);
                    })
                    .catch((error) => { console.log(error) })
        }
        fetchAsyncRequest();
    }, [query, suggestedMovie])

    return (
        <SafeAreaView>
            <SearchBar
                placeholder='Search a movie ...'
                value={query}
                onChangeText={setQuery}
            />
            {!isLoading && suggestedMovie.map((movie) =>
                <Text key={movie.title}>{movie.title}</Text>)
            }
        </SafeAreaView>
    )
}