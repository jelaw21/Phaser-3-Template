import getAbility from '../objects/Abilities.js'

export default function getEnemy(enemy){

    return enemies[enemy];
}

let enemies = {

    'goblin':{
        'name': 'GOBLIN',
        'image': 'playerS',
        'health': 50,
        'abilities': [getAbility('punch'), getAbility('kick')],
        'exp': 20,
        'chance': 50
    }
};