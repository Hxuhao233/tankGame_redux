
// export const initialState = [
//     [NN,ZZ,ZZ,ZZ,__,ZZ,ZZ,ZZ,ZZ,NN]
//     , [__,__,__,__,__,__,__,__,__,__]
//     , [NN,__,XX,__,XX,__,XX,__,__,NN]
//     , [NN,XX,__,__,XX,__,__,XX,__,NN]
//     , [NN,__,__,__,XX,XX,__,XX,__,NN]
//     , [NN,__,__,XX,__,__,__,XX,__,NN]
//     , [NN,__,__,__,__,__,__,XX,__,NN]
//     , [__,__,XX,__,XX,__,XX,__,__,__]
//     , [NN,__,__,__,__,__,__,__,__,NN]
//     , [NN,ZZ,ZZ,ZZ,__,ZZ,ZZ,ZZ,ZZ,NN]
// ];

// export const initialState = [
//     [XX,XX,XX,XX,__,XX,XX,XX,XX,XX]
//     , [__,__,__,__,__,__,__,__,__,__]
//     , [XX,__,XX,__,XX,__,XX,__,__,XX]
//     , [XX,XX,__,__,XX,__,__,XX,__,XX]
//     , [XX,__,__,__,XX,XX,__,XX,__,XX]
//     , [XX,__,__,XX,__,__,__,XX,__,XX]
//     , [XX,__,__,__,__,__,__,XX,__,XX]
//     , [__,__,XX,__,XX,__,XX,__,__,__]
//     , [XX,__,__,__,__,__,__,__,__,XX]
//     , [XX,XX,XX,XX,__,XX,XX,XX,XX,XX]
// ];
import {MAP} from '../../constant/config';
import {REPAINT_MAP, STREET} from "../../constant";

export const initialState = MAP.level_1;

export const mapReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case REPAINT_MAP:
            const {brokenGrids} = action;
            if(brokenGrids && brokenGrids.length){
                let newState = state.slice();
                brokenGrids.forEach(brokenGrid => {
                    newState[brokenGrid[0]][brokenGrid[1]] = STREET;
                });
                return newState;
            }

    }
    return state;
};


