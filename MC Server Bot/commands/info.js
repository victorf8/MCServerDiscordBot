module.exports = {
    name: 'info',
    description: 'info for each server',
    execute(message, args, embedList){
        if (embedList.length == 0) { return message.reply('no embeds currently configured.') }

        for (i = 0; i < embedList.length; i++) {
            if (args[1] == embedList[i].title) { message.channel.send(embedList[i]); }
        }
    }
}