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
    const checkBrokenTank = (bullet, tank) =>{
        if(!tank || bullet.id === tank.id) {
            return;
        }
        // 判断是否碰到坦克
        let collideTank = checkIntersect(bullet, tank);
        if(collideTank){
            if(brokeTanks.indexOf(tank.id) === -1){
                brokeTanks = brokeTanks.concat(tank.id);
            }
        }
    };

    switch (action.type) {
        case RENDER_BULLET:
            const {tank} = action;
            if(list.some(item => item.id === tank.id)){
                return state;
            }
            return Object.assign({}, state, {
                list: [].concat(list, {
                    x: tank.x + config.tankSize / 2 - config.bulletSize/2,
                    y: tank.y + config.tankSize / 2 - config.bulletSize/2,
                    speed: config.bulletSpeed,
                    id: tank.id,
                    isCollided: false,
                    size: config.bulletSize,
                    dir: tank.dir
                })
            });
        case EVENT_BULLET_FLY:
            const bullets = list.slice();
            const {map, playerTank, enemyTanks} = action;
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
                if(collideGrid.length === 0){
                    /*
                   * 判断是否碰到坦克
                   * */
                    var bulletForPlayer = bullet.id.indexOf('enemy') !== -1;
                    if(bulletForPlayer){
                        checkBrokenTank(bullet, playerTank);
                    }else{
                        enemyTanks.forEach(tank => {
                            checkBrokenTank(bullet, tank);
                        });
                    }
                }
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
