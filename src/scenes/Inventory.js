import MessagePopUp from '../objects/MessagePopUp'
import Player from '../objects/player'
import getItem from '../objects/Items.js'

export default class Inventory extends Phaser.Scene {

    constructor(config) {
        super({key: 'inventory'});

    }
    init(data){
        this.player = data.player;
        this.lastScene = this.scene.get(data.player.scene);
        console.log(this.lastScene);
    }


    create() {
        this.add.text(20, 20, 'CLICK TO EQUIP', {fontSize: '24px', fontFamily: 'UnifrakturCook', fill: '#ffffff'});
        this.closeButton = this.add.sprite(20, 170, 'exitButton').setInteractive();
        for (let i = 0; i < this.player.inventory.length; i++) {
            if (this.player.inventory[i].name === 'HAIR') {

            } else {
                //let invItem = this.add.sprite(0, 0, this.player.inventory[i].image[0]).setInteractive().setOrigin(.5);
                let invText = this.add.text(60, (i + 2) * 35, this.player.inventory[i].name + ":  " + this.player.inventory[i].quantity, {
                    fontSize: '24px',
                    fontFamily: 'UnifrakturCook',
                    fill: '#ffffff'
                }).setInteractive().setOrigin(0).setName(this.player.inventory[i].name);
                //Phaser.Display.Align.To.LeftBottom(invItem, invText);
            }

        }
        this.closeButton.on('pointerdown', this.closeInventory, this);
        /* this.invText.children.iterate(function(child){
             child.setInteractive();
         });*/
        this.input.on('gameobjectdown', function (pointer, gameObject){
            this.scene.equipItem(pointer, gameObject);
        });
    }


    equipItem(pointer, invItem){

        for(let i = 0; i < this.player.inventory.length; i++){
            if(this.player.inventory[i].name === invItem.name){
                        this.player.equipItem(this.player.inventory[i], this.lastScene.blockedObjects);
                        console.log(this.player.equipment);
                }

            }
        }

    closeInventory(){
        this.scene.stop('inventory');
        this.scene.resume(this.player.scene);
    }

    //this.add.text(20,i*20,element.name + ":  " + element.quantity,{fontSize: '24px', fontFamily: 'UnifrakturCook', fill: '#ffffff'})
}