import {
    RENDER_ENEMY_TANK,
    CHANGE_ENEMY_DIR,
    ENEMY_TANK_MOVING
} from '../../constant/index';
import {getTankNextPos} from '../../tools/tools';
import * as config from '../../constant/config';
import {BROKE_TANK} from "../../constant";

const initialState = {
    list: [],
};

export const enemyTankReducer = (state = initialState, action = {}) => {
    const {list} = state;
    switch (action.type) {
        case BROKE_TANK:
            let remainList = list.filter(item => {
                return !(action.tankIdList.indexOf(item.id) >= 0);
            });
            return Object.assign({}, state, {list: remainList});
        case ENEMY_TANK_MOVING:
            let newList = list.map(function (item) {
                const nextPos = getTankNextPos(item, action.map);
                if(nextPos){
                    return nextPos;
                }
                return item;
            });
            return Object.assign({}, state, {list: newList});
            break;
        case CHANGE_ENEMY_DIR:
            const {changeDirList} = action;
            let _newList = list.slice();
            changeDirList.forEach(item => {
                _newList.forEach((_item, index) => {
                    if(item.id === _item.id){
                        _item.dir = item.dir;
                    }
                })
            });
            // let newList = list.map(function (item) {
            //     if(item.isHitWall){
            //         return item;
            //     }
            //     const nextPos = getTankNextPos(item, action.map);
            //     if(nextPos){
            //         return nextPos;
            //     }
            //     return item;
            // });
            return Object.assign({}, state, {list: _newList});
            break;
        case RENDER_ENEMY_TANK:
            let _list = list.slice();
            const {x, y, dir, id, isAggressive} = action.tank;
            if(!_list.some(item => item.id === id)){
                _list.push({
                    speed: config.speed,
                    dir,
                    x,
                    y,
                    isAggressive,
                    id,
                    size: config.tankSize,
                    isHitWall: false
                });
                return Object.assign({}, state, {list: _list});
            }
            break;
    }
    return state;
};

