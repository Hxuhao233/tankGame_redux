import {EVENT_BULLET_FLY, RENDER_BULLET, REPAINT_MAP, BROKE_TANK} from '../../constant/index';
import {bulletSpeed} from '../../constant/config';
import {timer} from '../../tools/tools';

let _timer;

export const fireBullet = (dispatch, getState) => (tank) => {
    const {bullets} = getState();
    const isFiring = bullets.list.some(item => {
        return item.id === tank.id;
    });
    if(!isFiring){
        dispatch({
            type: RENDER_BULLET,
            speed: bulletSpeed,
            tank
        });
    }
    if(!_timer){
        _timer = timer.setInterval(() => {
            moveBullet(dispatch, getState);
        });
    }
};

export const moveBullet = (dispatch, getState) => {
    const {map, bullets, playerTank, enemy} = getState();
    if(!bullets.list || !bullets.list.length){
        timer.clearInterval(_timer);
        _timer = null;
    }
    dispatch({
        type: EVENT_BULLET_FLY,
        map,
        playerTank,
        enemyTanks: enemy.list
    });
};

export const brokeGrid = brokenGrids => ({
    type: REPAINT_MAP,
    brokenGrids
});

export const brokeTank = tankIdList => ({
    type: BROKE_TANK,
    tankIdList
});