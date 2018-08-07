import {speed} from '../../constant/config';
import * as config from '../../constant/config';
import {tankMapCollision} from '../../tools/Collision';
import {
    keyboard,
    SET_PLAYER_POS,
    EVENT_KEY_DOWN,
    TANK_MOVING,
    EVENT_KEY_UP
} from '../../constant/index';
const {UP, DOWN, LEFT, RIGHT} = keyboard;
export const getXSpeed = key => key === LEFT ? -speed : key === RIGHT ? speed : 0;
export const getYSpeed = key => key === UP ? -speed : key === DOWN ? speed : 0;
export const getDegree = keyCode => ({
    [LEFT]: 270,
    [RIGHT]: 90,
    [UP]: 0,
    [DOWN]: 180
})[keyCode];

const initialState = {
    id: 'player_1',
    size: config.tankSize,
    dir: DOWN
};

export const playerTankReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case TANK_MOVING:
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
        case SET_PLAYER_POS:
            return Object.assign({}, state, {
                x: action.pos.x,
                y: action.pos.y,
                tempX: action.pos.x,
                tempY: action.pos.y,
                dir: action.pos.dir || UP
            });
    }
    return state;
};

