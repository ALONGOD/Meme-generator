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
    var meme = getMeme();
    const elImg = new Image();
    elImg.src = `imgs/${meme.selectedImgId}.jpg`;
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);

    // Draw meme lines
    meme.lines.forEach((line, idx) => {
        if (idx === meme.selectedLineIdx) {
            // Get the width and height of the text
            const textWidth = getTextWidth(line.txt, line.size, 'Arial');
            const textHeight = line.size;

            // Calculate the position and dimensions of the rectangle
            const rectX = line.x - textWidth / 2 - 10; // Adjusted for center alignment
            const rectY = line.y - textHeight / 2 - 5; // Adjusted for center alignment
            const rectWidth = textWidth + 20; // Add padding for the sides
            const rectHeight = textHeight + 10; // Add padding for the top and bottom

            // Draw a frame around the selected line
            gCtx.strokeStyle = 'white'; // Set the color of the frame
            gCtx.lineWidth = 3; // Set the width of the frame
            gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight);
        }
        drawText(line.txt, line.x, line.y, line.size, line.color);
    });
}

function getTextWidth(text, fontSize, fontFace) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = fontSize + 'px ' + fontFace;
    return context.measureText(text).width;
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

function onDeleteLine() {
    deleteSelectedLine()
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
    toggleSections()
    setImg(id)
    renderMeme()
}



function onDownloadImg(elLink) {
    const imgContent = gCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
    elLink.href = imgContent;
}


