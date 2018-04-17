import 'phaser'
import Preload  from './scenes/preload'
import MainMenu from './scenes/MainMenu'
import level1 from './scenes/Level1'
import townMap from './scenes/Town'

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        townMap, Preload,level1, MainMenu
    ]
};

let game = new Phaser.Game(config);

window.onresize = function () {

    game.renderer.resize(window.innerWidth, window.innerHeight);
    game.events.emit('resize');
};