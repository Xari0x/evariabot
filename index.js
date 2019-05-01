const Discord = require('discord.js')
const MySQL = require('mysql')

var client = new Discord.Client();
var prefix = "!"

// Connection to the client.

client.login(process.env.TOKEN)

client.on('ready', () => {
    console.log(`> Discord bot offline ! (${client.user.tag})`);
    client.user.setActivity(`Offline ! | !help`, )
    client.user.setStatus('dnd')
});

// Connection to the database MySQL.

const connection = MySQL.createConnection({
    host     : process.env.DBHOST,
    user     : process.env.DBUSER,
    port     : "3306",
    password : process.env.DBPASSWORD,
    database : process.env.DBNAME
});

connection.connect(err => {
    console.log(`> Connected to the database !`);
});

// Commands.

client.on('message', msg => {
    if (!msg.content.startsWith(prefix)) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "help"){
        var help_msg = new Discord.RichEmbed()
            .setColor('#e74c3c')
            .addField("General Commands", "`!help | Show all commands.`\n`!info | Show informations about the server.`")
            .addField("Developer Commands", "`The developer commands are secrets ... You're not worthy.`")
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

    if (command === "info"){
        var info_msg = new Discord.RichEmbed()
            .setColor('#e74c3c')
            .addField("Informations about the server.", "`Name :`" + ` ${msg.guild.name}` + "\n`Date of creation :`" + ` ${msg.guild.createdAt}` + "\n`You joined the :`" + ` ${msg.member.joinedAt}` + "\n`Number of member :`" + ` ${msg.guild.memberCount}`)
            .setTimestamp()
            .setFooter("Par Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
        msg.channel.send(info_msg)
    }
    
    if (command === "about"){
        var info_msg = new Discord.RichEmbed()
            .setColor('#e74c3c')
            .setTitle('Informations about me, the bot.')
            .addField("Who I am ?", "`My name is EvariaBOT and I was developped the 30.04.19 by Xari0x#7387 !`")
            .addField("What can I do ?", "`Type !help in any channel for have more informations about my usefulness !`")
            .addField("How can I come on your server ?", "`I am not a public bot, only a few people have access to my data !`")
            .setTimestamp()
            .setFooter("Par Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
        msg.channel.send(info_msg)
    }
})
