import * as React from 'react';
import { Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const PATH_IMAGE = 'https://image.tmdb.org/t/p/w500/';
const PATH_NOT_FOUND = 'https://lh3.googleusercontent.com/proxy/FxG7qwZWaJku5ijqFaQJ1YAIv9_eyIIff3iGYEyR1pDoHuecsrvHs9pTykMN_OB27mm58nyjGKMyXMq0HOiCYJ9R1wJf75zC9_saOVK93zORYBrjT1K0CQmsB086h0bZyIdYxMOYCvdp'

export function ImagePosterMovie({ path }) {

    const path_image = path ? PATH_IMAGE.concat(path) : PATH_NOT_FOUND;

    return (
        <Image
            source={{ uri: path_image }}
            style={{
                width: wp(35),
                height: hp(25),
                resizeMode: 'stretch',
            }}
        />
    )
}