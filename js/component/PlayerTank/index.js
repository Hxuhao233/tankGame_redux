import {connect} from "../../redux/index";
import {action_key_down, action_key_up, action_set_position} from "./action";
import Tank from '../common/Tank';

class PlayerTank extends Tank{
    constructor(props){
        super();
        this.bindEvent(props);
        props.setPos(props.parentProps.player);
    }
    bindEvent (props) {
        document.body.addEventListener('keydown', props.onKeyDown);
        document.body.addEventListener('keyup', props.onKeyUp);
    }
    componentWillUpdate (newProps, oldProps) {
        return !oldProps || newProps.playerTank !== oldProps.playerTank;
    }
    render(props){
        this.clearCanvas();
        if(!props.playerTank.isBroken){
            this.paintTank(props.playerTank);
        }
    }
}
export default connect(undefined, (dispatch, getState) => ({
    onKeyDown: ({keyCode} = {}) => action_key_down(keyCode, getState().map)(dispatch, getState),
    onKeyUp: ({keyCode} = {}) => dispatch(action_key_up(keyCode)),
    setPos: pos => dispatch(action_set_position(pos))
}))(PlayerTank);