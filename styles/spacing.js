import { StyleSheet } from 'react-native'

export const mainContainer = {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex:1,
};

export const column = {
    display: 'flex',
    flexDirection: 'column',
};

export const spaceBetween={
    justifyContent: 'space-between'
};
export const fullWidth={
    flex:1,
};
export const row={
    display: 'flex',
    flexDirection: 'row',
};

export const center={
    justifyContent: 'center',
    alignContent: 'center',
}

const mainTopPad={
    paddingTop:40,
}

export const spacing = StyleSheet.create({
    mainContainer:{
        ...mainContainer,
    },
    column:{
        ...column
    },
    spaceBetween:{
        ...spaceBetween
    },
    fullWidth:{
        ...fullWidth,
    },
    row:{
        ...row,
    },
    center:{
        ...center,
    },
    mainTopPad:{
        ...mainTopPad
    },
});