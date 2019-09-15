import { CHANGE_DEADLINE, CHANGE_PROGRESS_COLOR, CHANGE_BACKGROUND_RING_COLOR, CHANGE_BACKGROUND, CHANGE_COUNTDOWN_NAME, CHANGE_TEXT_COLOR, CHANGE_BACKGROUND_IMAGE_URI, RESET_TO_DEFAULTS } from './types';

export const changeDeadline = (deadline) =>{
    return {
        type: CHANGE_DEADLINE,
        deadline: deadline
    }
};

export const changeProgressColor = (color) => {
    return{
        type: CHANGE_PROGRESS_COLOR,
        progressColor: color
    }
};

export const changeBackgroundRingColor = (color) => {
    return{
        type: CHANGE_BACKGROUND_RING_COLOR,
        backColor: color
    }
};
export const changeBackground = (bg) =>{
    return{
        type: CHANGE_BACKGROUND,
        background:bg
    }
};

export const changeCountdownName = (name) =>{
    return{
        type: CHANGE_COUNTDOWN_NAME,
        countdownName: name
    }
};

export const changeTextColor = (color) =>{
    return{
        type: CHANGE_TEXT_COLOR,
        textColor: color
    }
};

export const changeBackgroundImageURI = (uri)=>{
    return{
        type: CHANGE_BACKGROUND_IMAGE_URI,
        backgroundImageURI: uri
    }
}

export const resetToDefaults = () =>{
    return {
        type: RESET_TO_DEFAULTS,
        progressColor: '#FC9F5B',
        backColor: '#010400',
        background: ['#34e89e', "#0f3443"],
        countdownName: 'Countdown',
        textColor: '#000000',
        backgroundImageURI: null,
    }
}