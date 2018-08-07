import {connect} from "../../redux/index";
import Tank from '../common/Tank';
import {action_renderTank} from "../EnemyTank/action";

class enemyTank extends Tank{
    constructor(props){
        super(2);
        this.renderEnemyList(props.parentProps.enemy, props.renderTank);
    }
    componentWillUpdate (newProps, oldProps) {
        return !oldProps || newProps.enemy !== oldProps.enemy;
    }
    renderEnemyList(config, renderTank){
        let numbers = config.numbers;
        let posList = config.pos;
        let timer = window.setInterval(() => {
            if(numbers < 0){
                return window.clearInterval(timer);
            }
            let randomPos = posList[(posList.length - 1) % numbers--];
            renderTank(randomPos, 'enemy_'+(numbers+1));
        }, config.renderGap);
    }
    render(props){
        this.clearCanvas();
        props.enemy.list.forEach(tank => this.paintTank(tank));
    }
}

export default connect(undefined, (dispatch, getState) => ({
    renderTank: (pos, id) => action_renderTank(pos, id)(dispatch, getState)
}))(enemyTank);