import {
    tankSize,
    allImg,
    canvasHeight,
    canvasWith
} from '../../constant/config';
import {keyboard} from "../../constant";
import {renderContext} from "../../tools/tools";
export const getDegree = keyCode => ({
    [keyboard.LEFT]: 270,
    [keyboard.RIGHT]: 90,
    [keyboard.UP]: 0,
    [keyboard.DOWN]: 180
})[keyCode];
const animationFrames = {
    1: [1,2,3,4,5,6,7,8],
    2: [9,10,11,12,13,14,15,16],
};

class Tank {
    constructor (type){
        this.context = renderContext().context;
        this.frameIndex = 0;
        this.animationFrames = animationFrames[type];
    }
    clearCanvas(){
        this.context.clearRect(0, 0, canvasWith, canvasHeight);
    }
    paintTank(config){
        if(!this.context){
            return;
        }
        this.context.save();
        const {animationFrames, frameIndex} = this;
        let sourceX=Math.floor(animationFrames[frameIndex] % 8) * 32;
        let sourceY=Math.floor(animationFrames[frameIndex] / 8) * 32;
        let currentDegree = getDegree(config.dir);
        let fixX = - tankSize / 2;
        let fixY = - tankSize / 2;
        this.context.translate(config.x - fixX, config.y - fixY);
        this.context.rotate(currentDegree*Math.PI/180);
        this.context.drawImage(allImg, sourceX, sourceY,tankSize,tankSize, fixX, fixY,tankSize,tankSize);
        this.frameIndex++;
        if (this.frameIndex == animationFrames.length) {
            this.frameIndex=0;
        }
        this.context.restore();
    }
}
export default Tank;
