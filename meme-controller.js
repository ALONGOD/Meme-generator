'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

renderMeme()

function renderMeme(elImg) {
    // var elImg = document.querySelector('img')
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)

}