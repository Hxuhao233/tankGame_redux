import * as config from "../../constant/config";
import {EVENT_BULLET_FLY, RENDER_BULLET, keyboard} from "../../constant/index";
const {UP, DOWN, LEFT, RIGHT} = keyboard;

import {bulletMapCollision} from "../../tools/Collision";
import {bulletSize} from "../../constant/config";

export const initialState = {
    list: [],
    brokeGrids: []
};
const update = (bullet) => {
    switch (bullet.dir) {
        case UP:
            bullet.y -= bullet.speed;
            break;
        case DOWN:
            bullet.y += bullet.speed;
            break;
        case LEFT:
            bullet.x -= bullet.speed;
            break;
        case RIGHT:
            bullet.x += bullet.speed;
            break;
    }
};
export const bulletReducer = (state = initialState, action = {}) => {
    let {list, brokeGrids} = state;
    switch (action.type) {
        case RENDER_BULLET:
            return {
                list: [].concat(list, {
                    x: action.tankX + config.tankSize / 2 - config.bulletSize/2,
                    y: action.tankY + config.tankSize / 2 - config.bulletSize/2,
                    speed: action.speed,
                    isCollided: false,
                    size: bulletSize,
                    dir: action.dir
                }),
                brokeGrids
            };
        case EVENT_BULLET_FLY:
            const bullets = list.slice();
            const {tileMap} = action;
            bullets.forEach(bullet => {
                update(bullet);
                var collideGrid = bulletMapCollision(bullet, {
                    offsetX: 0,
                    offsetY: 0,
                    tileSize: config.tileSize,
                    wTileCount: tileMap[0].length,
                    HTileCount: tileMap.length,
                    mapLevel: tileMap
                });
                if(collideGrid === true){
                    bullet.isCollided = true;
                }else if (collideGrid.length){
                    bullet.isCollided = true;
                    brokeGrids = brokeGrids.concat(collideGrid);
                }
            });
            return {
                list: bullets.filter(bullet => !bullet.isCollided),
                brokeGrids
            };
            break;
    }
    return state;
};
