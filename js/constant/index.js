// tanks_sheet.png是集成图, 有32个图像组成, 这里使用到以下四个
export const
    ZZ = 31,  	// 箱子(横向)
    NN = 32, 	// 箱子(竖向)
    __ =  1, 	// 通道
    QQ = 11, 	// 坦克
    XX = 26; 	// 墙

const Keyboard = function(){
    this.UP = 38;
    this.DOWN = 40;
    this.RIGHT = 39;
    this.LEFT = 37;

    this.SPACE = 32;
    this.TAB = 9;
    this.ENTER = 13;
    this.CTRL = 17;
    this.ALT = 18;

    this.Num0 = 48;
    this.Num1 = 49;
    this.Num2 = 50;
    this.Num3 = 51;
    this.Num4 = 52;
    this.Num5 = 53;
    this.Num6 = 54;
    this.Num7 = 55;
    this.Num8 = 56;
    this.Num9 = 57;

    this.A = 65;
    this.B = 66;
    this.C = 67;
    this.D = 68;
    this.E = 69;
    this.F = 70;
    this.G = 71;
    this.H = 72;
    this.I = 73;
    this.J = 74;
    this.K = 75;
    this.L = 76;
    this.M = 77;
    this.N = 78;
    this.O = 79;
    this.P = 80;
    this.Q = 81;
    this.R = 82;
    this.S = 83;
    this.T = 84;
    this.U = 85;
    this.V = 86;
    this.W = 87;
    this.X = 88;
    this.Y = 89;
    this.Z = 90;

};
export const keyboard = new Keyboard();
export const EVENT_KEY_DOWN = 'EVENT_KEY_DOWN';
export const EVENT_KEY_UP = 'EVENT_KEY_UP';
export const EVENT_BULLET_FLY = 'EVENT_BULLET_FLY';
export const RENDER_BULLET = 'RENDER_BULLET';
export const REPAINT_MAP = 'REPAINT_MAP';

export const GRID = 26;
export const STREET = 1;
