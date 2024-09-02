const request = require('request')
const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment')
require('moment-duration-format')
moment.locale('tr')
console.log(chalk.green(`WARBAND KEY GENERATOR | v${require('./package.json').version}`))
const keyGenerator = {
    generateKey: () => {

        const key1 = makeWordComb(4)
        const key2 = makeWordComb(4)
        const key3 = makeWordComb(4)
        const key4 = makeWordComb(4)

        return `${key1}-${key2}-${key3}-${key4}`
    }
}

function makeWordComb(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result;
}

global.log = console.log
let i = 1;
let success = 0;
setInterval(() => {
    const key = keyGenerator.generateKey()
    request(`https://warbandmain.taleworlds.com/handlerservers.ashx?type=list&gametype=wb`, (error, response, body) => { //http://warbandmain.taleworlds.com/handlerservers.ashx?type=chkserial&serial=&ip=69.164.193.205&gametype=warband
        if (error) {
            log(chalk.red.bold(`.:: [ TALEWORLDS SERVER HANDLER ERROR ] ::. \n${error}`))
        } else {
            setTerminalTitle(`Mount Blade: Warband - Key Generator - by: Custy | v${require('./package.json').version} | ${i} keys generated. | ${i - success} keys failed. | ${success} keys success.`)
            log(chalk.hex('#5865F2').bold(`.:: [ TALEWORLDS SERIAL KEY HANDLER TESTING ] ::. ${key}`))
            i++
            fs.readFile('workingnotcheckedlist.txt', 'utf8', function (err, data) {
                if (err) return log(err)
                if (data.split('|')[data.split('|').length] !== key) {
                    fs.writeFileSync('workingnotcheckedlist.txt', `${key}|\n`, { encoding: "utf8", flag: "a+", mode: 0o666 }, function (err, result) {
                        if (err) console.log('error', err)
                    })
                }
            })

            request(`https://warbandmain.taleworlds.com/handlerservers.ashx?type=chkserial&serial=${key}&ip=${body.split('|')[getRandom(body.split('|'))]}&gametype=wb`, (error2, response, body2) => {
                if (error2) {
                    log(chalk.red.bold(`.:: [ TALEWORLDS SERIAL KEY HANDLER ERROR ] ::. \n${error}`))
                } else {
                    log(chalk.yellow(`.:: [ TALEWORLDS SERIAL KEY HANDLER CHECKED ] ::. ${key}`))
                    if (body2 === '-1') {
                        log(chalk.red.bold(`.:: [ TALEWORLDS SERIAL KEY HANDLER INVALID ] ::. ${key}`))
						log('')
                        fs.readFile('workingnot.txt', 'utf8', function (err, data) {
                            if (err) return log(err)
                            if (data.split('|')[data.split('|').length] !== key) {
                                fs.writeFileSync('workingnot.txt', `${key}|${new Date().toLocaleDateString()}/${moment().format('L')}/${moment().format('LTS')}\n`, { encoding: "utf8", flag: "a+", mode: 0o666 }, function (err, result) {
                                    if (err) console.log('error', err)
                                })
                            }
                        })

                    } else if (body2.includes('|') && body.length < 27) {
						log(chalk.green.bold(`.:: 													::.`))
                        log(chalk.green.bold(`.:: [ TALEWORLDS SERIAL KEY HANDLER VALID ] ::. ${key}`))
						log(chalk.green.bold(`.:: [ TALEWORLDS SERIAL KEY HANDLER VALID ] ::. ${body2}`))
						log(chalk.green.bold(`.:: 													::.`))
                        success++
                        fs.readFile('working.txt', 'utf8', function (err, data) {
                            if (err) return log(err)
                            if (data.split('|')[data.split('|').length] !== key) {
                                fs.writeFileSync('working.txt', `\n${key}|${body2}|${new Date().toLocaleDateString()}/${moment().format('L')}/${moment().format('LTS')}\n`, { encoding: "utf8", flag: "a+", mode: 0o666 }, function (err, result) {
                                    if (err) console.log('error', err)
                                })
                            }
                        })
                    } else {
						log(chalk.white.bold(`.:: 													::.`))
                        log(chalk.white.bold(`.:: [ TALEWORLDS SERIAL KEY HANDLER VALID-UNVALID ] ::. ${key}`))
						log(chalk.white.bold(`.:: [ TALEWORLDS SERIAL KEY HANDLER VALID-UNVALID ] ::. ${body2}`))
						log(chalk.white.bold(`.:: 													::.`))
                        fs.readFile('working-undefined.txt', 'utf8', function (err, data) {
                            if (err) return log(err)
                            if (data.split('|')[data.split('|').length] !== key) {
                                fs.writeFileSync('working-undefined.txt', `\n${key}|${body2}|${new Date().toLocaleDateString()}/${moment().format('L')}/${moment().format('LTS')}\n`, { encoding: "utf8", flag: "a+", mode: 0o666 }, function (err, result) {
                                    if (err) console.log('error', err)
                                })
                            }
                        })
					}
                }
            })
        }
    })
}, 5000)

function getRandom (items) {
  return items[Math.floor((Math.random() * items.length))]
}

function setTerminalTitle(title) {
  process.stdout.write(String.fromCharCode(27) + "]0;" + title + String.fromCharCode(7))
}