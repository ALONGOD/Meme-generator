'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

// renderMeme()

function renderMeme() {
    var meme = getMeme()
    const elImg = new Image()
    elImg.src = `imgs/${meme.selectedImgId}.jpg`;
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    drawText(meme.lines[meme.selectedLineIdx].txt, 150, 150)
    // txt, size, color
}


function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'orange'

    gCtx.fillStyle = 'lightsteelblue'

    gCtx.font = '45px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}



function onWriteTxt(elTxt) {
    var text = elTxt.value
    setLineTxt(text)
    renderMeme()
}