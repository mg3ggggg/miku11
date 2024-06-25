import fs from 'fs';

let timeout = 60000;
let poin = 500;

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;

    // إذا كان هناك سؤال جارٍ في المحادثة
    if (id in conn.tekateki) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tekateki[id][0]);
        throw false;
    }

    // قراءة ملف الأسئلة
    let tekateki = JSON.parse(fs.readFileSync(`./src/JSON/acertijo.json`));
    let json = tekateki[Math.floor(Math.random() * tekateki.length)];
    let _clue = json.response;
    let clue = _clue.replace(/[A-Za-z]/g, '_');
    let caption = `
ⷮ *${json.question}*

*❐↞┇الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)}┇*
*❐↞┇الـجـائـزة💰↞ ${poin} نقاط┇*
*★ MIKU BOT ★*
`.trim();

    // تخزين السؤال والمعلومات ذات الصلة
    conn.tekateki[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(async () => {
            if (conn.tekateki[id]) {
                await conn.reply(m.chat, `*❮ ⌛┇انتهي الوقت┇⌛❯*\n*❐↞┇الاجـابـة✅↞ ${json.response}┇*`, conn.tekateki[id][0]);
                delete conn.tekateki[id];
            }
        }, timeout)
    ];
};

// التحقق من الإجابة
let answerHandler = async (m, { conn }) => {
    let id = m.chat;
    if (!(id in conn.tekateki)) return; // إذا لم يكن هناك سؤال جارٍ في المحادثة

    let correctAnswer = conn.tekateki[id][1].response.toLowerCase();
    let userAnswer = m.text.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
        await conn.reply(m.chat, `*❯ 🎉┃صحيح! الإجابة هي: ${correctAnswer} ┃🎉 ❮*\n*❐↞┇تم إضافة ${conn.tekateki[id][2]} نقاط لك!┇*`, m);
        delete conn.tekateki[id];
    } else {
        await conn.reply(m.chat, '❐┃إجابة خاطئة. حاول مرة أخرى!┃❌ ❯', m);
    }
};

// تسجيل الأوامر
handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(سؤال_انمي|سؤالاني)$/i;

export default handler;

// تسجيل متابع الإجابات
let answerRegex = /^[^ ]+$/i; // نمط للإجابات (كلمة واحدة)
answerHandler.command = answerRegex;

export { answerHandler };
