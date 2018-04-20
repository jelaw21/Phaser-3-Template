export default class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.inventory = [{'gold': 0}];
        this.equipment = [];
        console.log(this.inventory);

        }

    init(){
        this.scene.physics.add.existing(this);
        this.body.setSize(16,16);
        this.body.setOffset(24, 47);
        //this.container = this.scene.add.container(this.x-16, this.y-17);
        //this.container.setScrollFactor(0);
        //this.scene.physics.world.enable(this.container);
       // this.container.body.setSize(32,48);
    }

    move(cursors){
        //this.equipUpdate(this.x, this.y);

        let velX = 0;
        let velY = 0;
        this.equipUpdate(this.x, this.y);
        if((cursors.up.isDown || cursors.down.isDown) && cursors.left.isDown) {
            this.anims.play('left', true);
            this.playLeftAnims();

            if (cursors.up.isDown) {
                //this.body.setVelocity(-100, -100);
                velX = -100;
                velY = -100;

            }else{
                this.body.setVelocity(-100, 100);
                velX = -100;
                velY = 100;

            }

        }else if((cursors.up.isDown || cursors.down.isDown) && cursors.right.isDown){
            this.anims.play('right', true);
            this.playRightAnims()
            if(cursors.up.isDown){
                this.body.setVelocity(100, -100);
                velX = 100;
                velY = -100;
            }

            else{
                this.body.setVelocity(100, 100);
                velX = 100;
                velY = 100;
            }

        }else if(cursors.right.isDown){
            this.body.setVelocity(100, 0);
            velX = 100;
            velY = 0;
            this.anims.play('right', true);
            this.playRightAnims();
        }else if(cursors.left.isDown){
            this.body.setVelocity(-100, 0);
            velX = -100;
            velY = 0;
            this.anims.play('left', true);
            this.playLeftAnims();
        }else if(cursors.up.isDown){
            this.body.setVelocity(0, -100);
            velX = 0;
            velY = -100;
            this.anims.play('up', true);
            this.playUpAnims()
        }else if(cursors.down.isDown){
            this.body.setVelocity(0, 100);
            velX = 0;
            velY = 100;
            this.playDownAnims()
            this.anims.play('down', true);
        }else{
            this.body.setVelocity(0,0);
            velX = 0;
            velY = 0;
            this.playStopAnims()
            this.anims.play('stopped', true);
        }
        this.body.setVelocity(velX, velY);

    }

    equipUpdate(x, y){
        this.equipment.forEach(function(element){
            element.setPosition(x, y);
        })
        //this.container.setPosition(this.x-16, this.y-17);
        //this.scene.add.text(this.container.x, this.container.y + 20, "Clothing" + this.item.x + " , " + this.item.y);
        //this.scene.add.text(this.container.x, this.container.y + 40, "Container " + this.container.list.length);
        //this.scene.add.text(this.container.x, this.container.y, "HERE IT IS" + this.container.x + " , " + this.container.y);
    }
    addToInventory(itemToAdd){

        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].name === itemToAdd.name){
                this.inventory[i].quantity++;
            }else
                this.inventory.push(itemToAdd);
        }
    }

    equipItem(itemToEquip){
        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].name === itemToEquip.name){
                this.inventory[i].equipped = true;
            }
        }
        this.buildEquipped(this);

    }

    buildEquipped(player){
        //bump
        this.equipment= [];
        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].equipped === true){
                console.log(this.inventory[i].image.length);
               for(let j = 0; j < this.inventory[i].image.length; j++){
                   this.equipment.push(player.scene.add.sprite(player.x, player.y, player.inventory[i].image[j]));
                   this.scene.physics.add.group(this.equipment[i]);
                   console.log(this.equipment[i]);
               }
               //this.item.setScrollFactor(0);
               //this.container.add(this.item);
            }
        }
        //console.log(this.container)
    }

    addGold(amount){
        this.inventory[0].gold += amount;
        console.log(this.inventory[0].gold);
    }
    getGold(){
        return this.inventory[0].gold;
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
