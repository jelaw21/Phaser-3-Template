
export default function getItem(item){

    return items[item];
}

//SLOTS: TORSO, LEGS, HEAD

let items = {
    'leather_armor': {
        'type': 'ARMOR',
        'name': 'LEATHER ARMOR',
        'slot': 'TORSO',
        'image': ['LeatherA','LeatherB', 'LeatherC', 'LeatherD'],
        'effect': 10,
        'quantity': 1,
        'equipped': false
    },
    'gold': {
        'type': 'gold',
        'name': 'GOLD',
        'image': ['coin'],
        'effect': 0,
        'quantity': 0,
        'equipped': false
    },
    'common_chest':{
        'type': 'ARMOR',
        'slot': 'TORSO',
        'name': 'WHITE SHIRT',
        'image': ['LeatherC'],
        'effect': 10,
        'quantity': 1,
        'equipped': false
    },
    'common_legs':{
        'type': 'ARMOR',
        'slot': 'LEGS',
        'name': 'WORN PANTS',
        'image': ['CommonC', 'CommonA'],
        'effect': 10,
        'quantity': 1,
        'equipped': false
    },
    'common_head':{
        'type': 'ARMOR',
        'name': 'HAIR',
        'slot': 'HEAD',
        'image': ['CommonB'],
        'effect': 10,
        'quantity': 0,
        'equipped': false
    }
};

