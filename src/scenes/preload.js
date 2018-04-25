import Player from "../objects/player";
import getConversation from "../objects/Conversations";

export default class Preload extends Phaser.Scene{

    constructor(config){
        super({key: 'Preload', files:[{type: 'image', key: 'logo', url: 'assets/images/gwkLogo.png'}, {type:'image', key:'logoBar', url: 'assets/images/gwkPreloadBar.png'}]});
    }

    preload(){
        this.cWidth = this.sys.game.config.width;
        this.cHeight = this.sys.game.config.height;
        this.logo = this.add.image(this.cWidth/2, this.cHeight/2-100, 'logo').setScale(.3);
        this.barLogo = this.add.image(this.logo.x-(this.logo.displayWidth*.4), (this.logo.displayHeight)+75, 'logoBar').setScale(.356).setOrigin(0,0);

        var barCover = this.add.graphics();
        var barX = this.barLogo.x;
        var barDisplayWidth = this.barLogo.displayWidth;
        var barDisplayHeight = this.barLogo.displayHeight;
        var barY = this.barLogo.y;

        this.load.on('progress', function (value){

            barCover.clear();
            barCover.fillStyle(0x000000, 1);
            barCover.fillRect((barX + barDisplayWidth*value), barY, barDisplayWidth, barDisplayHeight);
        });

        this.sys.game.events.on('resize', this.resize, this);

        //this.resize();

        this.load.spritesheet('playerE', 'assets/images/BODY_EAST.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('playerW', 'assets/images/BODY_WEST.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('playerN', 'assets/images/BODY_NORTH.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('playerS', 'assets/images/BODY_SOUTH.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('deadMale', 'assets/images/BODY_male.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('LeatherB', 'assets/images/TORSO_leather_armor_torso.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('LeatherD', 'assets/images/TORSO_leather_armor_bracers.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('LeatherA', 'assets/images/TORSO_leather_armor_shirt_white.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('LeatherC', 'assets/images/TORSO_leather_armor_shoulders.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('CommonA', 'assets/images/FEET_shoes_brown.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('CommonB', 'assets/images/HEAD_hair_blonde.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('CommonC', 'assets/images/LEGS_pants_greenish.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('gui', 'assets/images/panel_brown.png');
        this.load.image('itemTiles', 'assets/images/ProjectUtumno_full.png');
        this.load.image('townTiles1', 'assets/images/town.png');
        this.load.image('backgroundTiles2', 'assets/images/trees_plants.png');
        this.load.image('backgroundTiles1', 'assets/images/trees_plants_rocks.png');
        this.load.image('title', 'assets/images/title.png');
        this.load.tilemapTiledJSON('forest', 'assets/tilemaps/forest.json');
        this.load.tilemapTiledJSON('town', 'assets/tilemaps/town.json');
        this.load.image('button', 'assets/images/buttonLong_blue.png');
        this.load.image('exitButton', 'assets/images/closeX.png');
        this.load.image('exitBackground', 'assets/images/exitBackground.png');
        this.load.image('buttonPressed', 'assets/images/buttonLong_blue_pressed.png');
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('sign', 'assets/images/sign.png');
        this.load.image('gate', 'assets/images/gate.png');
        this.load.image('armorLeatherIcon', 'assets/images/leatherArmorIcon.png');
        this.load.image('bracersLeatherIcon', 'assets/images/leatherBracersIcon.png');
        this.load.image('shouldersLeatherIcon', 'assets/images/leatherShouldersIcon.png');
        this.load.image('pantsIcon', 'assets/images/pantsIcon.png');
        this.load.image('shirtIcon', 'assets/images/shirtIcon.png');
        this.load.image('shoesIcon', 'assets/images/shoesIcon.png');
        this.load.image('arianna', 'assets/images/womanCharacter.png');
        this.load.image('lukas', 'assets/images/maleCharacter.png');
        this.load.image('attackCircle','assets/images/attackCircle.png');


    }

    create(){

        this.time.delayedCall(1000, this.callMenu, [], this);


    }

    resize(){
        this.logo.setPosition(this.cWidth/2, this.cHeight/2-100);
        this.barLogo.setPosition(this.logo.x-(this.logo.displayWidth*.4), (this.logo.displayHeight)+75);
    }

    callMenu(){
        //this.player = new Player(this, 0, 0, ' ', 0);
        //this.scene.start('dialog', {player: this.player, content: getConversation('prologue'), scene: this});
        this.scene.start('MainMenu');
    };

}

