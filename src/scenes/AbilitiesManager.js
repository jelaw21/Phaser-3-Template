import Player from '../objects/player'
export default class AbilitiesManager extends Phaser.Scene {

    constructor() {
        super({key: 'abilityMan'});

    }

    init(data){
        this.player = data.player;
        this.player.addAbilities();
        //this.player.unarmedEXP = 50;
        //this.sprite = data.sprite;
        this.lastScene = data.scene;
        this.abilities = this.player.getAvailableAbilities();
    }

    create(){
        this.style ={
            font: '24px Arial',
                fill: 'black',
                wordWrap:{
                width: 512,
                    useAdvancedWrap: true
            }
        }

        //let graphics = this.add.graphics();

        this.image = this.add.image(this.sys.game.config.width/2, this.sys.game.config.height/2, 'guiBackground');
        //graphics.fillStyle(0x0000ff)
        //graphics.fillRect(144, 44, 512, 128);
        //graphics.fillStyle(0xff0000);
        //graphics.fillRect(144, 172, 512, 256);
        //graphics.fillStyle(0x00ff00);
        //graphics.fillRect(144, 428, 512, 128);

        //this.add.zone(0, 0, 512, 512).setOrigin(.5).setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2).setInteractive().setName('zone1');
        this.zoneHeader = this.add.zone(144,44,512,128).setName('HEADER');
        this.zoneBody = this.add.zone(144, 172, 512, 256).setName('BODY');
        this.zoneFooter = this.add.zone(144, 428, 512, 128).setName('FOOTER');
        let scene = this.scene;
        this.equippedGroup = [];
        this.abilityText = [];
        //this.input.on('pointerdown', this.seeImage, this);

        this.title = this.add.text(175 , 80, "ABILITIES: Click to Equip", this.style);
        //Phaser.Display.Align.In.Center(this.title, this.zoneHeader);
        for(let i = 0; i < this.abilities.length; i ++) {
                //this.add.text(150, (i * 30) + 180, this.abilities[i].name, this.style).setData('ID', i).setInteractive();
                let ability = (this.add.image(170, (i*50)+ 190, 'itemBox').setData('ID', i).setInteractive().setOrigin(0).setDisplaySize(48,48));
                let abilityIcon = this.add.image(170, (i*50)+ 190, this.abilities[i].icon).setOrigin(0);

                this.equippedGroup.push(this.add.image(205, (i*50)+ 225, ' ').setOrigin(.5).setSize(32, 32));
                this.abilityText.push(this.add.text(170, (i*50)+ 190, ' ', this.style).setVisible(false));
                Phaser.Display.Align.In.BottomRight(abilityIcon, ability);
        }
        this.setAbilityText();
        this.input.on('gameobjectdown', this.equipAbility, this);
        this.input.on('pointerover', this.displayName, this);
        this.input.on('pointerout', this.clearDisplayName, this);

        this.add.text(150, 478, "CLICK HERE TO CLOSE", this.style).setData('ID', 100).setInteractive();

        //Phaser.Display.Align.In.Center(this.image, this.scene.add.zone(0,0,800,600));

        //this.abilKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }
    update(){
        /*if(this.abilKey.isDown){
            console.log('ABILITY MANAGER: keypress');
            this.scene.resume(this.lastScene);
            this.scene.stop('abilityMan');

        }*/
    }

    setAbilityText(){
        let abilities = this.player.getAvailableAbilities();
        for(let i = 0; i < abilities.length; i ++) {
            if(abilities[i].active){
                this.equippedGroup[i].setTexture('checkBox');
            }else{
                this.equippedGroup[i].setTexture('uncheckBox');
            }
        }
    }

    equipAbility(pointer, gameObject){
        let index = gameObject.getData('ID');
        if(index === 100){
            this.scene.resume(this.lastScene);
            this.scene.stop('abilityMan');
        }else{
            this.player.toggleActiveAbility(this.abilities[index]);
            this.player.equipAbilities();
            this.setAbilityText();
        }
    }

    displayName(pointer, gameObject){
        let index = gameObject[0].getData('ID');
        if(index === 100) {

        }else {
            this.abilityText[index].setText(this.abilities[index].name);
            this.abilityText[index].setVisible(true);
        }

    }

    clearDisplayName(pointer, gameObject){
        let index = gameObject[0].getData('ID');
        if(index === 100) {

        }else{
            this.abilityText[index].setText(this.abilities[index].name);
            this.abilityText[index].setVisible(false);
        }

    }


    seeImage(){
        if(this.image.visible === true){
            this.image.setVisible(false)
        }else
            this.image.setVisible(true)
    }

}