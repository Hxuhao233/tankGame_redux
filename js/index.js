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
        this.state = config;
        this.init();
    }
    async init(){
        await this.preLoad();
        this.initStore();
        this.render();
    }
    preLoad(){
        return new Promise(r => {
            const tileSheet = new Image();
            tileSheet.addEventListener('load', r, false);
            tileSheet.src = "./image/tanks_sheet.png";
        });
    }
    initStore(){
        // 初始化数据处理器
        combineReducer({
            map: mapReducer,
            playerTank: playerTankReducer,
            bullets: bulletReducer,
            enemy: enemyTankReducer
        });
    }
    render(){
        this.children = [
            new MapCanvas(this.state),
            new PlayerTankCanvas(this.state),
            new EnemyTankCanvas(this.state),
            new BulletCanvas(this.state),
        ];
    }
    setState(newState){
        this.state = newState;
        this.reRender();
    }
    reRender(){
        this.children.forEach(child => child.render(this.state));
    }
}

new App(AppConfig);