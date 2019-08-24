import { StyleSheet } from 'react-native';
import { mainContainer, column, spaceBetween, fullWidth, row} from './spacing.js'
import { colorPickerButton } from './buttons.js'

export const appStyle= StyleSheet.create({
    colorPickerButton: {
        ...colorPickerButton,
    },
    mainContainer:{
        ...mainContainer,
    },
    column:{
        ...column,
    },
    spaceBetween:{
        ...spaceBetween,
    },
    fullWidth:{
        ...fullWidth,
    },
    row:{
        ...row,
    },
});

