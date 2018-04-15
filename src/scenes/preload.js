export default class Preload extends Phaser.Scene{

    constructor(config){
        super({key: 'Preload', files:[{type: 'image', key: 'logo', url: 'assets/images/gwkLogo.png'}, {type:'image', key:'logoBar', url: 'assets/images/gwkPreloadBar.png'}]});
    }

    preload(){
        this.logo = this.add.image(window.innerWidth/2, window.innerHeight/2-100, 'logo').setScale(.3);
        this.barLogo = this.add.image(this.logo.x-(this.logo.displayWidth*.4), (this.logo.displayHeight)+75, 'logoBar').setScale(.356).setOrigin(0,0);

        var barCover = this.add.graphics();
        var barX = this.barLogo.x;
        var barDisplayWidth = this.barLogo.displayWidth;
        var barDisplayHeight = this.barLogo.displayHeight;
        var barY = this.barLogo.y;

        this.load.on('progress', function (value){

            barCover.clear();
            barCover.fillStyle(0x000000, 1);
            barCover.fillRect((barX + barDisplayWidth)*value, barY, barDisplayWidth*(1-value), barDisplayHeight);
        });

        this.sys.game.events.on('resize', this.resize, this);

        this.resize();

        this.load.spritesheet('playerE', 'assets/images/BODY_EAST.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('playerW', 'assets/images/BODY_WEST.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('playerN', 'assets/images/BODY_NORTH.png', {frameWidth: 64, frameHeight:64});
        this.load.spritesheet('playerS', 'assets/images/BODY_SOUTH.png', {frameWidth: 64, frameHeight:64});
        this.load.image('gui', 'assets/images/panel_brown.png');
        this.load.image('itemTiles', 'assets/images/ProjectUtumno_full.png');
        this.load.image('townTiles1', 'assets/images/town.png');
        this.load.image('backgroundTiles2', 'assets/images/trees_plants.png');
        this.load.image('backgroundTiles1', 'assets/images/trees_plants_rocks.png');
        this.load.image('title', 'assets/images/title.png');
        this.load.tilemapTiledJSON('forest', 'assets/tilemaps/forest.json');
        this.load.tilemapTiledJSON('town', 'assets/tilemaps/town.json');
        this.load.image('button', 'assets/images/buttonLong_blue.png');
        this.load.image('buttonPressed', 'assets/images/buttonLong_blue_pressed.png');
        this.load.image('coin', 'assets/images/coin.png');
        this.load.image('sign', 'assets/images/sign.png');
    }

    create(){
        this.time.delayedCall(1000, this.callMenu, [], this);


    }

    resize(){
        this.logo.setPosition(window.innerWidth/2, window.innerHeight/2-100);
        this.barLogo.setPosition(this.logo.x-(this.logo.displayWidth*.4), (this.logo.displayHeight)+75);
        let cam = this.cameras.main;


        cam.setViewport(0, 0, window.innerWidth, window.innerHeight);

        cam.zoom = Math.min(window.innerWidth/800, window.innerHeight/600)
    }

    callMenu(){
        this.scene.start('MainMenu');
    };

}

