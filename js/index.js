import '../css/index.css';
import {combineReducer} from './redux/index';
import {playerTankReducer} from './component/PlayerTank/reducer';
import {enemyTankReducer} from './component/EnemyTank/reducer';
import {mapReducer} from './component/Map/reducer';
import {bulletReducer} from './component/Bullet/reducer';
import MapCanvas from './component/Map/index';
import PlayerTankCanvas from "./component/PlayerTank/index";
import EnemyTankCanvas from "./component/EnemyTank/index";
import BulletCanvas from "./component/Bullet/index";

import {AppConfig} from './constant/config';

class App {
    constructor (config) {
        this.init(config);
    }
    async init(config){
        await this.preLoad();
        this.initStore();
        new MapCanvas(config.level);
        new PlayerTankCanvas(config.player);
        // new EnemyTankCanvas(config.enemy);
        new BulletCanvas();
    }
    initStore(){
        // 初始化数据处理器
        combineReducer({
            map: mapReducer,
            playerTank: playerTankReducer,
            bullets: bulletReducer,
            enemyTank: enemyTankReducer
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

new App(AppConfig);