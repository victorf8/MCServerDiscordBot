module.exports = {
    name: 'info',
    description: 'info for each server',
    execute(message, args, embedList){
        if (embedList.length == 0){ return message.reply('no embeds currently configured.')}
        if (args[1] === 'Hexxit'){
            message.channel.send(embedList[0]);
        }
        else if(args[1] === 'Tekkit'){
            message.channel.send(embedList[1]);
        }
        else if(args[1] === 'OGRealm'){
            message.channel.send(embedList[2]);
        }
        else{
            message.reply("enter a proper server name after !info don't forget server names are case sensitive ex.\n!info Hexxit");
        }
    }
}