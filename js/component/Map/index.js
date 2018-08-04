import {connect} from '../../redux/index';
import {
    tileSize,
    mapIndexOffset,
    allImg,
} from '../../constant/config';
import {
    renderContext,
} from '../../tools/tools';

class MapCanvas {
    constructor (){
        this.context = renderContext().context;
    }
    componentWillUpdate (newProps, oldProps) {
        if(oldProps && newProps.tileMap === oldProps.tileMap){
            return false;
        }
        return true;
    }
    render (props) {
        const {tileMap} = props;
        const mapRows = tileMap.length;
        const mapCols = tileMap[0].length;
        for (let rowCtr=0;rowCtr<mapRows;rowCtr++) {
            for (let colCtr=0;colCtr<mapCols;colCtr++){
                const tileId = tileMap[rowCtr][colCtr]+mapIndexOffset; // mapIndexOffset加上
                const sourceX = Math.floor(tileId % 8) * 32;
                const sourceY = Math.floor(tileId / 8) * 32;
                this.context.drawImage(allImg, sourceX, sourceY,tileSize,tileSize,colCtr*tileSize,rowCtr*tileSize,tileSize,tileSize);
            }
        }
    }
}

export default connect(state => ({
    tileMap: state.tileMap
}))(MapCanvas);