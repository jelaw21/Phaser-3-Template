export default class PlayerSprite extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.level = scene;

    }

    //TODO: MOVE INIT AND INITIAL INTO CONSTRUCTOR

    init(player){
        //TODO: MAKE THESE GETTER/SETTER METHODS
        this.inventory = player.inventory;
        this.equipment = [];
        this.abilities = player.abilities;
        this.player = player;

        this.scene.physics.add.existing(this);
        this.body.setSize(16,16);
        this.body.setOffset(24, 47);
        this.body.collideWorldBounds = true;
        this.invKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.keyW = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyS = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.abilKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    //TODO
    initialEquipment( ){
        this.player.addToInventory('common_chest');
        this.player.addToInventory('common_legs');
        this.player.equipItem(this.player.fromInventory('common_chest'));
        this.player.equipItem(this.player.fromInventory('common_legs'));
        this.buildEquipped(this, this.level.blockedObjects);
        this.player.emitter.on('inventoryChanged', this.buildEquipped, this);
    }

    move(){
        let velX = 0;
        let velY = 0;

        if((this.keyW.isDown || this.keyS.isDown) && this.keyA.isDown) {
            this.anims.play('left', true);
            this.playLeftAnims();
            if (this.keyW.isDown) {
                velX = -100;
                velY = -100;
            }else{
                velX = -100;
                velY = 100;
            }
        }else if((this.keyW.isDown || this.keyS.isDown) && this.keyD.isDown){
            this.anims.play('right', true);
            this.playRightAnims();
            if(this.keyW.isDown){
                velX = 100;
                velY = -100;
            }
            else{
                velX = 100;
                velY = 100;
            }
        }else if(this.keyD.isDown){
            velX = 100;
            velY = 0;
            this.anims.play('right', true);
            this.playRightAnims();
        }else if(this.keyA.isDown){
            velX = -100;
            velY = 0;
            this.anims.play('left', true);
            this.playLeftAnims();
        }else if(this.keyW.isDown){
            velX = 0;
            velY = -100;
            this.anims.play('up', true);
            this.playUpAnims()
        }else if(this.keyS.isDown){
            velX = 0;
            velY = 100;
            this.playDownAnims();
            this.anims.play('down', true);
        }else{
            velX = 0;
            velY = 0;
            this.playStopAnims();
            this.anims.play('stopped', true);
        }
        if(this.level.scene.isActive(this.level)){
            this.body.setVelocity(velX, velY);
            this.equipUpdate(velX, velY);
        }
        this.checkMenus();
    }

    stop(){
        this.body.setVelocity(0);
        this.equipUpdate(0, 0);
    }

    checkMenus() {

        if(Phaser.Input.Keyboard.JustDown(this.invKey)) {
            this.body.setVelocity(0);
            this.scene.scene.pause(this.level);
            this.scene.scene.launch('inventory', {player: this.player, scene: this.level, sprite: this});
        }
        if(Phaser.Input.Keyboard.JustDown(this.abilKey)) {
            this.body.setVelocity(0);
            this.scene.scene.launch('abilityMan', {player: this.player, scene: this.level, sprite: this});
            this.scene.scene.pause(this.level);
        }
    }

    equipUpdate(x, y){
        this.equipment.forEach(function(element){
            element.body.setVelocity(x, y);
        })
    }

    addEquipmentCollision(scene, layers){
        for(let i = 0; i < this.equipment.length; i++){
            for(let j = 0; j< layers.length; j++){
                scene.physics.add.collider(this.equipment[i],layers[j]);
            }

        }
    }

    buildEquipped(){
        let player = this;
        let layers = this.level.blockedObjects;
        this.player.buildEquipment();
        for(let m = 0; m < this.equipment.length; m++){
           this.equipment[m].destroy();
        }
        this.equipment = [player.scene.physics.add.sprite(player.x, player.y, 'CommonB', 18)];
        for(let i = 0; i < this.player.equipment.length; i++) {
            if (this.player.equipment[i].type === 'ARMOR') {
                for (let j = 0; j < this.player.equipment[i].image.length; j++) {
                    this.equipment.push(player.scene.physics.add.sprite(player.x, player.y, this.player.equipment[i].image[j], 18));
                }
            }
        }
        for(let i = 0; i < this.player.equipment.length; i++){
            if(this.player.equipment[i].type !== 'ARMOR' && this.player.equipment[i].type !== 'POTION') {
                for (let j = 0; j < this.player.equipment[i].image.length; j++) {
                    this.equipment.push(player.scene.physics.add.sprite(player.x, player.y, this.player.equipment[i].image[j], 18));
                }
            }
        }

        for(let i = 0; i < this.equipment.length; i++){
            this.equipment[i].body.setSize(16,16);
            this.equipment[i].body.setOffset(24, 47);
            this.equipment[i].body.collideWorldBounds = true;
        }
        this.addEquipmentCollision(this.level, layers);
    }

    playRightAnims(){
        for(let i = 0; i < this.equipment.length; i++){
            this.equipment[i].anims.play('right' + this.equipment[i].texture.key, true);
        }
    }
    playLeftAnims(){
        for(let i = 0; i < this.equipment.length; i++){
            this.equipment[i].anims.play('left' + this.equipment[i].texture.key, true);
        }
    }
    playUpAnims(){
        for(let i = 0; i < this.equipment.length; i++){
            this.equipment[i].anims.play('up' + this.equipment[i].texture.key, true);
        }
    }
    playDownAnims(){
        for(let i = 0; i < this.equipment.length; i++){
            this.equipment[i].anims.play('down' + this.equipment[i].texture.key, true);
        }
    }
    playStopAnims(){
        for(let i = 0; i < this.equipment.length; i++){
            this.equipment[i].anims.play('stop' + this.equipment[i].texture.key, true);
        }
    }
}
