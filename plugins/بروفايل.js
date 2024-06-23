const { sck, sck1,cmd, jsonformat, botpic, TelegraPh, RandomXP, Config, tlang, warndb, sleep,getAdmin,getBuffer, prefix } = require('../lib')
const moment = require("moment-timezone");
const fs = require('fs-extra')
const Levels = require("discord-xp");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");

cmd({
            pattern: "profile",
            alias: ["ايدي","بروفايل","me","انا","ا"],
            desc: "Shows profile of user.",
            category: "group",
            filename: __filename,
        },
        async(Void, citel, text) => {
            var bio = await Void.fetchStatus(citel.sender);
            var bioo = bio.status;
            let meh = citel.sender;
            const userq = await Levels.fetch(citel.sender, "RandomXP");
            const lvpoints = userq.level;
            var role = "فنان✨";
             if (lvpoints <=  2) { var role = "🏳مواطن"; } 
	else if (lvpoints <=  4) { var role = "👼طبيب اطفال"; } 
	else if (lvpoints <=  6) { var role = "🧙‍♀️ساحر";  } 
	else if (lvpoints <=  8) { var role = "🧙‍♂️معالج روحاني"; }
	else if (lvpoints <= 10) { var role = "🧚🏻طفل ملاك";  } 
	else if (lvpoints <= 12) { var role = "🧜ملاك"; } 
	else if (lvpoints <= 14) { var role = "🧜‍♂️سيد الملاك";} 
	else if (lvpoints <= 16) { var role = "🌬طفل نوبل"; } 
	else if (lvpoints <= 18) { var role = "❄نوبل"; }
	else if (lvpoints <= 20) { var role = "⚡سريع النخبه"; } 
	else if (lvpoints <= 22) { var role = "🎭نخبه"; } 
	else if (lvpoints <= 24) { var role = "🥇بارع I"; }
	else if (lvpoints <= 26) { var role = "🥈بارع II"; } 
	else if (lvpoints <= 28) { var role = "🥉متفوق بارع"; }
	else if (lvpoints <= 30) { var role = "🎖متفوق مسيطر";} 
	else if (lvpoints <= 32) { var role = "🏅متفوق النخبه"; }
	else if (lvpoints <= 34) { var role = "🏆فائق";}
	else if (lvpoints <= 36) { var role = "💍فائق I";}
	else if (lvpoints <= 38) { var role = "💎فائق Ii";} 
	else if (lvpoints <= 40) { var role = "🔮سيد اللعبه";} 
	else if (lvpoints <= 42) { var role = "🛡اسطوره III";} 
	else if (lvpoints <= 44) { var role = "🏹اسطوره II";} 
	else if (lvpoints <= 46) { var role = "⚔اسطوره"; } 
	else if (lvpoints <= 55) { var role = "🐉ابدي"; }
	
            let ttms = `${userq.xp}` / 8;
            const timenow = moment(moment())
                .format('HH:mm:ss')
            moment.tz.setDefault('Africa/Lagos')
                .locale('id')
            try {
                pfp = await Void.profilePictureUrl(citel.sender, "image");
            } catch (e) {
                pfp = await botpic();
            }
            const profile = `
*↫ صوره قمر زي صاحبها 🥺♥.!*
*⌁︙اسمڪ🪪↫ ${citel.pushName}*
*⌁︙تفاعلـڪ💥↫ سايق مخده 😹*
*⌁︙مستواڪ💎↫ ${userq.level}*
*⌁︙دورڪ🏅↫ ${role}*
*⌁︙نقاطـڪ♦️↫ ${userq.xp}*
*⌁︙رسائلـڪ🧩↫ ${ttms}*
*⌁︙البـايـــو⚡↫ ${bioo}*
`;
            let buttonMessage = {
                image: {
                    url: pfp,
                },
                caption: profile,
                footer: tlang().footer,
                headerType: 4,
            };
            Void.sendMessage(citel.chat, buttonMessage, {
                quoted: citel,
            });

        }
    )

