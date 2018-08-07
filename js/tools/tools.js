import {canvasHeight, canvasWith, speed} from "../constant/config";
import {keyboard} from "../constant/index";
const {LEFT, RIGHT, UP, DOWN} = keyboard;
import {getXSpeed, getYSpeed} from "../component/PlayerTank/reducer";
import {tankMapCollision} from "./Collision";

export const renderContext  = () => {
    const MapCanvas = document.createElement('canvas');
    document.body.appendChild(MapCanvas);
    MapCanvas.width = canvasWith;
    MapCanvas.height = canvasHeight;
    return {
        dom: MapCanvas,
        context: MapCanvas.getContext('2d')
    };
};

export const timer = {
    setInterval(callback, gap){
        return window.setInterval(callback, gap || 16.67);
    },
    clearInterval(timerId){
        return window.clearInterval(timerId);
    }
};


export const getXSpeed = key => key === LEFT ? -speed : key === RIGHT ? speed : 0;
export const getYSpeed = key => key === UP ? -speed : key === DOWN ? speed : 0;
export const getTankNextPos = (state, map) => {
    if(state.speed){
        let tank = Object.assign({}, state, {
            tempX: state.x + getXSpeed(state.dir),
            tempY: state.y + getYSpeed(state.dir)
        });
        // 判断是否碰到箱子
        let isCollision = tankMapCollision(tank, map);
        if(!isCollision){
            tank.isHitWall = false;
            tank.x = tank.tempX;
            tank.y = tank.tempY;
            return tank;
        }else{
            tank.isHitWall = true;
            return tank;
        }
    }
};