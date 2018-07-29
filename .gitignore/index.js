const Discord = require('discord.js');
const bot = new Discord.Client();

const {get} = require ("snekfetch")

var prefix = ("y!")

bot.on('ready', function() {
    bot.user.setGame("Command: y!help")
});

bot.login(process.env.TOKEN)


bot.on('message', message => {

    if (message.content === prefix + "help"){
        message.channel.sendMessage("Liste des commandes: \n y!invite \n y!info");
    }

    if (message.content === "Salut"){
        message.reply("salut. :)");
        console.log("Commande Salut effectué");
    }
});

bot.on("message", message => {

    if (message.content === prefix + "invite"){
        message.channel.sendMessage("My link is https://discordapp.com/oauth2/authorize?client_id=452743579685617675&scope=bot&permissions=134202")
    }

    if (message.content === prefix + "info"){
        var embed = new Discord.RichEmbed()
        .setTitle("Yuri")
        .setDescription("Bot fabriqué et codé par Monayori")
        .addField("y!help", "Page des commandes", true)
        .addField("Youtube", "Abonnez vous a la créatrice ! [Monayori](https://www.youtube.com/channel/UCeqHkMWlfoal9m7N-GYv-OQ)", true)
        .setColor("0x00FFFF")
        .setFooter("Yuri Bot")
        message.channel.sendEmbed(embed);

}})
