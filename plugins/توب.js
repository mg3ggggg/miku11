import util from 'util'
import path from 'path'

let user = a => '@' + a.split('@')[0]
let cooldowns = {}

function handler(m, { groupMetadata, command, conn, text, usedPrefix }) {
    let now = Date.now()
    let groupId = m.chat

    if (!cooldowns[groupId]) cooldowns[groupId] = {}
    if (cooldowns[groupId][command] && now - cooldowns[groupId][command] < 20 * 60 * 1000) {
        let remainingTime = ((20 * 60 * 1000) - (now - cooldowns[groupId][command])) / 1000
        let minutes = Math.floor(remainingTime / 60)
        let seconds = Math.floor(remainingTime % 60)
        throw `*يمكنك استخدام هذا الأمر بعد ${minutes} دقيقة و ${seconds} ثانية*`
    }

    if (!text) throw `*مـثـال : .توب متفاعلين*`

    let ps = groupMetadata.participants.map(v => v.id)
    let a = ps.getRandom()
    let b = ps.getRandom()
    let c = ps.getRandom()
    let d = ps.getRandom()
    let e = ps.getRandom()
    let f = ps.getRandom()
    let g = ps.getRandom()
    let h = ps.getRandom()
    let i = ps.getRandom()
    let j = ps.getRandom()
    let k = Math.floor(Math.random() * 70)
    let x = `${pickRandom(['✨', '🤍', '🔥', '💫', '😎', '💫', '🤍', '🤍', '✨', '🤍', '✨', '🤨', '💫', '🔥', '🔥', '💫', '🤍', '🤍'])}`
    let l = Math.floor(Math.random() * x.length)
    let top = `*${x} توب 10 ${text} ${x}*

*1. ${user(a)}*
*2. ${user(b)}*
*3. ${user(c)}*
*4. ${user(d)}*
*5. ${user(e)}*
*6. ${user(f)}*
*7. ${user(g)}*
*8. ${user(h)}*
*9. ${user(i)}*
*10. ${user(j)}*`.trim()

    conn.sendFile(m.reply(top, null, { mentions: [a, b, c, d, e, f, g, h, i, j] }))
    cooldowns[groupId][command] = now
}

handler.help = handler.command = ['توب']
handler.tags = ['fun']
handler.group = true
handler.limit = 0
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
