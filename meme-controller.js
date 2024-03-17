'use strict'

let gCanvas
let gCtx
var gIsSelectedLine = false

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')
}

function toggleSections() {
    document.querySelector('.gallery').classList.toggle('hide')
    document.querySelector('.editor').classList.toggle('hide')
}


function renderMeme() {
    var meme = getMeme()
    const elImg = new Image()
    elImg.src = `imgs/${meme.selectedImgId}.jpg`;
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    meme.lines.forEach((meme, idx) => {
        if (idx === meme.selectedLineIdx) gIsSelected = true
        drawText(meme.txt, meme.x, meme.y, meme.size, meme.color)
    });
    // drawText(meme.lines[meme.selectedLineIdx].txt, 150, 150, meme.lines[meme.selectedLineIdx].size, meme.lines[meme.selectedLineIdx].color)
    // txt, size, color
}


function drawText(text, x = 100, y = 100, fontSize, color) {
    var meme = getMeme()
    document.getElementById("text").value = meme.lines[meme.selectedLineIdx].txt;

    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    gCtx.fillStyle = color

    gCtx.font = `${fontSize}px Arial`
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

function onChangeColor(elColor) {
    var color = elColor.value
    setColorTxt(color)
    renderMeme()
}

function onChangeFontSize(operator) {
    changeFontSize(operator)
    renderMeme()
}

function onAddLine() {
    setNewLine()
    renderMeme()

}

function onSwitchLine() {
    switchSelectedLine()
    renderMeme()
}

function onMoveLeft() {
    moveLineLeft()
    renderMeme()

}
function onMoveRight() {
    moveLineRight()
    renderMeme()

}
function onMoveUp() {
    moveLineUp()
    renderMeme()

}
function onMoveDown() {
    moveLineDown()
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
        return `<div class="gallery-item">
        <img class="gallery-img" onclick="onImgSelect(${img.id})" src="${img.url}">
        </div>`
    })
        .join("")
    elImgs.innerHTML = strHtml

}


function onImgSelect(id) {
    setImg(id)
    renderMeme()
}



function onDownloadImg(elLink) {
    const imgContent = gCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
    elLink.href = imgContent;
}


