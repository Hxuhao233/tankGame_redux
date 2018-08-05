import * as config from "../../constant/config";
import {EVENT_BULLET_FLY, RENDER_BULLET, keyboard} from "../../constant/index";
const {UP, DOWN, LEFT, RIGHT} = keyboard;

import {bulletMapCollision, checkIntersect} from "../../tools/Collision";
import {bulletSize} from "../../constant/config";

export const initialState = {
    list: [],
    brokeGrids: [],
    brokeTanks: []
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
    let {list, brokeGrids, brokeTanks} = state;
    switch (action.type) {
        case RENDER_BULLET:
            if(list.some(item => item.id === action.id)){
                return state;
            }
            return Object.assign({}, state, {
                list: [].concat(list, {
                    x: action.tankX + config.tankSize / 2 - config.bulletSize/2,
                    y: action.tankY + config.tankSize / 2 - config.bulletSize/2,
                    speed: action.speed,
                    id: action.id,
                    isCollided: false,
                    size: bulletSize,
                    dir: action.dir
                })
            });
        case EVENT_BULLET_FLY:
            const bullets = list.slice();
            const {map, tank_player, enemyTanks} = action;
            const tankList = [tank_player, enemyTanks];
            bullets.forEach(bullet => {
                if(bullet.isCollided){
                    console.error('EVENT_BULLET_FLY error');
                    return;
                }
                update(bullet);
                // 判断是否碰到箱子
                let collideGrid = bulletMapCollision(bullet, map);
                if(collideGrid === true){
                    bullet.isCollided = true;
                }else if (collideGrid.length){
                    bullet.isCollided = true;
                    brokeGrids = brokeGrids.concat(collideGrid);
                }
                tankList.forEach(tank => {
                    if(tank && bullet.id !== tank.id){
                        // 判断是否碰到坦克
                        let collideTank = checkIntersect(bullet, tank);
                        console.log('collideTank', collideTank);
                        brokeTanks = brokeTanks.concat(tank);
                    }
                });
            });
            return {
                list: bullets.filter(bullet => !bullet.isCollided),
                brokeGrids,
                brokeTanks
            };
            break;
    }
    return state;
};
