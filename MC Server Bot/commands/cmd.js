module.exports = {
    name: 'cmd',
    description: 'send cmdarg to arg server',
    execute(message, args, serverConfigs) {

        var serverConfigs1 = JSON.parse(JSON.stringify(serverConfigs));

        for (i = 0; i < serverConfigs1.length; i++) {
            if (args[1] == serverConfigs1[i][0]) {
                var name = serverConfigs1[i].shift();
                var consoleChan = serverConfigs1[i].pop();
                break;
            } else if (i === serverConfigs1.length - 1) {
                message.reply("Server was not found make sure capitalization is correct.\nUse !servers to double check.");
                return;
            }
        }

        var entr = '\n';
        var command = '';
        
        

        if (eval('typeof ' + name + '=== "undefined"')) {
            message.reply(args[1] + ' is not running.');
        }
        else {
            if (!args[2]) { return message.reply('need a command argument.') }
            else {
                command += args[2];
                for (i = 3; i < args.length; i++) {
                    command += (' ' + args[i]);
                }
                command += entr;
                console.log(command);
            }
            eval(name).stdin.write(command);
        }
    }
}
