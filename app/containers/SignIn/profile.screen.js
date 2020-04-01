import * as React from 'react';
import { connect } from 'react-redux';
import { ScrollView, Button, RefreshControl } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Importing components
import ScrollViewMovies from '../../components/ScrollViewMovies';

// Importing actions
import { logout } from './authentication.action';

// Import URLs
import { GET_INFO_USER } from '../../components/Matcher';

import { Title } from '../../components/Text';

export default function ProfileScreen({ authentication, dispatch }) {
    const [user, setUser] = React.useState();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetch(GET_INFO_USER, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authentication.token}`
            }
        })
            .then((response) => response.json())
            .then((responseJson) => { setUser(responseJson), setRefreshing(false) })
    }, [refreshing]);


    React.useEffect(() => {
        const fetchDataUser = async () => {
            fetch(GET_INFO_USER, {
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
        <ScrollView style={{ paddingHorizontal: wp(4) }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {user &&
                <>
                    <Title style={{ marginVertical: wp(5) }}>Benvenuto, {user.first_name}!</Title>
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