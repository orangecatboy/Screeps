var terminalTask = {
    run: function(){
        var terminal = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TERMINAL);
        var roomName1 = 'W37N31';
        var roomName2 = 'W22S12';
        var energyRequired = Game.market.calcTransactionCost(50, roomName1, roomName2)
        
        for(let i=0; i<30; i++){
            if(terminal && !terminal.cooldown && terminal.store.energy > energyRequired) {
                Game.market.send(RESOURCE_UTRIUM, 50, roomName2, 'Can you see this? ' + i);
            }
        }
    }
}
module.exports = terminalTask;
