import getConversation from '../objects/Conversations'

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

        this.load.spritesheet('playerE', 'assets/images/BODY_EAST.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('playerW', 'assets/images/BODY_WEST.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('playerN', 'assets/images/BODY_NORTH.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('playerS', 'assets/images/BODY_SOUTH.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('deadMale', 'assets/images/BODY_male.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('spearGoblin', 'assets/images/spear_goblin.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('goblin', 'assets/images/goblin.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('ShortSword', 'assets/images/short_sword.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('LeatherB', 'assets/images/TORSO_leather_armor_torso.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('LeatherD', 'assets/images/TORSO_leather_armor_bracers.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('LeatherA', 'assets/images/TORSO_leather_armor_shirt_white.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('LeatherC', 'assets/images/TORSO_leather_armor_shoulders.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('CommonA', 'assets/images/FEET_shoes_brown.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('CommonB', 'assets/images/HEAD_hair_blonde.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('CommonC', 'assets/images/LEGS_pants_greenish.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('CommonSpear', 'assets/images/CommonSpear.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('itemTiles', 'assets/images/ProjectUtumno_full.png');
        this.load.image('townTiles1', 'assets/images/town.png');
        this.load.image('backgroundTiles2', 'assets/images/trees_plants.png');
        this.load.image('backgroundTiles1', 'assets/images/trees_plants_rocks.png');
        this.load.tilemapTiledJSON('forest', 'assets/tilemaps/forest.json');
        this.load.tilemapTiledJSON('town', 'assets/tilemaps/town.json');
        this.load.image('exitButton', 'assets/images/closeButton.png');
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
        this.load.image('arrow','assets/images/arrowSilver.png');
        this.load.image('uncheckBox','assets/images/uncheckBox.png' );
        this.load.image('checkBox','assets/images/checkBox.png' );
        this.load.image('punch','assets/images/punch.png' );
        this.load.image('kick','assets/images/kick.png' );
        this.load.image('buttonDown','assets/images/buttonDown.png' );
        this.load.image('buttonUp','assets/images/buttonUp.png' );
        this.load.image('messageGUI','assets/images/messageGUI.png' );
        this.load.image('battleGUI','assets/images/battleGUIDarker.png' );
        this.load.image('battleButDown','assets/images/battleButDown.png' );
        this.load.image('battleButUp','assets/images/battleButUpDarker.png' );
        this.load.image('itemBox','assets/images/itemBoxDarker.png' );
        this.load.image('inventoryGUI','assets/images/inventoryGUIDarker.png' );
        this.load.image('abilitiesGUI','assets/images/abilitiesGUIDarker.png' );
        this.load.image('battleResultGUI','assets/images/battleResultGUI.png' );
        this.load.image('short_sword','assets/images/swordIcon.png');
        this.load.image('slash','assets/images/slashIcon.png');
        this.load.image('stab','assets/images/stabIcon.png');
        this.load.bitmapFont('livingstone', 'assets/fonts/livingstone.png', 'assets/fonts/livingstone.fnt');
        this.load.bitmapFont('livingstone2', 'assets/fonts/livingstone2.png', 'assets/fonts/livingstone2.fnt');
        this.load.bitmapFont('gothic', 'assets/fonts/gothic2.png', 'assets/fonts/gothic2.fnt');
        this.load.bitmapFont('battleFont', 'assets/fonts/battleFont.png', 'assets/fonts/battleFont.fnt');
        this.load.bitmapFont('gothic2', 'assets/fonts/gothic.png', 'assets/fonts/gothic.fnt');
        this.load.image('maxHealth','assets/images/maxHealth.png');
        this.load.image('highHealth','assets/images/highHealth.png');
        this.load.image('mediumHealth','assets/images/mediumHealth.png');
        this.load.image('lowHealth','assets/images/lowHealth.png');
        this.load.image('healthBar','assets/images/healthBar.png');
        this.load.image('medHealthLeft','assets/images/medHealthLeft.png');
        this.load.image('highHealthLeft','assets/images/highHealthLeft.png');
        this.load.image('lowHealthLeft','assets/images/lowHealthLeft.png');
        this.load.image('spearIcon','assets/images/spearIcon.png');
        this.load.image('spinJab','assets/images/spinJab.png');
        this.load.image('thrust','assets/images/thrust.png');
        this.load.image('LessHealth','assets/images/RegHealth.png');
        this.load.image('RegHealth','assets/images/LessHealth.png');
    }

    create(){
        this.anims.create({
            key:'right',
            frames: this.anims.generateFrameNumbers('playerE'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'left',
            frames: this.anims.generateFrameNumbers('playerW'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'up',
            frames: this.anims.generateFrameNumbers('playerN'),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'down',
            frames: this.anims.generateFrameNumbers('playerS'),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopped',
            frames: [{key: 'playerS', frame: 0}],
            frameRate: 10
        });
        this.anims.create({
            key:'rightLeatherB',
            frames: this.anims.generateFrameNumbers('LeatherB', {start: 27, end: 35}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'leftLeatherB',
            frames: this.anims.generateFrameNumbers('LeatherB', {start: 9, end: 17}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'upLeatherB',
            frames: this.anims.generateFrameNumbers('LeatherB', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'downLeatherB',
            frames: this.anims.generateFrameNumbers('LeatherB', {start: 18, end: 26}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopLeatherB',
            frames: [{key: 'LeatherB', frame: 18}],
            frameRate: 10
        });
        this.anims.create({
            key:'rightLeatherA',
            frames: this.anims.generateFrameNumbers('LeatherA', {start: 27, end: 35}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'leftLeatherA',
            frames: this.anims.generateFrameNumbers('LeatherA', {start: 9, end: 17}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'upLeatherA',
            frames: this.anims.generateFrameNumbers('LeatherA', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'downLeatherA',
            frames: this.anims.generateFrameNumbers('LeatherA', {start: 18, end: 26}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopLeatherA',
            frames: [{key: 'LeatherA', frame: 18}],
            frameRate: 10
        });
        this.anims.create({
            key:'rightLeatherC',
            frames: this.anims.generateFrameNumbers('LeatherC', {start: 27, end: 35}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'leftLeatherC',
            frames: this.anims.generateFrameNumbers('LeatherC', {start: 9, end: 17}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'upLeatherC',
            frames: this.anims.generateFrameNumbers('LeatherC', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'downLeatherC',
            frames: this.anims.generateFrameNumbers('LeatherC', {start: 18, end: 26}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopLeatherC',
            frames: [{key: 'LeatherC', frame: 18}],
            frameRate: 10
        });
        this.anims.create({
            key:'rightLeatherD',
            frames: this.anims.generateFrameNumbers('LeatherD', {start: 27, end: 35}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'leftLeatherD',
            frames: this.anims.generateFrameNumbers('LeatherD', {start: 9, end: 17}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'upLeatherD',
            frames: this.anims.generateFrameNumbers('LeatherD', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'downLeatherD',
            frames: this.anims.generateFrameNumbers('LeatherD', {start: 18, end: 26}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopLeatherD',
            frames: [{key: 'LeatherD', frame: 18}],
            frameRate: 10
        });
        this.anims.create({
            key:'rightCommonA',
            frames: this.anims.generateFrameNumbers('CommonA', {start: 27, end: 35}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'leftCommonA',
            frames: this.anims.generateFrameNumbers('CommonA', {start: 9, end: 17}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'upCommonA',
            frames: this.anims.generateFrameNumbers('CommonA', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'downCommonA',
            frames: this.anims.generateFrameNumbers('CommonA', {start: 18, end: 26}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopCommonA',
            frames: [{key: 'CommonA', frame: 18}],
            frameRate: 10
        });
        this.anims.create({
            key:'rightCommonB',
            frames: this.anims.generateFrameNumbers('CommonB', {start: 27, end: 35}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'leftCommonB',
            frames: this.anims.generateFrameNumbers('CommonB', {start: 9, end: 17}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'upCommonB',
            frames: this.anims.generateFrameNumbers('CommonB', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'downCommonB',
            frames: this.anims.generateFrameNumbers('CommonB', {start: 18, end: 26}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopCommonB',
            frames: [{key: 'CommonB', frame: 18}],
            frameRate: 10
        });
        this.anims.create({
            key:'rightCommonC',
            frames: this.anims.generateFrameNumbers('CommonC', {start: 27, end: 35}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'leftCommonC',
            frames: this.anims.generateFrameNumbers('CommonC', {start: 9, end: 17}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'upCommonC',
            frames: this.anims.generateFrameNumbers('CommonC', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'downCommonC',
            frames: this.anims.generateFrameNumbers('CommonC', {start: 18, end: 26}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopCommonC',
            frames: [{key: 'CommonC', frame: 18}],
            frameRate: 10
        });
        this.anims.create({
            key:'goblinAttack',
            frames: this.anims.generateFrameNumbers('goblin', {start: 0, end: 6}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key:'deadGoblin',
            frames: this.anims.generateFrameNumbers('goblin', {start: 44, end: 48}),
            frameRate: 5
        });
        this.anims.create({
            key:'deadMale',
            frames: this.anims.generateFrameNumbers('deadMale'),
            frameRate: 5
        });
        this.anims.create({
            key:'rightShortSword',
            frames: this.anims.generateFrameNumbers('ShortSword', {start: 27, end: 35}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'leftShortSword',
            frames: this.anims.generateFrameNumbers('ShortSword', {start: 9, end: 17}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'upShortSword',
            frames: this.anims.generateFrameNumbers('ShortSword', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'downShortSword',
            frames: this.anims.generateFrameNumbers('ShortSword', {start: 18, end: 26}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopShortSword',
            frames: [{key: 'ShortSword', frame: 18}],
            frameRate: 10
        });
        this.anims.create({
            key:'rightCommonSpear',
            frames: this.anims.generateFrameNumbers('CommonSpear', {start: 27, end: 35}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'leftCommonSpear',
            frames: this.anims.generateFrameNumbers('CommonSpear', {start: 9, end: 17}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'upCommonSpear',
            frames: this.anims.generateFrameNumbers('CommonSpear', {start: 0, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key:'downCommonSpear',
            frames: this.anims.generateFrameNumbers('CommonSpear', {start: 18, end: 26}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key:'stopCommonSpear',
            frames: [{key: 'CommonSpear', frame: 18}],
            frameRate: 10
        });
        this.time.delayedCall(1000, this.callMenu, [], this);
    }

    callMenu(){
        //this.scene.start('dialog', {content: getConversation('prologue'), scene: this});
        this.scene.start('MainMenu');
    };
}

