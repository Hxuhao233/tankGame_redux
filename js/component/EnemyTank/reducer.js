import {speed} from '../../constant/config';
import * as config from '../../constant/config';
import {tankMapCollision} from '../../tools/Collision';
import {
    keyboard,
    EVENT_KEY_DOWN,
    EVENT_KEY_UP
} from '../../constant/index';

const initialState = {
    list: [],
};

export const enemyTankReducer = (state = initialState, action = {}) => {
    switch (action.type) {

    }
    return state;
};

