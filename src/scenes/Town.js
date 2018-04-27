import Player from '../objects/playerSprite'
export default class Town extends Phaser.Scene {

    constructor(config) {
        super({key: 'townMap'});

    }

    init(data){
        //this.player = new Player(this, 625, 600, 'playerE', 0);
        this.player = data.player;
        //this.player.inventory = data.inventory;
        console.log(data.player);
    }

    create(){

        this.map = this.make.tilemap({key: 'town'});
        this.tiles = this.map.addTilesetImage('backgroundTiles1', 'backgroundTiles1');
        this.tiles2 = this.map.addTilesetImage('backgroundTiles2', 'backgroundTiles2');
        this.tiles3 = this.map.addTilesetImage('townTiles1', 'townTiles1');
        this.map.createDynamicLayer('grassLayer', this.tiles, 0,0);
        this.map.createDynamicLayer('groundCover', this.tiles, 0, 0);
        this.map.createDynamicLayer('groundCover2', this.tiles2, 0,0);
        this.map.createDynamicLayer('houseBase', this.tiles3,0,0);
        this.map.createDynamicLayer('houseDecor', this.tiles3,0,0);
        this.blocked = this.map.createDynamicLayer('blockedLayer', this.tiles2,0,0);
        this.blocked2 = this.map.createDynamicLayer('blockedLayer2', this.tiles3,0,0);
        this.blockedObjects = [this.blocked, this.blocked2];
        this.add.existing(this.player);
        this.player.init();
        //bump
        this.map.createDynamicLayer('houseRoof', this.tiles3, 0, 0).setDepth(1);
        this.map.createDynamicLayer('houseRoof2', this.tiles2, 0, 0).setDepth(1);


        this.physics.world.setBounds(0, 24, this.map.widthInPixels-10, this.map.heightInPixels-34);

        this.cursors = this.input.keyboard.createCursorKeys();

        var cam = this.cameras.main;
        cam.zoom = 1.5;
        cam.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        cam.startFollow(this.player);
        cam.scrollX = 2;

        this.blocked.setCollisionBetween(0, 800);
        this.blocked2.setCollisionBetween(0, 800);
        this.physics.add.collider(this.player, this.blocked);
        this.physics.add.collider(this.player, this.blocked2);
        this.player.buildEquipped(this.player, this.blockedObjects);

    }
    update(){
        this.player.move(this.cursors);
    }
}