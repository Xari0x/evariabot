const Discord = require('discord.js')

var client = new Discord.Client();
var prefix = "!"

client.login(process.env.TOKEN)

client.on('ready', () => {
    console.log(`> Discord bot offline ! (${client.user.tag})`);
    client.user.setActivity(`Offline ! | !help`, )
    client.user.setStatus('dnd')
});

client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "help"){
        var help_msg = new Discord.RichEmbed()
            .setColor('#e74c3c')
            .addField("General", "`?help | Affiche toutes les commandes.`")
            .setTimestamp()
            .setFooter("Par Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
        msg.channel.send(help_msg)
    };

    if (command === "offline"){
        if (msg.guild.member(msg.author).id === "282147518958272512"){
            client.user.setActivity(`Offline ! | !help`)
            client.user.setStatus('dnd')
            console.log(`> Bot was set offline ! (${client.user.tag})`);
        } else {
            var permission_msg = new Discord.RichEmbed()
                .setColor('#e74c3c')
                .addField("You need to be a developer !", "`You don't have the permission to do that !`")
                .setTimestamp()
                .setFooter("Par Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
            msg.channel.send(permission_msg)
        }
    };

    if (command === "online"){
        if (msg.guild.member(msg.author).id === "282147518958272512"){
            client.user.setActivity(`Online ! | !help`)
            client.user.setStatus('online')
            console.log(`> Bot was set online ! (${client.user.tag})`);
        } else {
            var permission_msg = new Discord.RichEmbed()
                .setColor('#e74c3c')
                .addField("You need to be a developer !", "`You don't have the permission to do that !`")
                .setTimestamp()
                .setFooter("Par Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
            msg.channel.send(permission_msg)
        }
    }
})
