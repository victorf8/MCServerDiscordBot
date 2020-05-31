module.exports = {
    name: 'help',
    description: 'list of commands',
    execute(message, args){
        message.reply('so you need some help well here is a list of the commands for this server.\n\
        \nAll commands start with a ! and ARE NOT case sensitive while server names ARE case sensitive.\n\
        \n> !servers - This command provides a list of the current servers.\n\
        \n> !status - This will tell you what servers are already running.\n\
        \n> !info "ServerName" - This will provide the info of "ServerName" if configured.\n\
        \n> !start "ServerName" - This command will start the given "ServerName".\n\
        \n> !stop "ServerName - This will stop whatever server is running DO NOT forget to stop the server if you"re the last one off.\n\
        \n> !cmd "ServerName" "_____" - This command can directly pass "______" to the server console.');
    }
}