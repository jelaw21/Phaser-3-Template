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
        this.unarmedEXP = 0;
        this.unarmedLvl = 1;
        this.swordEXP = 0;
        this.swordLvl = 1;
        this.inventory = [new Item(getItem('gold'))];
        this.equipment = [];
        this.armor = 20;
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

    getHealth(amount){
        return this.health;
    }

    addExp(amount){
        this.exp += amount;
    }

    addUnarmedExp(amount){
        this.unarmedEXP += amount;
    }
    getUnarmedExp(){
        return this.unarmedEXP;
    }

    addSwordExp(amount){
        this.swordEXP += amount;
    }

    getSwordExp(){
        return this.swordEXP;
    }

    getArmor(){
        return this.armor;
    }

    getEquipment(){
        return this.equipment;
    }

    //ABILITIES MANAGEMENT

    getActiveAbilities(){
        return this.activeAbilities;
    }

    toggleActiveAbility(ability){
        for(let i = 0; i < this.availableAbilities.length; i++){
            if(ability.name === this.availableAbilities[i].getName() ){
                 if(this.availableAbilities[i].getActive()){
                    this.availableAbilities[i].setActive(false)
                }else
                    this.availableAbilities[i].setActive(true)
            }
        }
    }

    getAvailableAbilities(){
        return this.currentAvailableAbilities;
    }

    generateAllAbilities(){
        let abilities = getAbilityList();
        for(let i = 0; i < abilities.length; i++){
            for(let j = 0; j < this.allAvaiableAbilities.length; j++){
                if((getAbility(abilities[i]).type === 'UNARMED') && (this.unarmedLvl >= getAbility(abilities[i]).unlockLvl) && (getAbility(abilities[i]).name !== this.allAvaiableAbilities[j].getName())){
                    this.allAvaiableAbilities.push(new Ability(getAbility(abilities[i])));
                }
                if((getAbility(abilities[i]).type === 'SWORD') && (this.swordLvl >= getAbility(abilities[i]).unlockLvl) && (getAbility(abilities[i]).name !== this.allAvaiableAbilities[j].getName())){
                    this.allAvaiableAbilities.push(new Ability(getAbility(abilities[i])));
                }
            }
        }
        console.log(this.allAvaiableAbilities);

        this.addAbilities();
    }

    addAbilities(){
        //look through unarmed
        this.currentAvailableAbilities = [];


        //ALL AVAILABLE UNARMED ARE ADDED
        for(let i = 0; i <  this.allAvaiableAbilities.length; i++){
            if(this.allAvaiableAbilities.getType() === 'UNARMED'){
                this.currentAvailableAbilities.push(this.allAvaiableAbilities[i]);
            }
        }
        //look through weapons
        for(let i = 0; i < this.equipment.length; i++){
            if(this.equipment[i].getType() === 'WEAPON' && this.equipment[i].getGroup() === 'SWORD' ){
                for(let j = 0; j < this.equipment[i].getAbilities().length; j++){
                    for(let k = 0; k < this.allAvaiableAbilities.length; k++){
                        if(this.equipment[i].abilities[j].getName() === this.allAvaiableAbilities[k].getName()){
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
        this.calculateArmor();
    }

    buildEquipment(){
        this.equipment = [];

        for(let i = 0; i < this.inventory.length; i++) {
            if (this.inventory[i].getEquipped() === true) {
                if (this.inventory[i].getType() === 'ARMOR') {
                    this.equipment.push(this.inventory[i]);
                }
            }
        }
    }
    calculateArmor(){
        this.armor = 0;
        for(let i = 0; i < this.equipment.length; i++){
            if(this.inventory[i].getType() === 'ARMOR'){
                this.armor = this.armor + this.inventory[i].getEffect();
            }
        }
    }

    levelUp() {

        this.availableAbilities.forEach(function (element) {

            let nextLevel = element.getLevel() + 1;
            let targetExp = nextLevel * (nextLevel - 1) * 200;

            if(element.getExp() >= targetExp){
                element.increaseLevel();
            }

            element.resetCount();
        });

        let nextLevel = this.unarmedLvl + 1;
        let targetExp =  nextLevel * (nextLevel - 1) * 200;

        if(this.unarmedEXP >= targetExp){
            this.unarmedLvl += 1;
        }

        nextLevel = this.swordLvl + 1;
        targetExp =  nextLevel * (nextLevel - 1) * 200;

        if(this.swordExp >= targetExp){
            this.swordLvl += 1;
        }

        this.generateAllAbilities();

    }
}