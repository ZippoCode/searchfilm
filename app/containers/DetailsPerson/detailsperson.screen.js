import React from 'react';
import { ScrollView, ActivityIndicator, Image, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

// Importing from React-Native-Elements
import { Divider } from 'react-native-elements';

// Importing custom Components
import { Title, SubTitle, Description } from '../../components/Text';

function fromDateToString(data_row) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var data = new Date(data_row);
    return data.getDate() + ' ' + monthNames[data.getMonth()] + ' ' + data.getFullYear();
}


export default function DetailsPerson({ route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [person, setPerson] = React.useState('');

    React.useEffect(() => {
        const params = route.params;
        const fetchAsyncData = async () => {
            fetch(`http://192.168.1.13:8000/person/api/get/${params.personID}/`)
                .then((response) => response.json())
                .then((responseJson) => {
                    setPerson(responseJson);
                    setIsLoading(false);
                })
                .catch((error) => { console.log(error) })
        };
        fetchAsyncData();
    }, []);

    return (
        <View>
            {!isLoading
                ?
                <ScrollView style={{ paddingHorizontal: 16 }}>
                    <View style={{ marginVertical: heightPercentageToDP(1) }}>
                        <Title>{person.name}</Title>
                        <Image
                            source={{ uri: `https://image.tmdb.org/t/p/w500/${person.profile_img}` }}
                            style={{ width: 300, height: 300 }} />
                        <Description>{person.biography}</Description>
                    </View>
                    <Divider />
                    <View style={{ marginVertical: heightPercentageToDP(1) }}>
                        <SubTitle>Dettagli Personali</SubTitle>
                        <Description>Nato</Description>
                        <Description>{person.birth_date && fromDateToString(person.birth_date)}</Description>
                        <Description>{person.place_of_birth && person.place_of_birth.replace(/ - /g, ', ')}</Description>
                        {person.death_date &&
                            <>
                                <Description>Morto</Description>
                                <Description>{fromDateToString(person.death_date)}</Description>
                            </>
                        }
                    </View>
                </ScrollView>
                : <ActivityIndicator />
            }
        </View>
    )
}