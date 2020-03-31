import * as React from 'react';
import * as Font from 'expo-font';
import { Text as T } from 'react-native';
import { widthPercentageToDP, heightPercentageToDP } from 'react-native-responsive-screen';

export function Title(props) {
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'librefranklin-bold': require('../assets/fonts/LibreFranklin-Bold.ttf')
            });
            setIsLoading(true);
        }
        loadFont();
    }, []);

    return (
        <>
            {isLoading
                ? <T style={{
                    fontFamily: 'librefranklin-bold',
                    fontSize: widthPercentageToDP(8)
                }}
                    {...props}
                >
                    {props.children}
                </T>
                : null
            }
        </>
    )
}

export function SubTitle(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { children, style, ...rest } = props;

    React.useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'librefranklin-regular': require('../assets/fonts/LibreFranklin-Regular.ttf')
            });
            setIsLoading(true);
        }
        loadFont();
    }, []);

    return (
        <>
            {isLoading
                ? <T style={{
                    fontFamily: 'librefranklin-regular',
                    fontSize: widthPercentageToDP(6),
                    fontWeight: '900',
                    ...style
                }}
                    {...rest}
                >
                    {children}
                </T>
                : null
            }
        </>
    )
}

export function Description(props) {
    const [isLoading, setIsLoading] = React.useState(false);
    const { children, style, ...rest } = props;

    React.useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                'librefranklin-ligth': require('../assets/fonts/LibreFranklin-Light.ttf')
            });
            setIsLoading(true);
        }
        loadFont();
    }, []);

    return (
        <>
            {isLoading
                ? <T style={{
                    fontFamily: 'librefranklin-ligth',
                    fontSize: widthPercentageToDP(4),
                    ...style
                }}
                    {...rest}
                >
                    {children}
                </T>
                : null
            }
        </>
    )
}