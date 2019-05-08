const Discord = require('discord.js')
const MySQL = require('mysql')

var client = new Discord.Client();
var prefix = "!"

// Connection to the client.

client.login(process.env.TOKEN)

client.on('ready', () => {
    console.log(`> Discord bot offline ! (${client.user.tag})`);
    client.user.setActivity(`Online ! | !help`)
    client.user.setStatus('online')
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
            .addField("General Commands", "`> !help | Show all commands.`\n`> !info | Show informations about the server.`\n`> !about | Show informations about me.`\n`> !changelog | Show last changelog !`")
            .addField("Developer Commands", "`> The developer commands are secrets ... You're not worthy.`")
            .setTimestamp()
            .setFooter("By Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
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
                .addField("You need to be a developer !", "`> You don't have the permission to do that !`")
                .setTimestamp()
                .setFooter("By Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
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
                .addField("You need to be a developer !", "`> You don't have the permission to do that !`")
                .setTimestamp()
                .setFooter("By Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
            msg.channel.send(permission_msg)
        }
    }
    
    if (command === "stream"){
        if (msg.guild.member(msg.author).id === "282147518958272512"){
            msg.channel.sendMessage("@Notifications" + args[0])
            var stream_msg = new Discord.RichEmbed()
                .setColor('#e74c3c')
                .addField("Xari0x now streaming on Youtube !", "`> You don't have the permission to do that !`")
                .setImage('http://fondationalpha.000webhostapp.com/sqdsqdsqd.png')    
                .setTimestamp()
                .setFooter("By Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
            msg.channel.send(stream_msg)
        } else {
            var permission_msg = new Discord.RichEmbed()
                .setColor('#e74c3c')
                .addField("You can't do that !", "`> You don't have the permission to do that !`")
                .setTimestamp()
                .setFooter("By Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
            msg.channel.send(permission_msg)
        }
    }

    if (command === "info"){
        var info_msg = new Discord.RichEmbed()
            .setColor('#e74c3c')
            .setTitle('Informations about the server.')
            .addField("The name of the server is :", "`> " + msg.guild.name + "`")
            .addField("The server was created the :", "`> " + msg.guild.createdAt + "`")
            .addField("You joined the :", "`> " + msg.member.joinedAt + "`")
            .addField("There are :", "`> " + msg.guild.memberCount + " members`")
            .setTimestamp()
            .setFooter("By Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
        msg.channel.send(info_msg)
    }

    if (command === "about"){
        var about_msg = new Discord.RichEmbed()
            .setColor('#e74c3c')
            .setTitle('Informations about me, the bot.')
            .addField("Who I am ?", "`> My name is EvariaBOT and I was developped the 30.04.19 by Xari0x#7387 !`")
            .addField("What can I do ?", "`> Type !help in any channel for have more informations about my usefulness !`")
            .addField("How can I come on your server ?", "`> I am not a public bot, only a few people have access to my data !`")
            .addField("What is my version ?", "`> From what I know, it seems to me that I am in 1.0.1 !`")
            .setTimestamp()
            .setFooter("By Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
        msg.channel.send(about_msg)
    }

    if (command === "changelog"){
        var changelog_msg = new Discord.RichEmbed()
            .setColor('#e74c3c')
            .setTitle('Changelog 1.0.1 - EvariaBOT')
            .addField("30.04.19", "`> Creation of the bot !`\n`> Some new features come soon ...`")
            .setTimestamp()
            .setFooter("By Xari0x | " + msg.author.username, "http://fondationalpha.000webhostapp.com/logo.png")
        msg.channel.send(changelog_msg)
    }
})
