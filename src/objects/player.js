import {getAbility, getAbilityList}  from "./AbilitiesList";
import getItem from "./ItemList";
import Item from "./Item";
import Ability from "./Ability";

export default class Player {

    //TODO: WORK ON GETTING ABILITIES ... SHOULD BE A LOOK UP
    constructor() {
        this.name = 'Erick';
        this.maxHealth = 200;
        this.health = this.maxHealth;
        this.allAvaiableAbilities = [new Ability(getAbility('punch'))];
        this.currentAvailableAbilities = [];
        this.activeAbilities = [];
        this.exp = 0;
        this.level = 1;
        this.unarmedEXP = 0;
        this.unarmedLvl = 1;
        this.swordEXP = 0;
        this.swordLvl = 1;
        this.spearEXP = 0;
        this.spearLvl = 1;
        this.maceEXP = 0;
        this.maceLvl = 1;
        this.axeEXP = 0;
        this.axeLvl = 1;
        this.bowEXP = 0;
        this.bowLvl = 1;
        this.inventory = [new Item(getItem('gold'))];
        this.equipment = [];
        this.armor = 0;
        this.maxArmor = 0;
        this.emitter = new Phaser.EventEmitter();
    }


    expToNextLevel(level){
        return (level+1) * (level) * 200;
    }

    addGold(amount){
        this.inventory[0].quantity += amount;
    }

    getGold(){
        return this.inventory[0].quantity;
    }

    takeDamage(amount){
        this.health -= amount;
    }

    addHealth(amount){
        this.health += amount;
    }

    getHealth(){
        return this.health;
    }

    getMaxHealth(){
        return this.maxHealth;
    }

    getExp(){
        return this.exp;
    }

    addExp(amount){
        this.exp += amount;
    }

    getLevel(){
        return this.level;
    }

    increaseLevel(){
        this.level += 1;
    }

    addUnarmedExp(amount){
        this.unarmedEXP += amount;
    }
    getUnarmedExp(){
        return this.unarmedEXP;
    }

    getUnarmedLevel(){
        return this.unarmedLvl;
    }

    getSwordLevel(){
        return this.swordLvl;
    }

    addSwordExp(amount){
        this.swordEXP += amount;
    }

    getSwordExp(){
        return this.swordEXP;
    }

    getSpearLevel(){
        return this.spearLvl;
    }

    addSpearExp(amount){
        this.spearEXP += amount;
    }

    getSpearExp(){
        return this.spearEXP;
    }

    getMaceLevel(){
        return this.maceLvl;
    }

    addMaceExp(amount){
        this.maceEXP += amount;
    }

    getMaceExp(){
        return this.maceEXP;
    }

    getAxeLevel(){
        return this.axeLvl;
    }

    addAxeExp(amount){
        this.axeEXP += amount;
    }

    getAxeExp(){
        return this.axeEXP;
    }

    getBowLevel(){
        return this.bowLvl;
    }

    addBowExp(amount){
        this.bowEXP += amount;
    }

    getBowExp(){
        return this.bowEXP;
    }

    getArmor(){
        return this.armor;
    }

    getMaxArmor(){
        return this.maxArmor;
    }

    getEquipment(){
        return this.equipment;
    }

    //ABILITIES MANAGEMENT

    getActiveAbilities(){
        return this.activeAbilities;
    }

    toggleActiveAbility(ability){
        for(let i = 0; i < this.currentAvailableAbilities.length; i++){
            if(ability.name === this.currentAvailableAbilities[i].getName() ){
                 if(this.currentAvailableAbilities[i].getActive()){
                    this.currentAvailableAbilities[i].setActive(false)
                }else
                    this.currentAvailableAbilities[i].setActive(true)
            }
        }
    }

    getCurrentAvailableAbilities(){
        return this.currentAvailableAbilities;
    }

    getAbility(index){
        return this.allAvaiableAbilities[index];
    }

    getAllAbilities(){
        return this.allAvaiableAbilities;
    }

    generateAllAbilities(){
        let abilities = getAbilityList();
        for(let i = 0; i < abilities.length; i++){
            let foundIt = false;
            let index = 0;
                for(let j = 0; j < this.allAvaiableAbilities.length; j++){
                    if(getAbility(abilities[i]).name === this.getAbility(j).getName()){
                        foundIt = true;
                    }
                }
                if(!foundIt){
                    this.allAvaiableAbilities.push(new Ability(getAbility(abilities[i])));
                }
        }
        this.addAbilities();
    }

    addAbilities(){
        //look through unarmed
        this.currentAvailableAbilities = [];

        //ALL AVAILABLE UNARMED ARE ADDED
        for(let i = 0; i <  this.allAvaiableAbilities.length; i++){
            if(this.allAvaiableAbilities[i].getType() === 'UNARMED' && this.unarmedLvl >= this.allAvaiableAbilities[i].getUnlockLevel()){
                this.currentAvailableAbilities.push(this.allAvaiableAbilities[i]);
            }
        }
        //look through weapons
        for(let i = 0; i < this.equipment.length; i++){
            if(this.equipment[i].getType() === 'WEAPON'){
                for(let j = 0; j < this.equipment[i].abilities.length; j++){
                    for(let k = 0; k < this.allAvaiableAbilities.length; k++){
                        let ability = getAbility(this.equipment[i].abilities[j]);
                        if(ability.name === this.allAvaiableAbilities[k].getName() && ability.type === 'SWORD' && this.swordLvl >= ability.unlockLvl){
                            this.currentAvailableAbilities.push(this.allAvaiableAbilities[k]);
                        }
                    }
                }
            }
        }
    }

    equipAbilities(){
        let player = this;
        this.activeAbilities = [];
        this.currentAvailableAbilities.forEach(function(element){
            if(element.getActive()){
                player.activeAbilities.push(element);
            }
        });
    }

   //INVENTORY MANAGEMENT
    addToInventory(itemToAdd){
        let item = new Item(getItem(itemToAdd));
        let itemFound = false;
        let index = 0;

        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].getName() === item.getName()){
                itemFound = true;
                index = i;
            }
        }
        if(itemFound){
            this.inventory[index].increaseQuantity(1);
        }else
            this.inventory.push(item);
    }
    removeFromInventory(itemToRemove){
        let item = this.fromInventory(itemToRemove);
        item.decreaseQuantity(1);

        for(let i = 0; i < this.inventory.length; i++){
            if(this.inventory[i].getQuantity() <= 0){
                this.inventory.splice(i, 1);
            }
        }

        this.emitter.emit('inventoryChanged');

        this.buildEquipment();
    }
    fromInventory(itemToFind){
        for(let i = 0 ; i < this.inventory.length;i++){
            if(this.inventory[i].getName() === getItem(itemToFind).name){
                return this.inventory[i];
            }
        }
    }
    equipItem(itemToEquip){

        for(let i = 0; i < this.inventory.length; i++){

            if(this.inventory[i].getSlot() === itemToEquip.getSlot()){
                this.inventory[i].setEquipped(false);
            }
            if(this.inventory[i].getName() === itemToEquip.getName()){
                this.inventory[i].setEquipped(true);
            }
        }

        this.generateAllAbilities();
        this.buildEquipment();
    }

    buildEquipment(){
        this.equipment = [];

        for(let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].getEquipped() === true) {
                if (this.inventory[i].getType() === 'ARMOR') {
                    this.equipment.push(this.inventory[i]);
                }
                if (this.inventory[i].getType() === 'WEAPON'){
                    this.equipment.push(this.inventory[i]);
                }
            }
        }

        this.calculateArmor();
    }
    calculateArmor(){
        this.armor = 0;
        this.maxArmor = 0;

        for(let i = 0; i < this.equipment.length; i++){
            if(this.equipment[i].getType() === 'ARMOR' && this.equipment[i].getEquipped() === true){
               this.armor = this.armor + this.equipment[i].getEffect();
               this.maxArmor = this.maxArmor + this.equipment[i].getMaxEffect();
            }
        }
    }

    levelUp() {
        while(this.exp >= this.expToNextLevel(this.level)){
            this.increaseLevel();
            this.maxHealth += this.level  * (this.level -1)* 5;
            this.health = this.maxHealth;
        }
        this.allAvaiableAbilities.forEach(function (element) {

            let nextLevel = element.getLevel() + 1;
            let targetExp = nextLevel * (nextLevel - 1) * 200;

            if(element.getExp() >= targetExp){
                element.increaseLevel();
            }
            element.resetCount();
        });
        if(this.unarmedEXP >= this.expToNextLevel(this.unarmedLvl)){
            this.unarmedLvl += 1;
        }

        if(this.swordEXP >= this.expToNextLevel(this.swordLvl)){
            this.swordLvl += 1;
        }
        this.generateAllAbilities();
    }
}