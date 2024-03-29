var roleExtractor = {
    run: function(creep){
        
        if(creep.memory.extracting && creep.store.getCapacity() == _.sum(creep.store)){
            creep.memory.extracting = false;
        }
        else if(!creep.memory.extracting && 0 == _.sum(creep.store)){
            creep.memory.extracting = true;
        }
        
        if(creep.memory.extracting){
            if(creep.memory.target){
                target = Game.getObjectById(creep.memory.depositId);
            }else{
                var targets = creep.room.find(FIND_MINERALS);
                target = targets[0];
                creep.memory.depositId = target.id;
                creep.memory.mineralType = target.mineralType;
            }
            
            if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, );
            }
        }else{
            if (creep.room.terminal) {
                if (creep.transfer(creep.room.terminal, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.terminal);
                }
            }
            else if (creep.room.storage) {
                if (creep.transfer(creep.room.storage, creep.memory.mineralType) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.storage);
                }
            }
        }
    }
};

module.exports = roleExtractor;
