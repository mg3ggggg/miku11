import translate from '@vitalets/google-translate-api';
import axios from 'axios';
import fetch from 'node-fetch';
import fs from 'fs';

const handler = async (m, { conn, text, command, args, usedPrefix }) => {
    const idioma = global.db.data.users[m.sender].language || 'ar'; // تحديد لغة المستخدم، إفتراضياً العربية
    const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`));
    const tradutor = _translate.plugins.fun_simi;

    if (!text) throw `${tradutor.texto1} ${usedPrefix + command} مرحبا ميكو*`;
    try {
        const resSimi = await simitalk(text);
        conn.sendMessage(m.chat, { text: resSimi.resultado.simsimi }, { quoted: m });
    } catch {
        throw tradutor.texto2; // رسالة الخطأ عند حدوث مشكلة في الاتصال بالAPI
    }
};

handler.help = ['bot', 'simi'].map((v) => v + ' <teks>'); // مساعدة الأمر
handler.tags = ['fun']; // وسم يصف طبيعة الأمر
handler.command = /^((سيمي|ميكو|بوت|اليكسا|كورتانا))$/i; // تعريف الأمر بنمط ال Regex

export default handler;

async function simitalk(ask, apikeyyy = "iJ6FxuA9vxlvz5cKQCt3", language = "ar") {
    if (!ask) return { status: false, resultado: { msg: "يجب إدخال نص للتحدث مع ميكو." }};
    try {
        const response1 = await axios.get(`https://delirios-api-delta.vercel.app/tools/simi?text=${encodeURIComponent(ask)}`);
        const trad1 = await translate(`${response1.data.data.message}`, {to: language, autoCorrect: true});
        if (trad1.text == 'indefينida' || response1 == '' || !response1.data) trad1 = XD; // تعامل مع حالات خاصة للردود غير المتوقعة
        return { status: true, resultado: { simsimi: trad1.text }};        
    } catch {
        try {
            const response2 = await axios.get(`https://anbusec.xyz/api/v1/simitalk?apikey=${apikeyyy}&ask=${ask}&lc=${language}`);
            return { status: true, resultado: { simsimi: response2.data.message }};       
        } catch (error2) {
            return { status: false, resultado: { msg: "فشلت جميع الAPIs. حاول مرة أخرى لاحقًا.", error: error2.message }};
        }
    }
}
