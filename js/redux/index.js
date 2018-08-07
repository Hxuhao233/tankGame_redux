import {getState, setState} from './store';
import Tank from "../component/common/Tank";
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
                // {parentProps: item.parentProps},
                item.childPropsHandler(getState(), item.parentProps),
                item.dispatchPropHandler(dispatch, getState)
            ),
            {component} = item,
            oldProps = component.props;
        component.props = props;
        if(component.componentWillUpdate(props, oldProps) && component.render){
            component.render(props);
        }
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
const defaultChildPropsHandler = function (state, parentProps) {
    return Object.assign({}, state, {parentProps});
};
export const connect = (childPropsHandler = defaultChildPropsHandler, dispatchPropHandler = noneFunc) => (Component = noneFunc) => {
    const getProps = (parentProps) => {
        return Object.assign(
            {},
            childPropsHandler(getState(), parentProps),
            dispatchPropHandler(dispatch, getState)
        );
    };
    return class WrapComponent extends Component {
        constructor(parentProps) {
            const props = getProps(parentProps);
            super(props);
            this.props = props;
            this.componentWillUpdate = this.componentWillUpdate || function () {
                return true;
            };
            // 绑定组件到state
            subscribeComponentToState({
                component: this,
                parentProps,
                childPropsHandler,
                dispatchPropHandler
            });
            // 渲染
            this.render && this.render();
        }
    }
    // return function WrapComponent (...argument) {
    //     // 构建
    //     // const component = new Component(...argument);
    //     component.componentWillUpdate = component.componentWillUpdate || function () {
    //         return true;
    //     };
    //
    //     componentReRender();
    // }
};
