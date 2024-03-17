'use strict'

let gCanvas
let gCtx

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

// setTimeout(() => renderMeme, 1000)

function renderMeme() {
    var meme = getMeme()
    const elImg = new Image()
    elImg.src = `imgs/${meme.selectedImgId}.jpg`;
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    drawText(meme.lines[meme.selectedLineIdx].txt, 150, 150, meme.lines[meme.selectedLineIdx].size, meme.lines[meme.selectedLineIdx].color)
    // txt, size, color
}


function drawText(text, x, y, fontSize, color) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    // gCtx.fillStyle = 'lightsteelblue'

    gCtx.font = '45px Arial'
    gCtx.font = `${fontSize} Arial`
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

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
    elLink.href = imgContent;
}

// gallery controller
renderGallery()
function renderGallery() {
    const imgs = getImgs()
    let elImgs = document.querySelector(".gallery")
    let strHtml = imgs.map((img) => {
        return `<img onclick="onImgSelect(${img.id})" src="${img.url}">`
    })
        .join("")
    elImgs.innerHTML = strHtml

}


function onImgSelect(id) {
    setImg(id)
    renderMeme()
}
