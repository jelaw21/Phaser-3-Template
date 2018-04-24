export default class Inventory extends Phaser.Scene {

    constructor(config) {
        super({key: 'dialog'});
        this.line = '';
        this.index = 0;

    }

    init(data) {
        this.player = data.player;
        this.lastScene = this.scene.get(data.player.scene);
        this.content = data.content;
    }

    create(){
        var graphics = this.add.graphics();

        //this.add.image(550, -10, 'lukas').setOrigin(0).setSize(300,300);

        graphics.fillStyle(0x114499, .7);
        graphics.fillRect(this.sys.game.config.width*(1/5), this.sys.game.config.height*(2/5)+40, this.sys.game.config.width*(3/5), this.sys.game.config.height*(2/5));

        this.charImage = this.add.image(0, 0, ' ').setOrigin(0);
        this.nameText = this.add.text(this.sys.game.config.width*(1/5)+20, this.sys.game.config.height*(2/5)+50, ' ');
        this.speechText = this.add.text(this.sys.game.config.width*(1/5)+20, this.sys.game.config.height*(2/5)+70, ' ');

        this.updateConversation();

        this.input.on('pointerdown', function(pointer){
            this.scene.updateConversation();
        })

        //this.nextLine();
    }
    updateConversation(){

        let posX = 0;
        let posY = 0;
        if(this.index >= this.content.length){
            this.scene.stop('dialog');
            this.scene.resume(this.player.scene);
        }else{
            this.charImage.setTexture(this.content[this.index].character);
            if(this.content[this.index].position === 'left'){
                posX = -50;
                posY = -10;
            }else{
                posX = 550;
                posY = -10;
            }
            if(this.content[this.index].character === 'arianna'){
                this.charImage.setScale(.7);
            }else{
                this.charImage.setScale(1);
            }
            this.charImage.setPosition(posX, posY);
            this.nameText.setText(this.content[this.index].character.toUpperCase());
            this.speechText.setText('\"'+ this.content[this.index].dialog + '\"');
            this.index++;

        }
    }
    /*updateLine(){
        if(this.line.length < this.content[this.index].length){
            this.line = this.content[this.index].substr(0, this.line.length + 1);
            this.text.setText(this.line);
        }
        else{
            this.time.delayedCall(2000, this.nextLine,[], this);
        }
    }
    nextLine(){
        this.index++;
        if(this.index < this.content.length){
            this.line = ' ';
            this.time.addEvent({delay: 1000, callback: this.updateLine, callbackScope: this, repeat: this.content[this.index].length + 1});
        }
    }*/
}