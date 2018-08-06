import {renderContext} from "../../tools/tools";
import {connect} from "../../redux/index";
import {action_key_down, action_key_up} from "./action";
import Tank from '../common/Tank';

class PlayerTank extends Tank{
    constructor (){
        super();
        this.context = renderContext().context;
    }
    bindEvent (props) {
        document.body.addEventListener('keydown', props.onKeyDown);
        document.body.addEventListener('keyup', props.onKeyUp);
    }
    componentWillUpdate (newProps, oldProps) {
        if(oldProps && newProps.tank_player === oldProps.tank_player){
            return false;
        }
        return true;
    }
    render(props){
        if(!this.inited){
            this.bindEvent(props);
            this.inited = true;
        }
        this.context.clearRect(0,0,500,500);
        this.paintTank(props.tank_player);
    }
}
export default connect(state => state, (dispatch, getState) => ({
    onKeyDown: ({keyCode} = {}) => dispatch(action_key_down(keyCode, getState().map)),
    onKeyUp: ({keyCode} = {}) => dispatch(action_key_up(keyCode))
}))(PlayerTank);