import 'phaser'
import Preload  from './scenes/preload'
import MainMenu from './scenes/MainMenu'

const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [
        Preload, MainMenu
    ]
};

let game = new Phaser.Game(config);

window.onresize = function () {

    game.renderer.resize(window.innerWidth, window.innerHeight);
    game.events.emit('resize');
    console.log("Event emitted");

};