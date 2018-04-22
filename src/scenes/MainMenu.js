export default class MainMenu extends Phaser.Scene {

    constructor(config){
        super({key: 'MainMenu'});
    }
    preload (){
        this.sys.game.events.on('resize', this.resize, this);
        //LOAD ANIMATIONS
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
        //this.resize();

    }

    create (){

        this.title = this.add.image(window.innerWidth/2, (window.innerHeight/2)-100, 'title').setAngle(-20).setScale(.7);
        this.button = this.add.image(window.innerWidth/2, window.innerHeight/2+50, 'button').setInteractive();
        this.startText = this.add.text(0,0,'START', {fontSize: '24px', fontFamily: 'UnifrakturCook', fill: '#000'});
        Phaser.Display.Align.In.Center(this.startText, this.button);

        this.tweens.add({
            targets: this.title,
            angle: 20,
            duration: 5000,
            yoyo: true,
            repeat: -1,

        });

        this.button.on('pointerdown', function(pointer){
            this.setTexture('buttonPressed');

        } )
        this.button.on('pointerout', function(pointer){
            this.setTexture('button');
        } )
        this.button.on('pointerup', this.callLevel, this);
    }

    update(){

    }

    resize(){

        this.title.setPosition(window.innerWidth/2, (window.innerHeight/2)-100);
        this.button.setPosition(window.innerWidth/2, window.innerHeight/2+50);
        Phaser.Display.Align.In.Center(this.startText, this.button);

        let cam = this.cameras.main;
        cam.setViewport(0, 0, window.innerWidth, window.innerHeight);
        cam.zoom = Math.min(window.innerWidth/800, window.innerHeight/600);
    }

    callLevel(){
        this.scene.start('level1');
    }
}