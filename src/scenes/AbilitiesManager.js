export default class AbilitiesManager extends Phaser.Scene {

    constructor() {
        super({key: 'abilityMan'});
    }

    init(data){
        this.player = data.player;
        this.player.addAbilities();
        this.lastScene = data.scene;
        this.abilities = this.player.getCurrentAvailableAbilities();
    }

    create(){
        this.cWidth = this.sys.game.config.width;
        this.cHeight = this.sys.game.config.height;
        this.background = this.add.image(this.cWidth/2, this.cHeight/2, 'abilitiesGUI').setDisplaySize(512, 512);

        this.itemNameStyle = {
            fontSize: 16,
            fontFamily: 'Sanchez',
            fill: 'white',
            stroke: '#222',
            strokeThickness: 1,
            wordWrap:{
                width: this.background.displayWidth-5,
                useAdvancedWrap: true
            }
        };

        this.itemDescStyle = {
            fontSize: 24,
            fontFamily: 'Cute Font',
            stroke: '#222',
            strokeThickness: 1,
            wordWrap:{
                width: this.background.displayWidth-5,
                useAdvancedWrap: true
            }
        };

        this.zoneHeader = this.add.zone(144,44,512,128).setName('HEADER');
        this.zoneBody = this.add.zone(144, 172, 512, 256).setName('BODY');
        this.zoneFooter = this.add.zone(144, 428, 512, 128).setName('FOOTER');
        this.checkboxGroup = [];

        this.title = this.add.bitmapText(this.cWidth/2-4, 62, 'livingstone',"ABILITIES", 32).setOrigin(.5);


        for(let i = 0; i < this.abilities.length; i++) {
                //this.add.text(150, (i * 30) + 180, this.abilities[i].name, this.style).setData('ID', i).setInteractive();
                let ability = this.add.image(170, (i*50)+ 190, 'itemBox').setData('ID', i).setInteractive().setOrigin(0).setDisplaySize(48,48);
                let abilityIcon = this.add.image(170, (i*50)+ 190, this.abilities[i].icon).setOrigin(0);
                this.checkboxGroup.push(this.add.image(205, (i*50)+ 225, ' ').setOrigin(.5).setSize(32, 32));
                Phaser.Display.Align.In.BottomRight(abilityIcon, ability);
        }
        this.abilityNameText = this.add.text(164, 480, 'ABILITY NAME', this.itemNameStyle).setVisible(false);
        this.abilityDesc = this.add.text(164, 500, 'ABILITY DESC', this.itemDescStyle).setVisible(false);
        this.abilityStats = this.add.text(164, 520, 'ABILITY STATS', this.itemDescStyle).setVisible(false);
        this.abilityDam = this.add.text(364, 520, 'ABILITY STATS', this.itemDescStyle).setVisible(false);
        this.setAbilityCheck();

        this.closeButton = this.add.image(652, 64, 'exitButton').setInteractive().setData('ID','CLOSE');

        this.input.on('gameobjectdown', this.equipAbility, this);
        this.input.on('pointerover', this.displayName, this);
        this.input.on('pointerout', this.clearDisplayName, this);
        //Phaser.Display.Align.In.Center(this.image, this.scene.add.zone(0,0,800,600));

        //this.abilKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    }
    update(){

    }

    setAbilityCheck(){
        let abilities = this.player.getCurrentAvailableAbilities();
        for(let i = 0; i < abilities.length; i ++) {
            if(abilities[i].active){
                this.checkboxGroup[i].setTexture('checkBox');
            }else{
                this.checkboxGroup[i].setTexture('uncheckBox');
            }
        }
    }

    equipAbility(pointer, gameObject){
        let index = gameObject.getData('ID');

        if(index !== "CLOSE"){
            this.player.toggleActiveAbility(this.abilities[index]);
            this.player.equipAbilities();
            this.setAbilityCheck();
        }else{
            this.scene.stop('abilityMan');
            this.scene.resume(this.lastScene);
        }
    }

    displayName(pointer, gameObject){
        let index = gameObject[0].getData('ID');
        if(index !== 'CLOSE'){
            this.abilityNameText.setText(this.abilities[index].name).setVisible(true);
            this.abilityDesc.setText(this.abilities[index].desc).setVisible(true);
            this.abilityStats.setText("NUMBER OF ATTACKS: " + this.abilities[index].numAtk).setVisible(true);
            this.abilityDam.setText("MAX POSSIBLE DAMAGE: " + this.abilities[index].maxDam).setVisible(true);
        }
    }

    //bump

    clearDisplayName(pointer, gameObject){
        let index = gameObject[0].getData('ID');
        if(index !== 'CLOSE'){
            this.abilityNameText.setVisible(false);
            this.abilityDesc.setVisible(false);
            this.abilityStats.setVisible(false);
            this.abilityDam.setVisible(false);
        }

    }
}