import {connect} from "../../redux/index";
import Tank from '../common/Tank';
import {action_renderTank} from "../EnemyTank/action";

class enemyTank extends Tank{
    constructor(config){
        super();
        this.config = config;
    }
    componentWillUpdate (newProps, oldProps) {
        return !oldProps || newProps.enemyTank !== oldProps.enemyTank;
    }
    renderEnemy(){
        this.props && this.props.renderTank(this.config);
    }
    render(props){
        this.clearCanvas();
        props.enemyTank.list.forEach(tank =>{
            this.paintTank(tank);
        });
    }
}

export default connect(state => state, (dispatch, getState) => ({
    renderTank: (pos) => action_renderTank(pos)(dispatch, getState),
    onKeyUp: ({keyCode} = {}) => dispatch(action_key_up(keyCode))
}))(enemyTank);