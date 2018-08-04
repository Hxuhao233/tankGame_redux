// 缓存：绑定reducer的组件
let state = {};
const bindStateComponent = [];
let reducerHandlers = {};
const noneFunc = function () {};
let timer;

export const combineReducer = obj => {
    reducerHandlers = Object.assign(reducerHandlers, obj);
    dispatch();
};

export const getState = () => Object.assign({}, state);

export const dispatch = (obj) => {
    let needRePaint = false;
    Object.keys(reducerHandlers).forEach(key => {
        const newState = reducerHandlers[key](state[key], obj);
        if(newState !== state[key]){
            state[key] = newState;
            needRePaint = true;
        }
    });
    if(needRePaint){
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            triggerComponent(state)
        }, 2);
    }
};

export const triggerComponent = (state) => {
    bindStateComponent.forEach(item => {
        const
            props = Object.assign(
                {},
                item.childPropsHandler(state),
                item.dispatchPropHandler(dispatch, getState)
            ),
            {component} = item;
        if(component.componentWillUpdate(props, component._props) && component.render){
            component.render(props);
        }
        component._props = props;
    });
    timer = null;
};
// highOrderComponent
export const connect = (childPropsHandler = noneFunc, dispatchPropHandler = noneFunc) => (Component = noneFunc) => {
    return function WrapComponent (...argument) {
        this.child = new Component(...argument);
        this.child.componentWillUpdate = this.child.componentWillUpdate || function () {
            return true;
        };
        bindStateComponent.push({
            component: this.child,
            childPropsHandler,
            dispatchPropHandler
        });
    }
};
