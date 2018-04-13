import 'phaser'
import Preload  from './scenes/preload'
import MainMenu from './scenes/MainMenu'
import level1 from './scenes/Level1'


const config = {
    width: 1024,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        Preload, MainMenu, level1
    ]
};

let game = new Phaser.Game(config);

window.onresize = function () {

    game.renderer.resize(window.innerWidth, window.innerHeight);
    game.events.emit('resize');
};