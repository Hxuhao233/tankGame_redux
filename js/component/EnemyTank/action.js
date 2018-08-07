
import {
    EVENT_KEY_DOWN,
    EVENT_KEY_UP
} from '../../constant/index';

export const action_key_down = (keyCode, map) => ({
    type: EVENT_KEY_DOWN,
    keyCode,
    map
});
export const action_key_up = keyCode => ({
    type: EVENT_KEY_UP,
    keyCode
});