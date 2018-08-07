import {connect} from '../../redux/index';
import {
    bulletSize,
    canvasWith,
    canvasHeight
} from '../../constant/config';
import {keyboard} from '../../constant/index';
import {
    renderContext,
} from '../../tools/tools';
import {fireBullet, brokeTank, brokeGrid} from "./action";

class BulletCanvas {
    constructor (props){
        this.context = renderContext().context;
        this.context.fillStyle = '#0c7';
        this.paintBullet = this.paintBullet.bind(this);
        this.bindEvent(props);
    }
    componentWillUpdate (newProps, oldProps) {
        if(newProps && oldProps && newProps.bullets){
            if(newProps.bullets.brokeGrids !== oldProps.bullets.brokeGrids){
                newProps.upDateMap(newProps.bullets.brokeGrids);
            }
            if(newProps.bullets.brokeTanks !== oldProps.bullets.brokeTanks){
                newProps.brokeTank(newProps.bullets.brokeTanks);
            }
        }
        return true;
    }
    paintBullet (item) {
        this.context.beginPath();
        this.context.arc(item.x, item.y, bulletSize, 0, 360);
        this.context.fill();
    }
    bindEvent (props) {
        document.body.addEventListener('click', props.fireBullet);
    }
    render(props){
        const {list} = props.bullets;
        this.context.clearRect(0, 0, canvasWith, canvasHeight);
        return list.forEach(bullet => !bullet.isCollided && this.paintBullet(bullet));
    }
}

export default connect(undefined, (dispatch, getState) => ({
    fireBullet () {
        fireBullet(dispatch, getState)(getState().playerTank);
    },
    upDateMap(brokenGrids) {
        dispatch(brokeGrid(brokenGrids));
    },
    brokeTank(tankIdList) {
        dispatch(brokeTank(tankIdList));
    }
}))(BulletCanvas);