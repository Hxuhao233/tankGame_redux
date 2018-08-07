import {
    RENDER_ENEMY_TANK,
    ENEMY_TANK_MOVING,
    RENDER_BULLET,
    CHANGE_ENEMY_DIR,
    keyboard
} from '../../constant/index';
const {LEFT, RIGHT, UP, DOWN} = keyboard;
import {timer} from '../../tools/tools';
import {tileSize} from '../../constant/config';
import {fireBullet} from '../Bullet/action';

let _timer;
const dirList = [LEFT, UP, RIGHT, DOWN];
const getRandom = () => Math.floor(0.5 - Math.random());
const getRandomDIR = dir => {
    return dirList[(dirList.indexOf(dir) + 1) % (dirList.length)]
};
const getPlayerDIR = (enemy, player) => {
    const horizonSame = Math.abs(enemy.x - player.x) < tileSize;
    const isLeft = enemy.x - player.x > 0;
    const isTop = enemy.y - player.y > 0;
    if(horizonSame){
        return isTop ? UP : DOWN;
    }else{
        return isLeft ? LEFT : RIGHT;
    }
};

const onInterval = (dispatch, getState) => () => {
    const state = getState();
    const {list} = state.enemy;
    if(list && list.length){
        let changeDirList = [];
        list.forEach((item) => {
            if(item.isAggressive){
                changeDirList.push(Object.assign({}, item, {
                    dir: getPlayerDIR(item, state.playerTank)
                }));
            }else if(item.isHitWall){
                changeDirList.push(Object.assign({}, item, {
                    dir: getRandomDIR(item.dir)
                }));
            }
        });
        if(changeDirList.length){
            dispatch({
                type: CHANGE_ENEMY_DIR,
                changeDirList
            });
        }
        // 移动
        dispatch({
            type: ENEMY_TANK_MOVING,
            map: state.map
        });
        // 发射子弹
        list.forEach(fireBullet(dispatch, getState));
    }else{
        timer.clearInterval(_timer);
        _timer = null;
    }
};
export const action_renderTank = (tank) => (dispatch, getState) => {
    dispatch({
        type: RENDER_ENEMY_TANK,
        tank
    });
    if(!_timer){
        _timer = timer.setInterval(onInterval(dispatch, getState));
    }
};