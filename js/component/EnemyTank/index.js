import {connect} from "../../redux/index";
import {keyboard} from "../../constant/index";
import Tank from '../common/Tank';
import {action_renderTank} from "../EnemyTank/action";

class enemyTank extends Tank{
    constructor(props){
        super(2);
        this.renderEnemyList(props.parentProps.enemyTanks, props.parentProps.renderGap, props.renderTank);
    }
    componentWillUpdate (newProps, oldProps) {
        return !oldProps || newProps.enemy !== oldProps.enemy;
    }
    renderEnemyList(tankList, renderGap, renderTank){
        let list = tankList.slice();
        let count = 1;
        let timer = window.setInterval(() => {
            if(list.length === 0){
                return window.clearInterval(timer);
            }
            let tank = list.shift();
            tank.dir = tank.dir || keyboard.DOWN;
            tank.id = 'enemy_'+(count++);
            renderTank(tank);
        }, renderGap);
    }
    render(props){
        this.clearCanvas();
        props.enemy.list.forEach(tank => this.paintTank(tank));
    }
}

export default connect(undefined, (dispatch, getState) => ({
    renderTank: (pos, id) => action_renderTank(pos, id)(dispatch, getState)
}))(enemyTank);