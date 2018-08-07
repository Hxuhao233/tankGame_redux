import {MAP, tileSize} from '../../constant/config';
import {REPAINT_MAP, STREET} from "../../constant";

const tiles = MAP[1];
export const initialState = {
    tiles,
    offsetX: 0,
    offsetY: 0,
    tileSize: tileSize,
    wTileCount: tiles[0].length,
    HTileCount: tiles.length
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

    }
    return state;
};


