import * as React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Button } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Importing from React-Native-Elements
import { Text } from 'react-native-elements';

// Importing components
import ScrollViewMovies from '../../components/ScrollViewMovies';

// Importing actions
import { logout } from './authentication.action';

export default function ProfileScreen({ authentication, dispatch }) {
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        const fetchDataUser = async () => {
            fetch(`http://192.168.1.13:8000/account/api/get/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authentication.token}`
                }
            })
                .then((response) => response.json())
                .then((responseJson) => { setUser(responseJson) })
        };
        fetchDataUser();
    }, []);

    return (
        <ScrollView style={{ paddingHorizontal: wp(4) }}>
            {user &&
                <>
                    <Text h3>Benvenuto, {user.first_name}!</Text>
                    <ScrollViewMovies
                        title='Film preferiti'
                        movies={user.favorites}
                    />
                    <ScrollViewMovies
                        title='Film votati'
                        movies={user.voted}
                    />
                    <Button title='Logout' onPress={() => dispatch(logout())} />
                </>
            }
        </ScrollView>
    )
}


const ProfileConnected = connect(state => ({ authentication: state.authentication }))(ProfileScreen);
export { ProfileConnected as ProfileScreen };