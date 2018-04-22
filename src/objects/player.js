import getItem from '../objects/Items.js'
export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.inventory = [getItem('gold')];
        this.equipment = [];

        }

    init(){
        this.scene.physics.add.existing(this);
        this.body.setSize(16,16);
        this.body.setOffset(24, 47);
        //this.container = this.scene.add.container(this.x-16, this.y-17);
        //this.container.setScrollFactor(0);
        //this.scene.physics.world.enable(this.container);
       // this.container.body.setSize(32,48);
        this.addToInventory(getItem('common'));
        this.equipItem(getItem('common'));
    }

    move(cursors){
         let velX = 0;
        let velY = 0;

        if((cursors.up.isDown || cursors.down.isDown) && cursors.left.isDown) {
            this.anims.play('left', true);
            this.playLeftAnims();

            if (cursors.up.isDown) {
                velX = -100;
                velY = -100;

            }else{
                velX = -100;
                velY = 100;

            }

        }else if((cursors.up.isDown || cursors.down.isDown) && cursors.right.isDown){
            this.anims.play('right', true);
            this.playRightAnims()
            if(cursors.up.isDown){
                velX = 100;
                velY = -100;
            }

            else{
                velX = 100;
                velY = 100;
            }

        }else if(cursors.right.isDown){
            velX = 100;
            velY = 0;
            this.anims.play('right', true);
            this.playRightAnims();
        }else if(cursors.left.isDown){
            velX = -100;
            velY = 0;
            this.anims.play('left', true);
            this.playLeftAnims();
        }else if(cursors.up.isDown){
            velX = 0;
            velY = -100;
            this.anims.play('up', true);
            this.playUpAnims()
        }else if(cursors.down.isDown){
            velX = 0;
            velY = 100;
            this.playDownAnims()
            this.anims.play('down', true);
        }else{
            velX = 0;
            velY = 0;
            this.playStopAnims()
            this.anims.play('stopped', true);
        }
        this.body.setVelocity(velX, velY);
        this.equipUpdate(velX, velY);
    }

    equipUpdate(x, y){
        this.equipment.forEach(function(element){
            element.body.setVelocity(x, y);
        })
    }
    addToInventory(itemToAdd){

        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].name === itemToAdd.name){
                this.inventory[i].quantity++;
            }else
                this.inventory.push(itemToAdd);
                break;
        }
    }

    equipItem(itemToEquip){
        for(let i = 0; i < this.inventory.length; i++){
            if(!(this.inventory[i].name === itemToEquip.name)){
                this.inventory[i].equipped = false
            }
            if(this.inventory[i].name === itemToEquip.name){
                this.inventory[i].equipped = true;
            }
        }
        this.buildEquipped(this);

        //this.addEquipmentCollision();

    }

    buildEquipped(player){
        //bump
        for(let m = 0; m < this.equipment.length; m++){
           this.equipment[m].destroy();
        }
        this.equipment = [];
        console.log(this.inventory);

        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].equipped === true){
                for(let j = 0; j < this.inventory[i].image.length; j++){
                   this.equipment.push(player.scene.physics.add.sprite(player.x, player.y, player.inventory[i].image[j]));
                   //this.scene.physics.add.group(this.equipment[i]);
                   this.equipment[j].body.setSize(16,16);
                   this.equipment[j].body.setOffset(24, 47);
               }
            }
        }
    }

    addGold(amount){
        this.inventory[0].quantity += amount;
    }
    getGold(){
        return this.inventory[0].quantity;
    }
    //pass in the inventory item that's currently equipped
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
