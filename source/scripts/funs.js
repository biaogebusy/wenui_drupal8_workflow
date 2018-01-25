module.exports = {
  checkFile(file){
    return fs.existsSync(file)
  }
}