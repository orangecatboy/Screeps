// import modules
var myTowers = require('prototype.tower');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleTowerManager = require('role.towerManager');
var roleMiner = require('role.miner');

global.HOME = 'W37N31';

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
        var minimumNumberOfUpgraders = 3;
        var minimumNumberOfBuilders = 0;
        var minimumNumberOfRepairers = 2;
        var minimumNumberOfWallRepairers = 2;
        var minimumNumberOfTowerManagers = 2;
        var minimumNumberOfSupportBuilders = 1;
        var minimumNumberOfSupportUpgraders = 1;
        // count the number of creeps alive for each role in this room
        // _.sum will count the number of properties in Game.creeps filtered by the
        //  arrow function, which checks for the creep being a specific role
        var numberOfHarvestersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
        var numberOfUpgradersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
        var numberOfBuildersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'builder');
        var numberOfRepairersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'repairer');
        var numberOfWallRepairersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'wallRepairer');
        var numberOfTowerManagersInW37N31 = _.sum(creepsInRoom, (c) => c.memory.role == 'towerManager');
        var name = undefined;
        var bodyparts = [WORK,WORK,CARRY,CARRY,MOVE];

        

        // if not enough harvesters
        if (numberOfHarvestersInW37N31 < spawn.memory.minHarvesters) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'harvester', working: false});
            // if spawning failed and we have no harvesters left
            if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvestersInW37N31 == 0) {
                // spawn one with what is available
        name = spawn.createCreep([WORK,CARRY,MOVE], undefined,
            { role: 'harvester', working: false});            }
        }
        // if there is a claim order defined
        // if not enough upgraders
        else if (numberOfUpgradersInW37N31 < spawn.memory.minUpgraders) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'upgrader', working: false});        }
//        else if (numberOfSupportUpgraders < minimumNumberOfSupportUpgraders) {
            // try to spawn one
//        name = spawn.createCreep(bodyparts, undefined,
//            { role: 'upgrader', working: false});        }
        // if not enough repairers
        else if (numberOfRepairersInW37N31 < spawn.memory.minRepairers) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'repairer', working: false});        }
            // if not enough builders
        else if (numberOfBuildersInW37N31 < spawn.memory.minBuilders) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'builder', working: false});        }
//        else if (numberOfSupportBuilders < minimumNumberOfSupportBuilders) {
            // try to spawn one
//        name = spawn.createCreep([WORK,WORK,CARRY,CARRY,MOVE], undefined,
//            { role: 'builder', working: false, target: 'W37N32', room: 'W37N31'});        }            // if not enough wallRepairers
        else if (numberOfWallRepairersInW37N31 < spawn.memory.minWallRepairers) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'wallRepairer', working: false});        }
        else if (numberOfTowerManagersInW37N31 < spawn.memory.minTowerManagers) {
            // try to spawn one
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'towerManager'});        }
            // if not enough longDistanceHarvesters for W54S78
        else {
            // else try to spawn a builder
        name = spawn.createCreep(bodyparts, undefined,
            { role: 'builder', working: false});        }
            
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'wallRepairer') {
            roleWallRepairer.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'towerManager') {
            roleTowerManager.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'attacker') {
            roleAttacker.run(creep);
        }  
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
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
            console.log("Tower Managers : " + numberOfTowerManagersInW37N31);
        }
    }


        if(Game.cpu.bucket == 10000) {
        Game.cpu.generatePixel();
    }
};
