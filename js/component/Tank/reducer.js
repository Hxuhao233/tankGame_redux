import {speed} from '../../constant/config';
import * as config from '../../constant/config';
import {tankMapCollision} from '../../tools/Collision';
import {
    keyboard,
    EVENT_KEY_DOWN,
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

const initialState = {
    x: 64,
    y: 0,
    id: 'player_1',
    xSpeed: 0,
    ySpeed: 0,
    dir: keyboard.DOWN
};

export const tankReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case EVENT_KEY_DOWN:
            const {keyCode, map} = action;
            let xSpeed = getXSpeed(keyCode);
            let ySpeed = getYSpeed(keyCode);
            let x = state.x + xSpeed;
            let y = state.y + ySpeed;

            let obj = Object.assign({}, state);
            obj.tempX = state.x + xSpeed;
            obj.tempY = state.y + ySpeed;
            obj.dir = keyCode;
            obj.size = config.tankSize;

            let isCollision = tankMapCollision(obj, map);
            if(!isCollision){
                return Object.assign({}, state, {
                    xSpeed,
                    ySpeed,
                    x,
                    y,
                    dir: keyCode
                });
            }else{
                return Object.assign({}, state, {
                    xSpeed,
                    ySpeed,
                    x: obj.x,
                    y: obj.y,
                    dir: keyCode
                });
            }
            break;
        case EVENT_KEY_UP:
            return Object.assign({}, state, {
                xSpeed: 0,
                ySpeed: 0,
            });
    }
    return state;
};

