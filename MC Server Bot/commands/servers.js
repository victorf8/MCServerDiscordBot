module.exports = {
    name: 'servers',
    description: 'shows server list',
    execute(message, serverList) {
        var msg = 'There are currently ' + serverList.length + ' server(s)...\n';

        msg += serverList[0] + ',\n';
        for (i = 1; i < serverList.length; i++) {
            msg += serverList[i] + ',\n';
        }

        msg += 'for more information on any one server type: !info "ServerName"';
        message.channel.send(msg);
    }
}