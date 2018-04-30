export default class Ability {

    constructor(config) {
        this.type = config.type;
        this.name = config.name;
        this.numAtk = config.numAtk;
        this.durations = config.durations;
        this.damage = config.damage;
        this.maxDam = config.maxDam;
        this.unlockLvl = config.unlockLvl;
        this.exp = config.experience;
        this.level = config.level;
        this.active = config.active;
        this.icon = config.icon;
        this.desc = config.desc;
        this.count = config.count;
    }

    getType(){
        return this.type;
    }

    getName(){
        return this.name;
    }

    getNumAtk(){
        return this.numAtk;
    }

    getDurations(index){
        return this.durations[index];
    }

    getDamage(index){
        return this.damage[index];
    }

    getMaxDam(){
        return this.maxDam;
    }

    getUnlockLevel(){
        return this.unlockLvl;
    }

    getExp(){
        return this.exp;
    }

    getLevel(){
        return this.level;
    }

    getActive(){
        return this.active;
    }

    getIcon(){
        return this.icon;
    }

    getDesc(){
        return this.desc
    }

    getCount(){
        return this.count;
    }

    resetCount(){
        this.count = 0;
    }

    setExp(amount){
        this.exp += amount;
    }

    setActive(amount){
        this.active = amount;
    }

    increaseCount(){
        this.count += 1;
    }

    increaseLevel(){
        this.level += 1;
    }

}