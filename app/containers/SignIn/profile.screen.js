import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Button } from 'react-native';

// Importing from React-Native-Elements
import { Text } from 'react-native-elements';

// Importing from Navigation
import { AuthContext } from './signin.navigation';

// Importing components
import ScrollViewMovies from '../../components/ScrollViewMovies';

export default function ProfileScreen({ route, navigation }) {

    const { userToken } = route.params;
    const { signOut } = React.useContext(AuthContext);

    const [user, setUser] = React.useState();

    React.useEffect(() => {
        const fetchAsyncData = async () => {
            fetch(`http://192.168.1.13:8000/account/api/get/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            })
                .then((response) => response.json())
                .then((json) => setUser(json))
                .catch((error) => console.log(error))
        };
        fetchAsyncData();
    }, [userToken]);


    return (
        <View style={{ flex: 1, paddingTop: 24, paddingLeft: 16 }}>
            {user &&
                <>
                    <Text h3>{user.first_name} {user.last_name}</Text>
                    <ScrollViewMovies
                        title='Film preferiti'
                        movies={user.favorites}
                        navigation={navigation}
                    />
                    <ScrollViewMovies
                        title='Film votati'
                        movies={user.voted}
                        navigation={navigation}
                    />
                    <Button title='Sign Out' onPress={signOut} />
                </>
            }
        </View>
    )
}
