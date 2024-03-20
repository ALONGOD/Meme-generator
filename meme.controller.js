'use strict'

var gCanvas
var gCtx
var gIsDragging = false
var gDragOffsetX = 0
var gDragOffsetY = 0

function onInit() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d')

    gCanvas.addEventListener('mousedown', onMouseDown)
    gCanvas.addEventListener('mousemove', onMouseMove)
    gCanvas.addEventListener('mouseup', onMouseUp)

    gCanvas.addEventListener('touchstart', onTouchStart)
    gCanvas.addEventListener('touchmove', onTouchMove)
    gCanvas.addEventListener('touchend', onTouchEnd)
    renderGallery()
}
function onTouchStart(event) {
    event.preventDefault()
    const touch = event.touches[0]
    const touchX = touch.clientX - gCanvas.getBoundingClientRect().left
    const touchY = touch.clientY - gCanvas.getBoundingClientRect().top

    gMeme.lines.forEach((line, idx) => {
        const textWidth = getTextWidth(line.txt, line.size, 'Arial')
        const textHeight = line.size

        const rectX = line.x - textWidth / 2 - 10
        const rectY = line.y - textHeight / 2 - 5
        const rectWidth = textWidth + 20
        const rectHeight = textHeight + 10

        if (touchX >= rectX && touchX <= rectX + rectWidth && touchY >= rectY && touchY <= rectY + rectHeight) {
            gIsDragging = true
            gDragOffsetX = touchX - line.x
            gDragOffsetY = touchY - line.y
            gMeme.selectedLineIdx = idx
            renderMeme();
        }
    });
}
function onTouchMove(event) {
    event.preventDefault()
    if (!gIsDragging) return

    const touch = event.touches[0];
    const touchX = touch.clientX - gCanvas.getBoundingClientRect().left
    const touchY = touch.clientY - gCanvas.getBoundingClientRect().top

    gMeme.lines[gMeme.selectedLineIdx].x = touchX - gDragOffsetX
    gMeme.lines[gMeme.selectedLineIdx].y = touchY - gDragOffsetY

    renderMeme()
}
function onTouchEnd(event) {
    event.preventDefault()
    gIsDragging = false
}
function onMouseDown(event) {
    const mouseX = event.offsetX
    const mouseY = event.offsetY

    const meme = getMeme()
    meme.lines.forEach((line, idx) => {
        const textWidth = getTextWidth(line.txt, line.size, 'Arial')
        const textHeight = line.size

        const rectX = line.x - textWidth / 2 - 10
        const rectY = line.y - textHeight / 2 - 5
        const rectWidth = textWidth + 20
        const rectHeight = textHeight + 10

        if (mouseX >= rectX && mouseX <= rectX + rectWidth && mouseY >= rectY && mouseY <= rectY + rectHeight) {
            gIsDragging = true
            gDragOffsetX = mouseX - line.x
            gDragOffsetY = mouseY - line.y
            gMeme.selectedLineIdx = idx
            renderMeme();
        }
    })
}
function onMouseMove(event) {
    if (!gIsDragging) return

    const mouseX = event.offsetX
    const mouseY = event.offsetY

    gMeme.lines[gMeme.selectedLineIdx].x = mouseX - gDragOffsetX
    gMeme.lines[gMeme.selectedLineIdx].y = mouseY - gDragOffsetY

    renderMeme()
}
function onMouseUp() {
    gIsDragging = false;
}
function toggleSections(elSection = { innerText: 'Editor' }) {
    if (elSection.innerText === 'Gallery') {
        document.querySelector('.editor').classList.add('hide')
        document.querySelector('.saved').classList.add('hide')
        document.querySelector('.gallery').classList.remove('hide')
    }
    if (elSection.innerText === 'Editor') {
        document.querySelector('.gallery').classList.add('hide')
        document.querySelector('.saved').classList.add('hide')
        document.querySelector('.editor').classList.remove('hide')
    }
    if (elSection.innerText === 'Saved') {
        document.querySelector('.saved').classList.remove('hide')
        document.querySelector('.gallery').classList.add('hide')
        document.querySelector('.editor').classList.add('hide')
    }
}
function renderMeme() {
    var meme = getMeme();
    const elImg = new Image()
    elImg.src = `imgs/${meme.selectedImgId}.jpg`;

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
        // Draw meme lines
        meme.lines.forEach((line, idx) => {
            if (idx === meme.selectedLineIdx) {
                // Get the width and height of the text
                const textWidth = getTextWidth(line.txt, line.size, ' Montserrat');
                const textHeight = line.size + 30
                // Calculate the position and dimensions of the rectangle
                const rectX = line.x - textWidth / 2 - 10; // Adjusted for center alignment
                const rectY = line.y - textHeight / 2 - 5; // Adjusted for center alignment
                const rectWidth = textWidth + 20; // Add padding for the sides
                const rectHeight = textHeight + 10; // Add padding for the top and bottom
                // Draw a frame around the selected line
                gCtx.strokeStyle = 'white'; // Set the color of the frame
                gCtx.lineWidth = 3; // Set the width of the frame
                gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)
            }
            drawText(line.txt, line.x, line.y, line.size, line.color)
        })
    }
}
function getTextWidth(text, fontSize, fontFace) {
    var canvas = document.createElement('canvas')
    var context = canvas.getContext('2d')
    context.font = fontSize + 'px ' + fontFace
    return context.measureText(text).width
}
function drawText(text, x = 100, y = 100, fontSize, color) {
    var meme = getMeme()
    document.getElementById("text").value = meme.lines[meme.selectedLineIdx].txt

    gCtx.lineWidth = 2
    gCtx.strokeStyle = color

    gCtx.fillStyle = color

    gCtx.font = `${fontSize}px  Montserrat`
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
function renderGallery() {
    const imgs = getImgs()
    const elImgs = document.querySelector(".gallery")
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