import {
    EVENT_KEY_DOWN,
    TANK_MOVING,
    EVENT_KEY_UP
} from '../../constant/index';

import {timer} from '../../tools/tools';

let _timer;
export const action_key_down = (keyCode, map) => (dispatch, getState) => {
    dispatch({
        type: EVENT_KEY_DOWN,
        keyCode,
        map
    });
    if(!_timer){
        _timer = timer.setInterval(() => {
            dispatch({
                type: TANK_MOVING,
                map: getState().map
            });
        });
    }
};
export const action_key_up = keyCode => {
    if(_timer) {
        timer.clearInterval(_timer);
        _timer = null;
    }
    return {
        type: EVENT_KEY_UP,
        keyCode
    };
};