
//Require config file
const fs = require('fs'); //init file sys handler
const configFile = require('./config.js');


//Discord bot init
const Discord = require('discord.js'); //Requires Discord.js from directory file
const bot = new Discord.Client(); //Creates instance of Bot
const token = configFile.token; //this is the bot token/password for login get from config.js


//Command info init
const PREFIX = '!';//command prefix
bot.commands = new Discord.Collection();//creates collection for commands
var commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));//location of commands filter for all .js
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);//adds commands
    bot.commands.set(command.name, command);
}
//get cmd perms from config & channel
const cmdChannel = configFile.cmdChannel;
const lvl1 = configFile.level1;
const lvl2 = configFile.level2;
const lvl3 = configFile.level3;


//server info init
const ping = require('minecraft-server-util');//init for ping command
var serverIP = configFile.serverIP;//MC server ip from config.js
var path = configFile.path;// get path to MC servers from config.js
let serverList = [];
fs.readdir(path, serverList, function (err, items) {
    for (var i = 0; i < items.length; i++) {
        serverList.push(items[i]);//add each server found in dir. to serverList Array
    }
    return serverList;
});
const serverConfigs = configFile.serverConfigs;//grab server configs from config file
const singleServer = configFile.singleServer;//grab single server option from config file


//bot states
bot.on('ready', () => {
    console.log('This bot is online.');//if bot is 'ready' console lol (i think)
    bot.user.setActivity('in the Nether', { type: 'PLAYING' });
})


bot.login(token);//attempt logon with token


bot.on('guildMemberAdd', member => {//when bot new member
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === '💬text-chat');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member if channel found
    channel.send(`Hey, ${member}` + ' if you need MC Server help try "!help" in chat.');
});


bot.on('message', message => {//if bot sees messege run arrow function

    let args = message.content.substring(PREFIX.length).split(" ");//if contents of messege start with PREFIX make arg of words after splitting on SPACE

    var msgChannel = message.channel.name;

    switch (args[0].toLowerCase()) {//swith to arg pos 0 function (like a if statement)

        case 'help':
            bot.commands.get('help').execute(message, args);
            break;


        case 'ip':
            if (!message.member.roles.cache.find(r => r.name === lvl1)) return message.reply("you don't have permission to do that.\n@ or message the admin to see about becoming a Player.")
            message.author.send(serverIP);
            break;


        case 'status':
            if (!message.member.roles.cache.find(r => r.name === lvl1)) return message.reply("you don't have permission to do that.\n@ or message the admin to see about becoming a Player.")

            bot.commands.get('status').execute(message, serverList);
            break;


        case 'servers':
            if (!message.member.roles.cache.find(r => r.name === lvl1)) return message.reply("you don't have permission to do that.\n@ or message the admin to see about becoming a Player.")

            bot.commands.get('servers').execute(message, serverList);
            break;


        case 'info':
            if (!message.member.roles.cache.find(r => r.name === lvl1)) return message.reply("you don't have permission to do that.\n@ or message the admin to see about becoming a Player.")

            bot.commands.get('info').execute(message, args, embedList);
            break;


        case 'start':
            if (message.channel.name != cmdChannel) return message.reply("please keep all server related commands in the " + cmdChannel + " channel.")
            if (!message.member.roles.cache.find(r => r.name === lvl2)) return message.reply("you don't have permission to do that.\nOnly a Server Head can start a server try @ing one.")

            if (args[1] === undefined) {
                message.reply("You must enter a server name to start.");
                break;
            } else { bot.commands.get('start').execute(message, args, serverConfigs, path, serverList, singleServer) }

            break;


        case 'stop':
            if (message.channel.name != cmdChannel) return message.reply("please keep all server related commands in the " + cmdChannel + " channel.")
            if (!message.member.roles.cache.find(r => r.name === lvl2)) return message.reply("you don't have permission to do that.\n@ or message the admin to see about becoming a Player.")

            if (args[1] === undefined) {
                message.reply("You must enter a server name to stop.");
                break;
            } else (bot.commands.get('stop').execute(message, args, serverConfigs));

            break;


        case 'cmd':
            if (!message.member.roles.cache.find(r => r.name === lvl3)) return message.reply("you don't have permission to do that, only an admin or mod.")

            if (args[1] === undefined) {
                message.reply("You must enter a server name to start.");
                break;
            } else { bot.commands.get('cmd').execute(message, args, serverConfigs, path) }

            break;


        case 'clear':
            if (!message.member.roles.cache.find(r => r.name === lvl3)) return message.reply("you don't have permission to do that, only an admin or mod.")

            bot.commands.get('clear').execute(message, args);
            break;


    }

})

////Embeds inits for each server
embedList = [];

const Default = new Discord.MessageEmbed()
    .setTitle('Default')
    .setThumbnail('https://www.minecraft.net/content/dam/minecraft/pmp/pmp-minecraft-howitworks-survive.png')
    .addField('MC Version:', '1.15.2')
    .addField('TexturePack:', 'https://www.curseforge.com/minecraft/modpacks/hexxit-updated/files/2806407')
    .setDescription("Default is a vanilla world to use as example.")
    .setColor(0x228B22);

embedList.push(Default);//push HEXXIT embed to array[0]


////embeds END