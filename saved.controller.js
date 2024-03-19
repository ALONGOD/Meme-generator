'use strict'

function onSaveMeme() {
    const savedMemes = loadFromStorage('savedMemes') || []
    const meme = getMeme()
    savedMemes.push(meme)
    saveToStorage('savedMemes', savedMemes)
    renderSavedMemes()
}

function getSavedMemes() {
    return loadFromStorage('savedMemes') || []
}
function renderSavedMemes() {
    const savedMemes = getSavedMemes(); // Retrieve saved memes
    const savedSection = document.querySelector('.saved'); // Get reference to the "Saved" section

    savedSection.innerHTML = '';

    let strHtml = ''

    savedMemes.forEach((meme, index) => {

        strHtml += `
            <div class="saved-meme">
                <img src="imgs/${meme.selectedImgId}.jpg" onclick="onImgSelect(${meme.selectedImgId})">
                <button class="remove-meme-btn" onclick="removeSavedMeme(${index})">Remove</button>
            </div>
        `
    })
    savedSection.innerHTML = strHtml;
}

function removeSavedMeme(index) {
    const savedMemes = getSavedMemes()
    savedMemes.splice(index, 1)
    saveToStorage('savedMemes', savedMemes)
    renderSavedMemes()
}