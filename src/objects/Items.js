
export default function getItem(item){

    return items[item];
}

let items = {
    'leather_armor': {
        'type': 'ARMOR',
        'name': 'LEATHER ARMOR',
        'image': ['LeatherA','LeatherB', 'LeatherC', 'LeatherD'],
        'effect': 10,
        'quantity': 0,
        'equipped': false
    },
    'gold': {
        'type': 'gold',
        'name': 'GOLD',
        'image': 'coin',
        'effect': 0,
        'quantity': 0,
        'equipped': false
    },
    'common':{
        'type': 'ARMOR',
        'name': 'COMMON CLOTHES',
        'image': ['LeatherA','CommonA', 'CommonB', 'CommonC'],
        'effect': 10,
        'quantity': 0,
        'equipped': true
    }

};

