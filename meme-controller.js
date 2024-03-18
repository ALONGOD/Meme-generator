'use strict'

let gCanvas
let gCtx
const TOUCH_EVS = ["touchstart", "touchmove", "touchend"];

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

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);

        // Draw meme lines
        meme.lines.forEach((line, idx) => {
            if (idx === meme.selectedLineIdx) {
                // Get the width and height of the text
                const textWidth = getTextWidth(line.txt, line.size, 'Arial');
                const textHeight = line.size + 30;

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

function onRandomMeme() {
    toggleSections()
    setRandomMeme()
    renderMeme()
}


function onDownloadImg(elLink) {
    const imgContent = gCanvas.toDataURL("image/jpeg"); // image/jpeg the default format
    elLink.href = imgContent;
}


function insertEmoji(emoji) {
    addEmoji(emoji)
    renderMeme()

}
function onShareFacebook() {
    // Gets the image from the canvas
    const imgDataUrl = gCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        // Handle some special characters
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }

    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

// Upload the image to a server, get back a URL 
// call the function onSuccess when done
function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}