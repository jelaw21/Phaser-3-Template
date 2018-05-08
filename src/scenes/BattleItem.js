export default class BattleItem extends Phaser.Scene {

    constructor(config) {
        super({key: 'battleItem'});

    }

    init(data) {
        this.player = data.player;
        this.last = data.scene;
        //this.sprite = data.sprite;
        //this.blockedObjects = [];
        this.scene.bringToTop();
    }

    create(){
        this.cWidth = this.sys.game.config.width;
        this.cHeight = this.sys.game.config.height;
        this.itemBox = [];
        let count = 0;
        let referenceImage = this.add.image(0,0,'itemBox').setVisible(false);

        this.itemBox.push(this.add.image(this.cWidth/2 - referenceImage.displayWidth, this.cHeight/2 - referenceImage.displayHeight, 'itemBox').setData('ID', 0));
        this.itemBox.push(this.add.image(this.cWidth/2, this.cHeight/2- referenceImage.displayHeight, 'itemBox').setData('ID', 1));
        this.itemBox.push(this.add.image(this.cWidth/2 + referenceImage.displayWidth, this.cHeight/2- referenceImage.displayHeight, 'itemBox').setData('ID', 2));


        this.itemBox.push(this.add.image(this.cWidth/2 - referenceImage.displayWidth, this.cHeight/2, 'itemBox').setData('ID', 3));
        this.itemBox.push(this.add.image(this.cWidth/2, this.cHeight/2, 'itemBox').setData('ID', 4));
        this.itemBox.push(this.add.image(this.cWidth/2 + referenceImage.displayWidth, this.cHeight/2, 'itemBox').setData('ID', 5));

        this.itemBox.push(this.add.image(this.cWidth/2 - referenceImage.displayWidth, this.cHeight/2 + referenceImage.displayHeight, 'itemBox').setData('ID', 6));
        this.itemBox.push(this.add.image(this.cWidth/2, this.cHeight/2 + referenceImage.displayHeight, 'itemBox').setData('ID', 7));
        this.itemBox.push(this.add.image(this.cWidth/2 + referenceImage.displayWidth, this.cHeight/2 + referenceImage.displayHeight, 'itemBox').setData('ID', 8));

        for(let i = 0; i < this.player.inventory.length; i++){
            if(this.player.inventory[i].type === 'POTION'){
                let item = this.add.image(0,0, this.player.inventory[i].getIcon()).setInteractive().setName(this.player.inventory[i].getName());
                Phaser.Display.Align.In.Center(item, this.itemBox[count]);
                count++
            }
        }

        this.exitButton = this.add.image(0, 0, 'exitButton').setInteractive().setName('EXIT').setOrigin(.5);

        Phaser.Display.Align.To.RightTop(this.exitButton, this.itemBox[2], 0, 20);

        this.input.on('gameobjectdown', function (pointer, gameObject){
            this.scene.takePotion(pointer, gameObject);
        });
    }

    takePotion(pointer, gameObject) {
        if (gameObject.name === 'EXIT') {
            this.scene.stop();
        } else {
            for (let i = 0; i < this.player.inventory.length; i++) {
                if (this.player.inventory[i].getName() === gameObject.name) {
                    this.item = this.player.inventory[i];
                }
            }

            if (this.player.getHealth() < this.player.getMaxHealth()) {

                if (this.scene.isActive('message') === false) {
                    let text = ['ADDED ' + this.item.getEffect() + " HEALTH."];
                    this.scene.launch('message', {player: this.player, text: text});
                }
                this.player.addHealth(this.item.getEffect());
                if (this.player.getHealth() > this.player.getMaxHealth()) {
                    this.player.health = this.player.getMaxHealth();
                }

                this.player.removeFromInventory(this.item, true);
            } else {
                if (this.scene.isActive('message') === false) {
                    let text = ['FULL HEALTH, CANNNOT USE'];
                    this.scene.launch('message', {player: this.player, text: text});
                }
            }
        }
    }

}