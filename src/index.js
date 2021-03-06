import 'phaser'
import Preload  from './scenes/preload'
import MainMenu from './scenes/MainMenu'
import level1 from './scenes/Level1'
import townMap from './scenes/Town'
import inventory from './scenes/Inventory'
import dialog from './scenes/Dialog'
import battle from './scenes/Battle'
import gameOver from './scenes/GameOver'
import battleWin from './scenes/BattleWin'
import abilityMan from './scenes/AbilitiesManager'
import message from './scenes/MessagePopUp'
import battleItem from './scenes/BattleItem'

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
        Preload, level1, MainMenu, townMap, inventory, dialog, battle, gameOver, battleWin, abilityMan, message, battleItem
    ]
};

let game = new Phaser.Game(config);

/*window.onresize = function () {
    game.renderer.resize(window.innerWidth, window.innerHeight);
    game.events.emit('resize');
};*/