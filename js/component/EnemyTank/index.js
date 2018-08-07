import {connect} from "../../redux/index";
import Tank from '../common/Tank';

class enemyTank extends Tank{
    componentWillUpdate (newProps, oldProps) {
        if(oldProps && newProps.enemyTank === oldProps.enemyTank){
            return false;
        }
        return true;
    }
    renderEnemy(){

    }
    render(props){
        this.clearCanvas();
        // props.enemyTank.list.forEach(tank =>{
        //     this.paintTank(tank);
        // });
    }
}
export default connect(state => state, (dispatch, getState) => ({
}))(enemyTank);