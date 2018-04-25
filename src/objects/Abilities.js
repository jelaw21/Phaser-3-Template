export default function getAbility(ability){

    return abilities[ability];
}

//SLOTS: TORSO, LEGS, HEAD

let abilities = {
    'punch':{
        'name': "PUNCH",
        'numAtk': 2,
        'durations': [1500, 1000],
        'damage': [2, 3, 6]
    }
};