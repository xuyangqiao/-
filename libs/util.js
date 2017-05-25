/**
 * Created by superXu on 2017/5/23.
 */

let fs = require('fs')
let Promose = require('bluebird')

exports.readFileAsync = (fpath, encodnig) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fpath, encodnig, (err, content) => {
      if (err) reject(err)
      else resolve(content)
    })
  })
}

exports.writeFileAsync = (fpath, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fpath, content, (err, content) => {
      if (err) reject(err)
      else resolve(content)
    })
  })
}