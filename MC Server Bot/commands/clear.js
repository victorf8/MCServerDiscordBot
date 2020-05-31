module.exports = {
    name: 'clear',
    description: 'clears msgs',
    execute(message, args){
        if (!args[1]) return message.reply("specify number of messages ex.\n!clear 10");
        var num = parseInt(args[1]);
        if(num>100){
        for(i = 0;i<num/100;i++){
            message.channel.bulkDelete(100);
        }
        }else{
            message.channel.bulkDelete(args[1]);
        }
    }
}