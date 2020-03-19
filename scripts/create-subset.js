const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

const SOURCE_FILE = path.resolve(__dirname, '../src/index.html')
const KANA_FILE = path.resolve(__dirname, './subset-kana.txt')
const KANJI_FILE = path.resolve(__dirname, './subset-kanji.txt')

const kana = [...fs.readFileSync(KANA_FILE, 'utf-8')]
const html = fs.readFileSync(SOURCE_FILE, 'utf-8')
const dom = new JSDOM(html)
const { body } = dom.window.document

const texts = [...Array.from(body.querySelectorAll('h1,li,p,button')).map(el => el.textContent).join('')]
const subset = texts.filter(str => !kana.includes(str)).filter((str, i, self) => self.indexOf(str) === i).join('')

fs.writeFileSync(KANJI_FILE, subset)