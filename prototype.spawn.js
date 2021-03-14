module.exports = 
{
    play: function() 
    {
        var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);
        for (i = 0; i < towers.length; i++)
        {
            this.run(towers[i]);
        }
    },
    run: function(tower)
    {
        var enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (enemy)
            tower.attack(enemy);
        else if (tower.energy >= 500)
        {
            var priority = 1;
            var targets = [];
            while (targets.length == 0 && priority <= 3)
            {
                var targets = this.getRepairTargets(tower, priority);
                if (targets.length > 0) 
                    tower.repair(tower.pos.findClosestByRange(targets));
                priority++;
            }
        }
    },
    getRepairTargets: function(tower, priority)
    {
        switch (priority)
        {
            case 1: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => (s.structureType == STRUCTURE_ROAD || s.structureType == STRUCTURE_CONTAINER) && s.hitsMax - s.hits >= 1500);
            case 2: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_RAMPART && s.hits < 300000);
            case 3: return _.filter(tower.room.find(FIND_STRUCTURES), (s) => s.structureType == STRUCTURE_WALL && s.hits < 300000);
            default: return null;
        }
    }
};
