import {connect} from "../../redux/index";
import {action_key_down, action_key_up} from "./action";
import Tank from '../common/Tank';

class PlayerTank extends Tank{
    bindEvent (props) {
        document.body.addEventListener('keydown', props.onKeyDown);
        document.body.addEventListener('keyup', props.onKeyUp);
    }
    componentWillUpdate (newProps, oldProps) {
        if(oldProps && newProps.playerTank === oldProps.playerTank){
            return false;
        }
        return true;
    }
    render(props){
        if(!this.inited){
            this.bindEvent(props);
            this.inited = true;
        }
        this.clearCanvas();
        this.paintTank(props.playerTank);
    }
}
export default connect(state => state, (dispatch, getState) => ({
    // onKeyDown: ({keyCode} = {}) => dispatch(action_key_down(keyCode, getState().map)),
    onKeyDown: ({keyCode} = {}) => action_key_down(keyCode, getState().map)(dispatch, getState),
    onKeyUp: ({keyCode} = {}) => dispatch(action_key_up(keyCode))
}))(PlayerTank);