
import {
    EVENT_KEY_DOWN,
    EVENT_KEY_UP
} from '../../constant/index';

export const action_key_down = (keyCode, tileMap) => ({
    type: EVENT_KEY_DOWN,
    keyCode,
    tileMap
});
export const action_key_up = keyCode => ({
    type: EVENT_KEY_UP,
    keyCode
});