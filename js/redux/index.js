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
const componentsBindWithStore = [];
const subscribeComponentToStore = obj => componentsBindWithStore.push(obj);
const componentReRender = () => {
    componentsBindWithStore.forEach(item => item.render());
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
/*
* 暴露方法: 绑定组件
* */
export const combineReducer = obj => {
    addReducer(obj);
    dispatch();
};
// highOrderComponent
const noneFunc = function () {};
const defaultMapStateToProps = function (state, parentProps) {
    return Object.assign({}, state, {parentProps});
};
export const connect = (mapStateToProps = defaultMapStateToProps, mapDispatchToProps = noneFunc) => (Component = noneFunc) => {
    // const dispatchProps = mapDispatchToProps(dispatch, getState);
    const getProps = (parentProps) => {
        return Object.assign(
            {},
            mapStateToProps(getState(), parentProps),
            mapDispatchToProps(dispatch, getState)
        );
    };
    return class WrapComponent extends Component {
        constructor(initialParentProps) {
            super(
                getProps(initialParentProps)
            );
            const originalRender = (this.render || noneFunc).bind(this);
            // 重写render
            this.render = parentProps => {
                const
                    props = getProps(parentProps || initialParentProps),
                    oldProps = this.props;
                this.props = props;
                if(!this.componentWillUpdate || this.componentWillUpdate(props, oldProps)){
                    originalRender(props);
                }
            };
            // 绑定组件到store
            subscribeComponentToStore(this);
            // 渲染
            this.render();
        }
    }
};
