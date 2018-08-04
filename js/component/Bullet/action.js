import {EVENT_BULLET_FLY, RENDER_BULLET, REPAINT_MAP} from '../../constant/index';
import {bulletSpeed} from '../../constant/config';

export const fireBullet = tank => ({
    type: RENDER_BULLET,
    speed: bulletSpeed,
    tankX: tank.x,
    tankY: tank.y,
    dir: tank.dir
});

export const moveBullet = tileMap => ({
    type: EVENT_BULLET_FLY,
    tileMap
});

export const brokeGrid = brokenGrids => ({
    type: REPAINT_MAP,
    brokenGrids
});