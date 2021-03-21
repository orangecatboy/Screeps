var roleAttacker = {
    // a function to run the logic for this role
    run: function(creep) {
        // if in target room
        creep.moveTo(Game.flags.Attacker);
        if (creep.room.name !== creep.memory.target) {
            // find exit to target room
            var exit = creep.room.findExitTo(creep.memory.target);
            // move to exit
            creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#FF3535'}});
        }
        else {
var enemy = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
if(enemy) {
    if(creep.attack(enemy) == ERR_NOT_IN_RANGE) {
        creep.moveTo(enemy);
    }
}
        }
    }
};
module.exports = roleAttacker;
