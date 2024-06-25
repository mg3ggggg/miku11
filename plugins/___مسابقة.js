const words = [
    '*ايانوكوجي*',
    '*اوبيتو*',
    '*لوفي*',
    '*ليفاي*',
    '*زورو*',
    '*شادو*',
    '*فايوليت*',
    '*بروك*',
    '*ايسديث*',
    '*استا*',
    '*اشيلاد*',
    'ميكو',
    '*الوكا*',
    '*انوس*',
    '*ايرين*',
    '*بينيمارو*',
    '*دابي*',
    '*جين*',
    '*رايلي*',
    '*سانجي*',
    '*غوجو*',
    '*شانكس*',
    '*غوكو*',
    '*غون*',
    '*غيوتارو*',
    '*فانيتاس*',
    '*كاكاشي*',
    '*كانيكي*',
    '*كروكودايل*',
    '*كلوي*',
    '*لويس*',
    '*ايرزا*',
    '*مادارا*',
    '*ماركو*',
    '*ميدوريا*',
    '*ميراجين*',
    '*ناغي*',
    '*هيناتا*',
    '*ناروتو*',
    '*هوتارو*',
    '*ويليام*',
    '*يامي*',
    '*روبين*',
    '*نامي*',
    '*يوتا*',
    '*نينو*',
    '*اينيل*',
    '*يوسا*',
    '*سيرينا*',
    '*ساشا*',
    '*لاو*',
    '*ايس*',
    '*كايدو*',
    '*ساسكي*',
    '*سوبارو*',
    '*اودن*',
    '*كايزر*'
];

let activeCompetition = {
    chatId: null,
    wordsToSend: [],
    participants: [],
    scores: {}
};

const handler = async (m, { conn, args }) => {
    if (!args[0] || isNaN(args[0])) {
        throw 'الرجاء إدخال عدد صحيح للكلمات المراد إرسالها.';
    }

    const numberToSend = parseInt(args[0]);
    if (numberToSend <= 0 || numberToSend > words.length) {
        throw 'الرجاء إدخال عدد صحيح إيجابي يكون أقل من أو يساوي عدد الكلمات المتاحة.';
    }

    // اختيار كلمات عشوائية
    activeCompetition.wordsToSend = [];
    for (let i = 0; i < numberToSend; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        activeCompetition.wordsToSend.push(words[randomIndex]);
    }

    activeCompetition.chatId = m.chat;
    activeCompetition.participants = [];
    activeCompetition.scores = {};

    await conn.sendMessage(m.chat, 'تم بدء المسابقة. يرجى كتابة الكلمة الصحيحة بالطريقة الصحيحة عندما تظهر.');
};
handler.command = /^\.مسابقة$/i;
handler.tags = ['competition'];

export default handler;

const handler = async (m) => {
    const { chatId, wordsToSend, participants, scores } = activeCompetition;
    if (!chatId || m.chat !== chatId) return;

    const text = m.text.toLowerCase();
    const currentWord = wordsToSend[participants.length];

    if (text === currentWord.toLowerCase()) {
        const sender = m.sender;
        if (!participants.includes(sender)) {
            participants.push(sender);
            if (!scores[sender]) scores[sender] = 0;
            scores[sender]++;
            await m.reply('تم تسجيل إجابتك الصحيحة وإضافة نقطة لك.');
        }
    }

    if (participants.length === wordsToSend.length) {
        let message = 'انتهت المسابقة.\n\nالنتائج:\n';
        participants.forEach((participant, index) => {
            const score = scores[participant] || 0;
            message += `@${participant.replace('@c.us', '')} - ${score} نقطة\n`;
        });

        await m.reply(message);
        activeCompetition = {
            chatId: null,
            wordsToSend: [],
            participants: [],
            scores: {}
        };
    }
};
handler.command = /^.+$/i;
handler.tags = ['competition'];

export default handler;
