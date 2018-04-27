import {getAbility, searchAbilities}  from "./Abilities";

export default function getEnemy(enemy){

    return enemies[enemy];
}

let enemies = {

    'goblin':{
        'name': 'GOBLIN',
        'image': 'goblin',
        'health': 20,
        'abilities': [getAbility('punch'), getAbility('kick')],
        'exp': 20,
        'chance': 50,
        'gold': 0
    }
};