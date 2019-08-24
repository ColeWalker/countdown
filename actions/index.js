import { CHANGE_DEADLINE, CHANGE_PROGRESS_COLOR, CHANGE_BACKGROUND_RING_COLOR, CHANGE_BACKGROUND, CHANGE_COUNTDOWN_NAME, CHANGE_TEXT_COLOR } from './types';

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