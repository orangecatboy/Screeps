// import modules
var myTowers = require('prototype.tower');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleTowerManager = require('role.towerManager');
var roleMiner = require('role.miner');
var roleAttacker = require('role.attacker');
var roleLorry = require('role.lorry');
var roleClaimer = require('role.claimer');
var roleExtractor = require('role.extractor');

module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }


for (let spawnName in Game.spawns) {
    let spawn = Game.spawns[spawnName];
    let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
    myTowers.play();

        var minimumNumberOfHarvesters = 3;
        var minimumNumberOfAttackers = 0;
        var minimumNumberOfUpgraders = 3;
        var minimumNumberOfBuilders = 0;
        var minimumNumberOfRepairers = 2;
        var minimumNumberOfWallRepairers = 2;
        var minimumNumberOfTowerManagers = 2;
        var minimumNumberOfSupportBuilders = 3;
        var minimumNumberOfSupportUpgraders = 1;
        // count the number of creeps alive for each role in this room
        // _.sum will count the number of properties in Game.creeps filtered by the
        //  arrow function, which checks for the creep being a specific role
        var numberOfHarvestersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
        var numberOfUpgradersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
        var numberOfBuildersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'builder');
        var numberOfRepairersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'repairer');
        var numberOfWallRepairersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'wallRepairer');
        var numberOfMiners = _.sum(creepsInRoom, (c) => c.memory.role == 'miner');
        var numberOfAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker');
        var numberOfLorries = _.sum(creepsInRoom, (c) => c.memory.role == 'lorry');
        var numberOfTowerManagersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'towerManager');
        var numberOfSupportBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' && c.memory.target == 'W37N32');
        var numberOfExtractors = _.sum(creepsInRoom, (c) => c.memory.role == 'extractor');
        
        var name = undefined;

        var bodyparts = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];


       // if no harvesters are left AND either no miners or no lorries are left
        //  create a backup creep
        if (numberOfHarvestersInW37N31 == 0 && (numberOfMiners == 0 || numberOfLorries == 0)) {
            // if there are still miners left
            if (numberOfMiners > 0) {
                // create a lorry
                name = spawn.createCreep([WORK,CARRY,MOVE], undefined, { role: 'lorry', working: false});
            }
            // if there is no miner left
            else {
                // create a harvester because it can work on its own
                name = spawn.createCreep([WORK,CARRY,MOVE], undefined, { role: 'harvester', working: false });
            }
        }
        // if no backup creep is required
        else {
            // check if all sources have miners
            let sources = spawn.room.find(FIND_SOURCES);
            // iterate over all sources
            for (let source of sources) {
                // if the source has no miner
                if (!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                    // check whether or not the source has a container
                    let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });
                    // if there is a container next to the source
                    if (containers.length > 0) {
                        // spawn a miner
                        name = spawn.createCreep([WORK, WORK, WORK, WORK, MOVE], undefined, { role: 'miner', sourceId: source.id });
                    }
                }
            }
        }
        if (numberOfHarvestersInW37N31 < spawn.memory.minHarvesters) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'harvester', working: false});        }
        // if not enough upgraders
        else if (numberOfUpgradersInW37N31 < spawn.memory.minUpgraders) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'upgrader', working: false});        }
        
        else if (numberOfLorries < spawn.memory.minLorries){
        name = spawn.createCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'lorry', working: false});
        }
//        else if (numberOfSupportUpgraders < minimumNumberOfSupportUpgraders) {
            // try to spawn one
//        name = spawn.createCreep(bodyparts, undefined,
//            { role: 'upgrader', working: false});        }
        // if not enough repairers
        else if (numberOfRepairersInW37N31 < spawn.memory.minRepairers) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'repairer', working: false});        }
        else if (numberOfWallRepairersInW37N31 < spawn.memory.minWallRepairers) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'wallRepairer', working: false});        }
            // if not enough builders
        else if (numberOfBuildersInW37N31 < spawn.memory.minBuilders) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'builder', working: false, target: spawn.memory.room});        }
        //  else if (numberOfSupportBuilders < minimumNumberOfSupportBuilders) {
        //      // try to spawn one
        //  name = spawn.createCreep(bodyparts, undefined,
        //     { role: 'builder', working: false, target: 'W37N32'});        }            // if not enough wallRepairers
        else if (numberOfTowerManagersInW37N31 < spawn.memory.minTowerManagers) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'towerManager'});        }
        else if (numberOfExtractors < spawn.memory.minExtractors){
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'extractor'});       
        }
            
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        else if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }

        else if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        else if(creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        else if(creep.memory.role == 'towerManager') {
            roleTowerManager.run(creep);
        }
        else if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }  
        else if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        // if creep is miner, call miner script
        else if (creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        // if creep is lorry, call miner lorry
        else if (creep.memory.role == 'lorry') {
            roleLorry.run(creep);
        }
        else if (creep.memory.role == 'extractor'){
            roleExtractor.run(creep);
        }
    }

        // print name to console if spawning was a success
        // name > 0 would not work since string > 0 returns false
        if (!(name < 0)) {
            console.log(spawn + " spawned new creep: " + name + " (" + Game.creeps[name].memory.role + ")");
            console.log("Harvesters    : " + numberOfHarvestersInW37N31);
            console.log("Upgraders     : " + numberOfUpgradersInW37N31);
            console.log("Builders      : " + numberOfBuildersInW37N31);
            console.log("Repairers     : " + numberOfRepairersInW37N31);
            console.log("Wall Repairers : " + numberOfWallRepairersInW37N31);
            console.log("Miners        : " + numberOfMiners);
            console.log("Lorries       : " + numberOfLorries);
            console.log("Tower Managers : " + numberOfTowerManagersInW37N31);
        }
    };


        if(Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }
};
