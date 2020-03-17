const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

const SOURCE_FILE = path.resolve(__dirname, '../src/index.html')
const DEST_FILE = path.resolve(__dirname, './subset.txt')

const html = fs.readFileSync(SOURCE_FILE, 'utf-8')
const dom = new JSDOM(html)
const { body } = dom.window.document

const texts = [...Array.from(body.querySelectorAll('h1,li')).map(el => el.textContent).join('')]
const subset = texts.filter((str, i, self) => self.indexOf(str) === i).join('')

fs.writeFileSync(DEST_FILE, subset)