export default function getAbility(ability){

    return abilities[ability];
}

//SLOTS: TORSO, LEGS, HEAD

let abilities = {
    'punch':{
        'name': "PUNCH",
        'numAtk': 2,
        'durations': [1500, 1000],
        'damage': [2, 3, 6],
        'playerExp': 0,
        'wepExp': 0,
        'active': true
    },
    'kick':{
        'name': "KICK",
        'numAtk': 3,
        'durations': [2000, 1000, 500],
        'damage': [3, 4, 5, 9],
        'playerExp': 50,
        'wepExp': 0,
        'active': false
    }
};