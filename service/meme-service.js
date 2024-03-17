'use strict'

var gImgs = [{ id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] }, { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] }, { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] }]
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I eat Falafel',
            size: 50,
            color: 'black'
        }
    ]
}
var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }


function getMeme() {
    return gMeme
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setColorTxt(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function getImgs() {
    return gImgs
}


function setImg(id) {
    var img = getImgs()[id - 1]
    var gMemeNew = {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I eat Falafel',
                size: 50,
                color: 'black'
            }
        ]

    }
    gMeme = gMemeNew
}


function changeFontSize(operator) {
    operator === '+' ? gMeme.lines[gMeme.selectedLineIdx].size += (10) : gMeme.lines[gMeme.selectedLineIdx].size -= (10)


}