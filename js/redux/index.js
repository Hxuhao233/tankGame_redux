// 缓存：绑定reducer的组件
import {getState, setState} from './store';
/*
 * reducer
 * */
let reducerHandlers = {};
const addReducer = obj => Object.assign(reducerHandlers, obj);
const dispatch = (obj) => {
    let needRePaint = false;
    Object.keys(reducerHandlers).forEach(key => {
        const
          state = getState()[key],
          newState = reducerHandlers[key](state, obj);
        if(newState !== state){
            setState({
                [key]: newState
            });
            needRePaint = true;
        }
    });
    if(needRePaint){
        triggerComponentReRender();
    }
};
/*
* Handler for State and Component, through reducer;
* */
const bindStateComponent = [];
const componentReRender = () => {
    bindStateComponent.forEach(item => {
        const
          props = Object.assign(
            {},
            item.childPropsHandler(getState()),
            item.dispatchPropHandler(dispatch, getState)
          ),
          {component} = item;
        if(component.componentWillUpdate(props, component._props) && component.render){
            component.render(props);
        }
        component._props = props;
    });
};
let timer, triggerComponentReRender = async () => {
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        componentReRender();
        timer = null;
    }, 2);
};
const subscribeComponentToState = obj => {
    bindStateComponent.push(obj);
};
/*
* 暴露方法: 绑定组件
* */
export const combineReducer = obj => {
    addReducer(obj);
    dispatch();
};
// highOrderComponent
const noneFunc = function () {};
export const connect = (childPropsHandler = noneFunc, dispatchPropHandler = noneFunc) => (Component = noneFunc) => {
    return function WrapComponent (...argument) {
        // 构建
        const component = new Component(...argument);
        component.componentWillUpdate = component.componentWillUpdate || function () {
            return true;
        };
        // 绑定组件到state
        subscribeComponentToState({
            component,
            childPropsHandler,
            dispatchPropHandler
        });
    }
};
