import {speed} from '../../constant/config';
import * as config from '../../constant/config';
import {
    keyboard,
    SET_PLAYER_POS,
    EVENT_KEY_DOWN,
    TANK_MOVING,
    EVENT_KEY_UP
} from '../../constant/index';
const {UP, DOWN} = keyboard;
import {getTankNextPos} from '../../tools/tools';
import {BROKE_TANK} from "../../constant";

const initialState = {
    id: 'player_1',
    size: config.tankSize,
    isBroken: false,
    dir: DOWN
};

export const playerTankReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case BROKE_TANK:
            if(action.tankIdList.indexOf(state.id) >= 0){
                return Object.assign({}, state, {
                    isBroken: true
                });
            }
        case TANK_MOVING:
            const nextPos = getTankNextPos(state, action.map);
            if(nextPos){
                return nextPos;
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

