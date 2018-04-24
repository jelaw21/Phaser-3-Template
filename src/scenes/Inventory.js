export default class Inventory extends Phaser.Scene {

    constructor(config) {
        super({key: 'inventory'});

    }

    init(data){
        this.player = data.player;
        this.lastScene = this.scene.get(data.player.scene);
    }

    create() {
        this.background = this.add.image(0, 0, 'gui').setDisplaySize(384, 256).setOrigin(0);

        this.add.text(20, 20, this.player.inventory[0].name + ":  " + this.player.inventory[0].quantity, {fontSize: '24px', fontFamily: 'UnifrakturCook', fill: '#ffffff'});
        this.add.text(20, 40, 'Click Icon to Equip', {fontSize: '24px', fontFamily: 'UnifrakturCook', fill: '#ffffff'});
        this.closeButton = this.add.sprite(this.background.displayWidth-16, this.background.displayHeight - 16, 'exitButton').setInteractive().setOrigin(1,1);
        //Phaser.Display.Align.To.RightTop(this.closeButton, this.background);
        for (let i = 1; i < this.player.inventory.length; i++) {
            if (this.player.inventory[i].name === 'HAIR') {

            } else {
                let invItem = this.add.sprite(0, 0, this.player.inventory[i].icon).setInteractive().setOrigin(0.5).setSize(16,16).setName(this.player.inventory[i].name);
                let invText = this.add.text(60, (i + 2) * 25, "   " + this.player.inventory[i].name + ":  " + this.player.inventory[i].quantity, {
                    fontSize: '16px',
                    fontFamily: 'UnifrakturCook',
                    fill: '#ffffff'
                }).setOrigin(0).setName(this.player.inventory[i].name);
                Phaser.Display.Align.To.LeftTop(invItem, invText);
            }

        }
        this.closeButton.on('pointerdown', this.closeInventory, this);

        this.input.on('gameobjectdown', function (pointer, gameObject){
            this.scene.equipItem(pointer, gameObject);
        });
    }

    equipItem(pointer, invItem){

        for(let i = 0; i < this.player.inventory.length; i++){
            if(this.player.inventory[i].name === invItem.name){
                if(this.player.inventory[i].equipped === true){
                    this.player.inventory[i].equipped = false;
                    this.player.buildEquipped(this.player, this.lastScene.blockedObjects);
                }else{
                    this.player.equipItem(this.player.inventory[i], this.lastScene.blockedObjects);
                    this.player.inventory[i].equipped = true;
                }
                }
            }
        }

    closeInventory(){
        this.scene.stop('inventory');
        this.scene.resume(this.player.scene);
    }

    //this.add.text(20,i*20,element.name + ":  " + element.quantity,{fontSize: '24px', fontFamily: 'UnifrakturCook', fill: '#ffffff'})
}