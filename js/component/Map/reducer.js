import {MAP, tileSize} from '../../constant/config';
import {REPAINT_MAP, STREET, CHANGE_MAP} from "../../constant";

export const initialState = {
    tiles: [],
    offsetX: 0,
    offsetY: 0,
    tileSize: tileSize,
    wTileCount: 0,
    HTileCount: 0
};

export const mapReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case REPAINT_MAP:
            const {brokenGrids} = action;
            if(brokenGrids && brokenGrids.length){
                let tiles = state.tiles.slice();
                brokenGrids.forEach(brokenGrid => {
                    tiles[brokenGrid[0]][brokenGrid[1]] = STREET;
                });
                return Object.assign({}, state, {tiles});
            }
            break;
        case CHANGE_MAP:
            const tiles = MAP[action.level];
            return Object.assign({}, state, {
                tiles,
                wTileCount: tiles[0].length,
                HTileCount: tiles.length
            });
    }
    return state;
};


