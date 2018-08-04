import {connect} from '../../redux/index';
import {
    bulletSize,
    canvasWith,
    canvasHeight
} from '../../constant/config';
import {
    renderContext,
} from '../../tools/tools';
import {fireBullet, moveBullet, brokeGrid} from "./action";

let timer;
class BulletCanvas {
    constructor (){
        this.context = renderContext().context;
        this.context.fillStyle = '#0c7';
        this.paintBullet = this.paintBullet.bind(this);
    }
    componentWillUpdate (newProps, oldProps) {
        if(newProps && newProps.bullets.brokeGrids.length){
            let isChange = newProps.bullets.brokeGrids !== oldProps.bullets.brokeGrids;
            if(isChange){
                newProps.upDateMap(newProps.bullets.brokeGrids);
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
        if(!this.inited){
            this.bindEvent(props);
            this.inited = true;
        }
        const {list} = props.bullets;
        if((!list || !list.length) && timer){
            window.clearInterval(timer);
            timer = null;
        }
        this.context.clearRect(0, 0, canvasWith, canvasHeight);
        return list.forEach(bullet => !bullet.isCollided && this.paintBullet(bullet));
    }
}

export default connect(state => state, (dispatch, getState) => ({
    fireBullet () {
        dispatch(fireBullet(getState().tank_player));
        if(!timer){
            timer = window.setInterval(() => {
                dispatch(moveBullet(getState().tileMap));
            }, 50);
        }
    },
    upDateMap(brokenGrids) {
        dispatch(brokeGrid(brokenGrids));
    }
}))(BulletCanvas);