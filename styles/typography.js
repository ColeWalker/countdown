import { StyleSheet } from 'react-native'

const heading = {
    color: '#000000',
    fontSize: 40,
}
const center = {
    textAlign: 'center',
}

const settingsLabel = {
    fontSize: 22,

}

export const typography = StyleSheet.create({
    heading:{
        ...heading,
    },
    center:{
        ...center,
    },
    settingsLabel:{
        ...settingsLabel,
    },
});