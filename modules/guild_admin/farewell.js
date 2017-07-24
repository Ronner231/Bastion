/**
 * @file farewell command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */
// I don't understand why this is even needed, but some fellows like this.

const string = require('../../handlers/languageHandler');

exports.run = async (Bastion, message) => {
  if (!message.member.hasPermission(this.help.userPermission)) {
    /**
     * User has missing permissions.
     * @fires userMissingPermissions
     */
    return Bastion.emit('userMissingPermissions', this.help.userPermission);
  }

  let guildSettings = await Bastion.db.get(`SELECT farewell, farewellChannelID FROM guildSettings WHERE guildID=${message.guild.id}`).catch(e => {
    Bastion.log.error(e);
  });

  let color, farewellStats;
  if (guildSettings.farewellChannelID === message.channel.id) {
    await Bastion.db.run(`UPDATE guildSettings SET farewell='false', farewellChannelID=null WHERE guildID=${message.guild.id}`).catch(e => {
      Bastion.log.error(e);
    });
    color = Bastion.colors.red;
    farewellStats = 'Farewell Messages are now disabled.';
  }
  else {
    await Bastion.db.run(`UPDATE guildSettings SET farewell='true', farewellChannelID=${message.channel.id} WHERE guildID=${message.guild.id}`).catch(e => {
      Bastion.log.error(e);
    });
    color = Bastion.colors.green;
    farewellStats = 'Farewell Messages are now enabled in this channel.';
  }

  message.channel.send({
    embed: {
      color: color,
      description: farewellStats
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [],
  enabled: true
};

exports.help = {
  name: 'farewell',
  description: string('farewell', 'commandDescription'),
  botPermission: '',
  userPermission: 'ADMINISTRATOR',
  usage: 'farewell',
  example: []
};
