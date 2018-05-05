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
        this.allAvaiableAbilities = [];
        this.currentAvailableAbilities = [];
        this.activeAbilities = [];
        this.exp = 0;
        this.level = 1;
        this.combatGroup = ['UNARMED', 'SWORD', 'SPEAR', 'MACE', 'AXE', 'BOW'];
        this.combatExp = [0,0,0,0,0,0];
        this.combatLevel = [1, 1, 1, 1, 1, 1];
        this.inventory = [new Item(getItem('gold'))];
        this.equipment = [];
        this.armor = 0;
        this.maxArmor = 0;
        this.emitter = new Phaser.EventEmitter();

        this.generateAllAbilities();
    }

    getCombatLevels(){
        return this.combatLevel;
    }

    getCombatGroups(){
        return this.combatGroup;
    }

    getCombatExp(){
        return this.combatExp;
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
        this.currentAvailableAbilities = [];

        //go through all available abilities, and add them to current abilities IF
        //level is high enough AND the weapon is equipped ...

        for(let i = 0; i < this.allAvaiableAbilities.length; i ++){
            if(this.allAvaiableAbilities[i].getType() === this.combatGroup[0] && this.combatLevel[0] >= this.allAvaiableAbilities[i].getUnlockLevel()){
                this.currentAvailableAbilities.push(this.allAvaiableAbilities[i]);
            }else{
                for(let j = 1; j < this.combatGroup.length; j++){
                    for(let k = 0; k < this.equipment.length; k++){
                        if(this.equipment[k].getType() === this.combatGroup[j] && this.combatLevel[j] >= this.allAvaiableAbilities[i].getUnlockLevel()){
                            this.currentAvailableAbilities.push(this.allAvaiableAbilities[i]);
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

        this.addAbilities();
        this.buildEquipment();
    }

    buildEquipment(){
        this.equipment = [];

        for(let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].getEquipped() === true) {
                if (this.inventory[i].getType() === 'ARMOR') {
                    this.equipment.push(this.inventory[i]);
                }
                for(let j = 0; j < this.combatGroup.length; j++){
                    if (this.inventory[i].getType() === this.combatGroup[j]){
                        this.equipment.push(this.inventory[i]);
                    }
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

        for(let i = 0; i < this.combatGroup.length; i++){
            if(this.combatExp[i] >= this.expToNextLevel(this.combatLevel[i])){
                this.combatLevel[i] += 1;
            }
        }

        this.addAbilities();
    }
}