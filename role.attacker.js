/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.attacker');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep) {
        if (creep.room.name != creep.memory.target) {
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#FF3535'}});
        }
        else {
    var a = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        if (a !== undefined) {
            creep.attack(a);
        }
            }
        }
    };
