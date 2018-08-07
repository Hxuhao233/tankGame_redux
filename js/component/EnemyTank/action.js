import {
    EVENT_KEY_DOWN,
    RENDER_ENEMY_TANK,
    EVENT_KEY_UP
} from '../../constant/index';

import {timer} from '../../tools/tools';

let _timer;

const onInterval = (dispatch, getState) => () => {
    const enemyTanks = getState().enemyTank;
    if(enemyTanks && enemyTanks.list && enemyTanks.list.length){
        dispatch({
            type: TANK_MOVING,
            map: getState().map
        });
    }else{
        timer.clearInterval(_timer);
    }
};
export const action_renderTank = (pos) => (dispatch, getState) => {
    dispatch({
        type: RENDER_ENEMY_TANK,
        pos
    });
    if(!_timer){
        _timer = timer.setInterval(onInterval(dispatch, getState));
    }
};

