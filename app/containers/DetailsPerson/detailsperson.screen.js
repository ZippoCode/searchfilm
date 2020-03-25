import React from 'react';
import { ScrollView, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text, Divider } from 'react-native-elements';

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
        <SafeAreaView>
            {!isLoading
                ?
                <ScrollView style={{ paddingHorizontal: 16 }}>
                    <Text h1>{person.name}</Text>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${person.profile_img}` }}
                        style={{ width: 300, height: 300 }} />
                    <Text>{person.biography}</Text>
                    <Divider />
                    <Text h4>Dettagli Personali</Text>
                    <Text>Nato</Text>
                    <Text>{fromDateToString(person.birth_date)}</Text>
                    <Text>{person.place_of_birth.replace(/ - /g, ', ')}</Text>
                    {person.death_date &&
                        <>
                            <Text></Text>
                            <Text>Morto</Text>
                            <Text>{fromDateToString(person.death_date)}</Text>
                        </>
                    }
                </ScrollView>
                : <ActivityIndicator />
            }
        </SafeAreaView>
    )
}