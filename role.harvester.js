var roleUpgrader = require('role.upgrader');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
	    if (creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0) {
            // switch state
            creep.memory.harvesting = false;
        }
        // if creep is harvesting energy but is full
        else if (!creep.memory.harvesting && creep.store.getFreeCapacity() == 0) {
            // switch state
            creep.memory.harvesting = true;
        }

        // if creep is supposed to transfer energy to a structure
        if (creep.memory.harvesting) {
            // find closest spawn, extension or tower which is not full
            var str = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                // the second argument for findClosestByPath is an object which takes
                // a property called filter which can be a function
                // we use the arrow operator to define it
                filter: (s) => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION)
                             && s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            /*if (structure == undefined) {
                structure = creep.room.storage;
            }*/

            // if we found one
            if (str) {
                // try to transfer energy, if it is not in range
                if (creep.transfer(str, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(str);
                }
            }else {
                roleUpgrader.run(creep);
            }
        }
        // if creep is supposed to harvest energy from source
        else {
            var sr = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(sr) == ERR_NOT_IN_RANGE) {
                // move towards the source
                creep.moveTo(sr);
        }
        }
    }
};

module.exports = roleHarvester;
