import {
    tankSize,
    allImg,
} from '../../constant/config';
import {renderContext} from "../../tools/tools";
import {connect} from "../../redux/index";
import {action_key_down, action_key_up} from "./action";
import {getDegree} from './reducer';

const animationFrames=[1,2,3,4,5,6,7,8];
let frameIndex = 0;

class TankCanvas {
    constructor (){
        this.context = renderContext().context;
    }
    bindEvent (props) {
        document.body.addEventListener('keydown', props.onKeyDown);
        document.body.addEventListener('keyup', props.onKeyUp);
    }
    render(props){
        if(!this.inited){
            this.bindEvent(props);
            this.inited = true;
        }
        let {tank_player} = props;
        this.context.save();
        this.context.clearRect(0,0,500,500);

        let sourceX=Math.floor(animationFrames[frameIndex] % 8) * 32;
        let sourceY=Math.floor(animationFrames[frameIndex] / 8) * 32;
        let currentDegree = getDegree(tank_player.dir);
        let fixX = - tankSize / 2;
        let fixY = - tankSize / 2;
        this.context.translate(tank_player.x - fixX, tank_player.y - fixY);
        this.context.rotate(currentDegree*Math.PI/180);
        this.context.drawImage(allImg, sourceX, sourceY,tankSize,tankSize, fixX, fixY,tankSize,tankSize);

        frameIndex++;
        if (frameIndex == animationFrames.length) {
            frameIndex=0;
        }
        this.context.restore();
    }
}
export default connect(state => {
    return {
        tank_player: state.tank_player
    };
}, (dispatch, getState) => ({
    onKeyDown: ({keyCode} = {}) => dispatch(action_key_down(keyCode, getState().tileMap)),
    onKeyUp: ({keyCode} = {}) => dispatch(action_key_up(keyCode)),
}))(TankCanvas);