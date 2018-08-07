import {canvasHeight, canvasWith} from "../constant/config";

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
