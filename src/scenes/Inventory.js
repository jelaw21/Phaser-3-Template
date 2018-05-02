import PlayerSprite from "../objects/playerSprite";

export default class Inventory extends Phaser.Scene {

    constructor(config) {
        super({key: 'inventory'});

    }

    init(data){
        this.player = data.player;
        this.lastScene = data.scene;
        this.sprite = data.sprite;
        this.blockedObjects = [];
    }

    create() {
        //bump  TODO: consider adding to a container.
        this.cWidth = this.sys.game.config.width;
        this.cHeight = this.sys.game.config.height;
        this.background = this.add.image(this.cWidth/2, this.cHeight/2, 'inventoryGUI').setDisplaySize(512, 512);

        let count = 0;
        this.itemBox = [];
        this.playerInfoText = {
            fontSize: 20,
            fontFamily: 'Marmelad',
            fill: 'white',
            stroke: '#222',
            strokeThickness: 2,
            wordWrap:{
                width: this.background.displayWidth-5,
                useAdvancedWrap: true
            }
        };
        this.playerInfoNumbers = {
            fontSize: 16,
            fontFamily: 'Marmelad',
            fill: 'white',
            stroke: '#222',
            strokeThickness: 2,
            wordWrap:{
                width: this.background.displayWidth-5,
                useAdvancedWrap: true
            }
        };
        this.itemNameStyle = {
            fontSize: 16,
            fontFamily: 'Sanchez',
            fill: 'white',
            stroke: '#222',
            strokeThickness: 1,
            wordWrap:{
                width: this.background.displayWidth-5,
                    useAdvancedWrap: true
            }
        };

        this.itemDescStyle = {
            fontSize: 24,
            fontFamily: 'Cute Font',
            stroke: '#222',
            strokeThickness: 1,
            wordWrap:{
                width: this.background.displayWidth-20,
                useAdvancedWrap: true
            }
        };
        /*this.itemDescStyle = {
            fontSize: 24,
            fontFamily: 'Cute Font',
            stroke: '#000',
            strokeThickness: 2,
            shadowOffsetX: 0,
            shadowOffsetY: 50,
            shadowColor: '#000',
            shadowBlur: 2,
            shadowStroke: true,
            shadowFill: true,
            wordWrap:{
                width: this.background.displayWidth-5,
                useAdvancedWrap: true
            }
           }*/

        //this.title = this.add.text(this.cWidth/2-4, 62, "INVENTORY", {fontSize: 20, fontFamily: 'Berkshire Swash', fill: '#000'}).setOrigin(.5);
        this.title = this.add.bitmapText(this.cWidth/2-4, 62, 'livingstone',"INVENTORY", 30).setOrigin(.5);
        this.invSprite = new PlayerSprite(this, this.cWidth/2, 132, 'playerS', 0);
        this.add.text(this.cWidth/2, 200, 'HEALTH: ' + this.player.getHealth() + '/' + this.player.getMaxHealth(), this.playerInfoText).setOrigin(.5);

        this.add.existing(this.invSprite);
        this.invSprite.init(this.player);
        this.invSprite.buildEquipped();
        let minicam = this.cameras.add(this.cWidth/2-48, 132-48, 96 , 96);
        minicam.setBackgroundColor(0x002244).setZoom(1.5).startFollow(this.invSprite);
        this.add.text(164, 72, 'LEVEL: ' + this.player.getLevel(), this.playerInfoText).setInteractive().setName('LEVEL');
        this.add.text(164, 122, 'EXPERIENCE:  ' + this.player.getExp(), this.playerInfoNumbers);
        this.add.text(164, 162, 'EXP TO LVL ' + (this.player.getLevel() + 1) + ': ' + this.player.expToNextLevel(), this.playerInfoNumbers),
        this.add.text(510, 72, this.player.inventory[0].getName() + ":  " + this.player.inventory[0].getQuantity(), this.playerInfoText);
        this.armorText = this.add.text(510, 122, 'ARMOR: ' + this.player.getArmor(), this.playerInfoNumbers).setInteractive().setName('ARMOR');
        this.maxArmorText = this.add.text(510, 163, 'MAX ARMOR: ' + this.player.getMaxArmor(), this.playerInfoNumbers).setInteractive().setName('MAXARMOR');
        this.add.text(164, 200, 'Click Icon to Equip', {fontSize: '24px', fontFamily: 'Cute Font', fill: '#ffffff'});
        this.itemNameText = this.add.text(164, 480, 'ITEM NAME', this.itemNameStyle).setVisible(false);
        this.itemDescText = this.add.text(164, 500, 'ITEM DESCRIPTION', this.itemDescStyle).setVisible(false);
        this.itemInfo1 = this.add.text(164, 520, 'ARMOR PROTECTION %: ', this.itemDescStyle).setVisible(false);
        this.itemInfo2 = this.add.text(384, 520, 'MAX PROTECTION PTS: ', this.itemDescStyle).setVisible(false);
        this.closeButton = this.add.image(652, 64, 'exitButton').setInteractive();

        //this.player.inventory.length
        for(let i = 0; i < 5; i++){
            for(let j = 0; j< 12; j++){
                this.itemBox.push(this.add.image(((j)*40)+160, ((i)*40) + 251, 'itemBox').setOrigin(0).setData('ID', count));
                count++;
            }
        }
        for (let i = 1; i < this.player.inventory.length; i++) {
            if (this.player.inventory[i].getName() === 'HAIR') {

            } else {
                let invItem = this.add.sprite(0, 0, this.player.inventory[i].getIcon()).setInteractive().setOrigin(0.5).setSize(24,24).setName(this.player.inventory[i].getName());
                for(let j = 0; j < this.itemBox.length; j++){
                    if(this.itemBox[j].getData('ID')=== (i-1))
                        Phaser.Display.Align.In.Center(invItem, this.itemBox[j]);
                }
            }
        }
        this.closeButton.on('pointerdown', this.closeInventory, this);

        this.input.on('gameobjectdown', function (pointer, gameObject){
            this.scene.equipItem(pointer, gameObject);
        });

        this.input.on('gameobjectover', this.showDescr, this);
        this.input.on('gameobjectout', this.clearDescr, this);

        this.invKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);

    }

    update(){
        if(Phaser.Input.Keyboard.JustDown(this.invKey)){
            if (this.scene.isActive('inventory')) {
                this.scene.stop('inventory');
                this.scene.resume(this.lastScene);

            }
        }

        this.armorText.setText('ARMOR: ' + this.player.getArmor());
        this.maxArmorText.setText('MAX ARMOR: ' + this.player.getMaxArmor());
    }


    equipItem(pointer, invItem){
        for(let i = 0; i < this.player.inventory.length; i++){
            if(this.player.inventory[i].getName() === invItem.name){
                if(this.player.inventory[i].getEquipped() === true){
                    this.player.inventory[i].setEquipped(false);
                    this.sprite.buildEquipped(this.sprite, this.lastScene.blockedObjects);
                    this.invSprite.buildEquipped(this.invSprite, this.lastScene.blockedObjects);
                }else{
                    this.player.equipItem(this.player.inventory[i]);
                    this.sprite.buildEquipped(this.sprite, this.lastScene.blockedObjects);
                    this.invSprite.buildEquipped(this.invSprite, this.lastScene.blockedObjects);
                    this.player.inventory[i].setEquipped(true);
                }
                }
            }
        }

    showDescr(pointer, invItem){
        if(invItem.name === 'LEVEL' || invItem.name === 'ARMOR' || invItem.name === 'MAXARMOR' ){
            if(invItem.name === 'LEVEL') {
                this.itemNameText.setText('LEVEL').setVisible(true);
                this.itemDescText.setText('Currently only updates Health. In the future, may determine if an item can be equipped.').setVisible(true);
            }else if(invItem.name === 'ARMOR') {
                this.itemNameText.setText('ARMOR').setVisible(true);
                this.itemDescText.setText('The perecentage of damage the armor protects against. ').setVisible(true);
            }else if(invItem.name === 'MAXARMOR') {
                this.itemNameText.setText('MAX ARMOR').setVisible(true);
                this.itemDescText.setText('The maximum protection the armor provides. If armor protect percentage is above this, this is the protection amount.').setVisible(true);
            }

        }else{
            for(let i = 0; i < this.player.inventory.length; i++){
                let item = this.player.inventory[i];
                if(item.getName() === invItem.name){
                    this.itemNameText.setText(item.getName() + "  (" + item.getQuantity() + ")").setVisible(true);
                    this.itemDescText.setText(item.getDesc()).setVisible(true);
                    if(item.getType() === 'ARMOR'){
                        this.itemInfo1.setText("ARMOR PROTECTION %: " + item.getEffect()).setVisible(true);
                        this.itemInfo2.setText("MAX PROTECTION PTS: " + item.getMaxEffect()).setVisible(true);
                    }
                    if(item.getType() === 'WEAPON'){
                        let abilitiesList = '';
                        for(let i = 0; i< item.getAbilities().length; i++){
                            if(i === item.getAbilities().length -1 ){
                                abilitiesList += item.getAbility(i).toUpperCase();
                            }else
                                abilitiesList += item.getAbility(i).toUpperCase() + ', ';

                        }
                        this.itemInfo1.setText("AVAILABLE ABILITIES: " + abilitiesList).setVisible(true);
                    }

                }
            }
        }

    }

    //bump

    clearDescr(pointer, invItem){
        this.itemNameText.setVisible(false);
        this.itemDescText.setVisible(false);
        this.itemInfo1.setVisible(false);
        this.itemInfo2.setVisible(false);
    }

    closeInventory(){
        this.scene.stop('inventory');
        this.scene.resume(this.lastScene);
    }

    //push

}