import MessagePopUp from '../objects/MessagePopUp'
import Player from '../objects/player'
import getItem from '../objects/Items.js'

export default class Inventory extends Phaser.Scene {

    constructor(config) {
        super({key: 'inventory'});

    }

    create(){
        this.add.text(0,0,'START', {fontSize: '24px', fontFamily: 'UnifrakturCook', fill: '#000'});
    }
}