module.exports = {
    name: 'status',
    description: 'status of all servers',
    execute(message, serverList) {

        var msg = 'Server Status:\n';

        for (i=0; i<serverList.length; i++){
            if (eval('typeof ' + serverList[i] + ' != "undefined"')){
                msg += (serverList[i] +  ' is ONLINE\n');
            }else{
                msg += (serverList[i] + ' is offline\n');
            }
        }
        
        message.channel.send(msg);

    }
}
