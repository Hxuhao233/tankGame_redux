import {EVENT_BULLET_FLY, RENDER_BULLET, REPAINT_MAP} from '../../constant/index';
import {bulletSpeed} from '../../constant/config';

let timer;

export const fireBullet = (tank) => (dispatch, getState) => {
    const {bullets} = getState();
    const isFiring = bullets.list.some(item => {
        return item.id === tank.id;
    });
    if(!isFiring){
        dispatch({
            type: RENDER_BULLET,
            speed: bulletSpeed,
            tankX: tank.x,
            tankY: tank.y,
            id: tank.id,
            dir: tank.dir
        });
    }
    if(!timer){
        timer = window.setInterval(() => {
            moveBullet(dispatch, getState);
        }, 50);
    }
};

export const moveBullet = (dispatch, getState) => {
    const {map, bullets, tank_player, enemyTanks} = getState();
    if(!bullets.list || !bullets.list.length){
        window.clearInterval(timer);
        timer = null;
    }
    dispatch({
        type: EVENT_BULLET_FLY,
        map,
        tank_player,
        enemyTanks
    });
};

export const brokeGrid = brokenGrids => ({
    type: REPAINT_MAP,
    brokenGrids
});