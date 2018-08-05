import '../css/index.css';
import {combineReducer} from './redux/index';
import {tankReducer} from './component/Tank/reducer';
import {mapReducer} from './component/Map/reducer';
import {bulletReducer} from './component/Bullet/reducer';
import MapCanvas from './component/Map/index';
import TankCanvas from "./component/Tank/index";
import BulletCanvas from "./component/Bullet/index";

class App {
    constructor () {
        this.init();
    }
    async init(){
        await this.preLoad();
        new MapCanvas();
        new TankCanvas();
        new BulletCanvas();
        // 初始化数据处理器
        combineReducer({
            map: mapReducer,
            tank_player: tankReducer,
            bullets: bulletReducer
        });
    }
    preLoad(){
        return new Promise(r => {
            const tileSheet = new Image();
            tileSheet.addEventListener('load', r, false);
            tileSheet.src = "./image/tanks_sheet.png";
        });
    }
}

new App();