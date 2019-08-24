import { CHANGE_DEADLINE, CHANGE_PROGRESS_COLOR, CHANGE_BACKGROUND_RING_COLOR, CHANGE_BACKGROUND, CHANGE_TEXT_COLOR, CHANGE_COUNTDOWN_NAME } from '../actions/types';

// const defaultState= {
//     deadline: new Date('jan 3, 2099 15:37:55').getTime(),
//     progressColor: '#FC9F5B',
//     backColor: '#010400',
//     background: '#FFFFFF'
// };

export default rootReducer = (state=defaultState, action)=>{
    switch (action.type) {
        case CHANGE_DEADLINE:
            return {
            ...state,
            deadline: action.deadline}
        case CHANGE_PROGRESS_COLOR:
            return{
                ...state,
                progressColor: action.progressColor
            }   
            
        case CHANGE_BACKGROUND_RING_COLOR:
            return{
                ...state,
                backColor: action.backColor
            }
        case CHANGE_BACKGROUND:
            return{
                ...state,
                background: action.background
            }
        case CHANGE_TEXT_COLOR:
            return{
                ...state,
                textColor: action.textColor
            }
        case CHANGE_COUNTDOWN_NAME:
            return{
                ...state,
                countdownName: action.countdownName
            }
        default:
            return{
                ...state
            }
    }
}