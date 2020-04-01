import * as React from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

//Importing from React-Native-Elements
import { Button } from 'react-native-elements';

// Importing custom elements
import { HomeText } from '../../components/Text';
//Importing URLs
import { GET_RECOMMEND } from '../../components/Matcher';


const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        marginHorizontal: wp(4),
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "center",
    },
    buttonStyle: {
        borderRadius: 32,
        marginHorizontal: wp(15),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        backgroundColor: '#70587C'
    },
});


export function Home() {
    const navigation = useNavigation();
    const titles = ['Inception', 'Interstellar',
        'Django Unchained', 'Full Metal Jacket', 'Harry Potter', 'Le Iene',
        'Il Laureato', 'Shining', 'Il Padrino', 'Quei Bravi Ragazzi', 'Arancia Meccanica'];
    const [pos, setPos] = React.useState(0);
    const [visible, setVisible] = React.useState(false);

    setTimeout(function () { setPos((pos + 1) % titles.length); }, 3000);

    const getRecommend = React.useCallback(() => {
        setVisible(true);
        setTimeout(() => {
            fetch(GET_RECOMMEND, {
                method: 'POST',
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    navigation.navigate('DetailsMovie', { movieID: responseJson.id });
                    setVisible(false);
                });
        }, 5000);
    });

    return (
        <View style={styles.rootView}>
            {visible
                ? <LottieView source={require('../../assets/animations/videocam.json')} autoPlay loop />
                :
                <SafeAreaView style={styles.rootView}>
                    <View>
                        <Animatable.View
                            animation="fadeOutRightBig"
                            iterationCount='infinite'
                            duration={3000}
                            direction="alternate"
                            easing='ease-in-out-sine'
                        >
                            <HomeText>{titles[Math.floor(Math.random(0, titles.length) * 10)]}</HomeText>
                        </Animatable.View>
                        <Animatable.View
                            animation="fadeOutRightBig"
                            iterationCount='infinite'
                            duration={2500}
                            direction="alternate"
                            easing='ease-in-out-sine'
                        >
                            <HomeText>{titles[Math.floor(Math.random(0, titles.length) * 10)]}</HomeText>
                        </Animatable.View>
                    </View>
                    <HomeText style={{ textAlign: 'center' }}>Scopri ogni giorno nuovi film</HomeText>
                    <Button
                        title='Scopri'
                        onPress={getRecommend}
                        buttonStyle={styles.buttonStyle}
                        titleStyle={{ marginVertical: wp(2) }}
                    />
                </SafeAreaView>
            }
        </View>
    )
}