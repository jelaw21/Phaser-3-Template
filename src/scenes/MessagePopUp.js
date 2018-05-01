export default class MessagePopUp extends Phaser.Scene{

    constructor(config) {
        super({key: 'message'});
    }

    init(data){
        this.player = data.player;
        this.text = data.text;
    }

    create(){
       let style = {
           fontSize: 16,
           fontFamily: 'Sanchez',
           fill: '#EEE',
           stroke: '#222',
           strokeThickness: 2,
           wordWrap:{
               width: 120,
               useAdvancedWrap: true
           }
       };

        this.background = this.add.image(10, 10, 'messageGUI').setDisplaySize(128,128).setDepth(2).setOrigin(0);
        this.textbox = this.add.text(0 , 0, this.text, style).setDepth(2);
        //this.exitBackground = this.scene.add.sprite(this.x, this.y, 'exitBackground').setDepth(2);
        Phaser.Display.Align.In.Center(this.textbox, this.background);
        //Phaser.Display.Align.In.TopRight(this.exitBackground, this.messageBox);
        this.closeButton = this.add.sprite(this.x, this.y, 'exitButton').setInteractive().setDepth(2).setOrigin(.5);
        Phaser.Display.Align.To.RightTop(this.closeButton, this.background, -17, 10);

        this.closeButton.on('pointerdown', this.closeMessageBox, this);

        this.time.delayedCall(4000, this.closeMessageBox, [], this);
    }

    closeMessageBox(){
        this.scene.stop('message');
    }
}