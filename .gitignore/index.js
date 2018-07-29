const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

const {get} = require ("snekfetch")

var prefix = ("y!")

bot.on('ready', function() {
    bot.user.setGame("Command: y!help")
});

bot.login(process.env.TOKEN)

bot.on('message', message => {

    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb =db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();

    if (message.content === prefix + "xp"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setTitle(`Stat des XP de ${message.author.username}`)
            .setColor('#0x00FFFF')
            .setDescription("Affichage des XP")
            .addField("XP:", `${xpfinal[1]} xp`)
            .setFooter("Enjoy :p")
        message.channel.send({embed: xp_embed});
        
}}})

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

