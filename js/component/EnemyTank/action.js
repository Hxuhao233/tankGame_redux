import {
    RENDER_ENEMY_TANK,
    ENEMY_TANK_MOVING,
    RENDER_BULLET,
    CHANGE_ENEMY_DIR,
    keyboard
} from '../../constant/index';
const {LEFT, RIGHT, UP, DOWN} = keyboard;
import {timer} from '../../tools/tools';
import {fireBullet} from '../Bullet/action';

let _timer;
const dirList = [LEFT, UP, RIGHT, DOWN];
const getRandom = () => Math.floor(0.5 - Math.random());
const getRandomDIR = dir => {
    // console.log('uuuuu', dirList.indexOf(dir) + 1, dirList.length);
    return dirList[(dirList.indexOf(dir) + 1) % (dirList.length)]
};

// const getRandomDIR = dir => {
//     // console.log('uuuuu', dirList.indexOf(dir) + 1, dirList.length);
//     let
//         len = dirList.length,
//         next = (dirList.indexOf(dir) + getRandom());
//     if(next < 0){
//         next = len - next;
//     }
//     next = next % len;
//     console.log('uuuuu', next);
//     return dirList[next]
// };

const onInterval = (dispatch, getState) => () => {
    const {list} = getState().enemy;
    if(list && list.length){
        let changeDirList = [];
        list.forEach((item) => {
            if(item.isHitWall){
                changeDirList.push(Object.assign({}, item, {
                    dir: getRandomDIR(item.dir)
                }));
            }
        });

        // const playerTank =

        if(changeDirList.length){
            dispatch({
                type: CHANGE_ENEMY_DIR,
                changeDirList
            });
        }
        // 移动
        dispatch({
            type: ENEMY_TANK_MOVING,
            map: getState().map
        });
        // 发射子弹
        list.forEach(fireBullet(dispatch, getState));
    }else{
        timer.clearInterval(_timer);
    }
};
export const action_renderTank = (pos, id) => (dispatch, getState) => {
    dispatch({
        type: RENDER_ENEMY_TANK,
        pos,
        id,
        renderTime: Date.now(),
        dir: keyboard.LEFT
    });
    if(!_timer){
        _timer = timer.setInterval(onInterval(dispatch, getState));
    }
};


// const {enemy} = props.parentProps;
// let numbers = enemy.numbers;
// let pos = enemy.pos;
// let timer = window.setInterval(() => {
//     if(numbers < 0){
//         return window.clearInterval(timer);
//     }
//     props.renderTank();
//     let list = this.state.enemyTanks.slice(),
//         randomPos = pos[(pos.length - 1) % numbers--];
//     if(!randomPos){
//         return;
//     }
//     list.push({
//         x: randomPos.x,
//         y: randomPos.y
//     });
//     this.setState(Object.assign({}, this.state, {
//         enemyTanks: list
//     }));
// }, enemy.renderGap);