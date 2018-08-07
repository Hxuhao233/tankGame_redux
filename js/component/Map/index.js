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
        return !oldProps || newProps.map !== oldProps.map;
    }
    render (props) {
        const {tiles} = props.map;
        const mapRows = tiles.length;
        const mapCols = tiles[0].length;
        for (let rowCtr=0;rowCtr<mapRows;rowCtr++) {
            for (let colCtr=0;colCtr<mapCols;colCtr++){
                const tileId = tiles[rowCtr][colCtr]+mapIndexOffset; // mapIndexOffset加上
                const sourceX = Math.floor(tileId % 8) * 32;
                const sourceY = Math.floor(tileId / 8) * 32;
                this.context.drawImage(allImg, sourceX, sourceY,tileSize,tileSize,colCtr*tileSize,rowCtr*tileSize,tileSize,tileSize);
            }
        }
    }
}

export default connect()(MapCanvas);