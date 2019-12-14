import { StyleSheet } from 'react-native';
import { getOrientationAsync } from 'expo/build/ScreenOrientation/ScreenOrientation';

export const appStyles = StyleSheet.create({
    mainContainer:{
        flex: 1
    },
    appWording:{
        marginTop:30,
        fontSize: 20,
        padding: 10,
        textAlign: 'center',
        color: 'cyan',
    },
    homeText:{
        marginTop:10,
        fontSize: 15,
        padding: 10,
        textAlign: 'center',
        color: 'blue',

    },
    textInput:{
        margin:10,
        height: 30,
        borderColor: 'black',
        borderWidth: 1
    },
    informationStyle:{
        fontSize: 15,
        fontSize: 14,
        padding: 5,
        textAlign: 'justify',
    },
    sectionStyle:{
        flex:1,
         flexDirection:'row'
    },
    sectionTitleStyle:{
        backgroundColor:'grey'
    }
});