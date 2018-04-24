import 'phaser'
import Preload  from './scenes/preload'
import MainMenu from './scenes/MainMenu'
import level1 from './scenes/Level1'
import townMap from './scenes/Town'
import inventory from './scenes/Inventory'
import dialog from './scenes/Dialog'
import battle from './scenes/Battle'

const config = {
    width: 800,
    height: 600,
    parent:'phaser-app',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        Preload, level1, MainMenu, townMap, inventory, dialog, battle
    ]
};

let game = new Phaser.Game(config);

/*window.onresize = function () {
    game.renderer.resize(window.innerWidth, window.innerHeight);
    game.events.emit('resize');
};*/