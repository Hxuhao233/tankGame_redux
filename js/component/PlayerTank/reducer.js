import {speed} from '../../constant/config';
import * as config from '../../constant/config';
import {tankMapCollision} from '../../tools/Collision';
import {
    keyboard,
    EVENT_KEY_DOWN,
    TANK_MOVING,
    EVENT_KEY_UP
} from '../../constant/index';

export const getXSpeed = key => key === keyboard.LEFT ? -speed : key === keyboard.RIGHT ? speed : 0;
export const getYSpeed = key => key === keyboard.UP ? -speed : key === keyboard.DOWN ? speed : 0;
export const getDegree = keyCode => ({
    [keyboard.LEFT]: 270,
    [keyboard.RIGHT]: 90,
    [keyboard.UP]: 0,
    [keyboard.DOWN]: 180
})[keyCode];

const initialPos = [64, 0];
const initialState = {
    tempX: initialPos[0],
    tempY: initialPos[1],
    x: initialPos[0],
    y: initialPos[1],
    id: 'player_1',
    size: config.tankSize,
    dir: keyboard.DOWN
};

export const playerTankReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case TANK_MOVING:
            console.log(1)
            if(state.speed){
                const {map} = action;
                let tank = Object.assign({}, state, {
                    tempX: state.x + getXSpeed(state.dir),
                    tempY: state.y + getYSpeed(state.dir)
                });
                // 判断是否碰到箱子
                let isCollision = tankMapCollision(tank, map);
                if(!isCollision){
                    tank.x = tank.tempX;
                    tank.y = tank.tempY;
                    return tank;
                }else{
                    return tank;
                }
            }
            break;
        case EVENT_KEY_UP:
            return Object.assign({}, state, {
                speed: 0
            });
        case EVENT_KEY_DOWN:
            return Object.assign({}, state, {
                speed,
                dir: action.keyCode
            });
    }
    return state;
};

