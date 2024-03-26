'use strict'

function onSaveMeme() {
    const savedMemes = loadFromStorage('savedMemes') || []
    const meme = getMeme()
    savedMemes.push(meme)
    saveToStorage('savedMemes', savedMemes)
    renderSavedMemes()
    displaySuccessMessage()
}
function displaySuccessMessage() {
    const successMessageContainer = document.querySelector('.success-message');
    successMessageContainer.style.opacity = '1'
    setTimeout(() => { successMessageContainer.style.opacity = '0' }, 3000)
}

function getSavedMemes() {
    return loadFromStorage('savedMemes') || []
}
function renderSavedMemes() {
    const savedMemes = getSavedMemes()
    const savedSection = document.querySelector('.saved')

    savedSection.innerHTML = ''

    let strHtml = ''

    savedMemes.forEach((meme, index) => {

        strHtml += `
            <div class="saved-meme">
                <img src="imgs/${meme.selectedImgId}.jpg" onclick="onImgSelect(${meme.selectedImgId})">
                <button class="remove-meme-btn" onclick="removeSavedMeme(${index})">Remove</button>
            </div>
        `
    })
    savedSection.innerHTML = strHtml
}

function removeSavedMeme(index) {
    const savedMemes = getSavedMemes()
    savedMemes.splice(index, 1)
    saveToStorage('savedMemes', savedMemes)
    renderSavedMemes()
}