const { Client } = require('whatsapp-web.js');
const { createHash } = require('crypto');
const PhoneNumber = require('awesome-phonenumber');
const fetch = require('node-fetch');

const client = new Client({
    auth: 'qr', // or 'session'
    session: 'MysticSession', // Replace with your session path
});

// ... (QR Code and ready events)

client.on('message', async (message) => {
    if (message.body === '.لقبة') {
        const senderName = message.from.name;
        const senderJid = message.from.jid;

        // Ask for the nickname
        await message.reply('**أدخل لقبك:**');

        const nicknameResponse = await message.awaitMessage({
            type: 'text',
        });

        const nickname = nicknameResponse.body;

        // Save the nickname to the database or storage
        await saveNickname(senderJid, nickname);
        console.log(`Nickname for ${senderName} is ${nickname}`);

        // Send a confirmation message
        await message.reply(`**تم تسجيل لقبك بنجاح: ${nickname}**`);
    } else if (message.body.startsWith('.تعديل_لقب')) {
        const senderJid = message.from.jid;
        const senderName = message.from.name;

        // Extract the nickname from the message
        const nicknameParts = message.body.split(' ');
        if (nicknameParts.length < 2) {
            await message.reply('**خطأ:** يرجى كتابة الأمر بشكل صحيح: `.تعديل_لقب <اللقب_الجديد>`');
            return;
        }

        const newNickname = nicknameParts[1];

        // Update the nickname in the database or storage
        await updateNickname(senderJid, newNickname);
        console.log(`Updating nickname for ${senderName} to ${newNickname}`);

        // Send a confirmation message
        await message.reply(`**تم تحديث لقبك بنجاح: ${newNickname}**`);
    } else if (message.body === '.الالقاب') {
        // Retrieve nicknames from database or storage
        const nicknames = await getNicknames();

        // Generate a message with nicknames and mentions
        let nicknamesMessage = '';
        for (const userId in nicknames) {
            const nickname = nicknames[userId];
            nicknamesMessage += `* @${userId} : ${nickname}\n`;
        }

        // Send the nicknames message
        await message.reply(nicknamesMessage);
    } else if (message.body.startsWith('.حذف_لقب')) {
        const senderJid = message.from.jid;
        const senderName = message.from.name;

        // Remove the nickname from the database or storage
        await deleteNickname(senderJid);
        console.log(`Deleting nickname for ${senderName}`);

        // Send a confirmation message
        await message.reply(`**تم حذف لقبك بنجاح.**`);
    }
});

// ... (Error and connect events)

// Function to get user profile information
async function
