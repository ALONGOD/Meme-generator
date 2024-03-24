'use strict'


const gImgs = [{ id: 1, url: 'imgs/1.jpg', keywords: ['funny', 'cat'] }, { id: 2, url: 'imgs/2.jpg', keywords: ['funny', 'cat'] }, { id: 3, url: 'imgs/3.jpg', keywords: ['funny', 'cat'] }, { id: 4, url: 'imgs/4.jpg', keywords: ['funny', 'cat'] }, { id: 5, url: 'imgs/5.jpg', keywords: ['funny', 'cat'] }, { id: 6, url: 'imgs/6.jpg', keywords: ['funny', 'cat'] }, { id: 7, url: 'imgs/7.jpg', keywords: ['funny', 'cat'] }, { id: 8, url: 'imgs/8.jpg', keywords: ['funny', 'cat'] }, { id: 9, url: 'imgs/9.jpg', keywords: ['funny', 'cat'] }, { id: 10, url: 'imgs/10.jpg', keywords: ['funny', 'cat'] }, { id: 11, url: 'imgs/11.jpg', keywords: ['funny', 'cat'] }, { id: 12, url: 'imgs/12.jpg', keywords: ['funny', 'cat'] }, { id: 13, url: 'imgs/13.jpg', keywords: ['funny', 'cat'] }, { id: 14, url: 'imgs/14.jpg', keywords: ['funny', 'cat'] }, { id: 15, url: 'imgs/15.jpg', keywords: ['funny', 'cat'] }, { id: 16, url: 'imgs/16.jpg', keywords: ['funny', 'cat'] }]

const randomMemes = [{ selectedImgId: 1, selectedLineIdx: 0, lines: [{ txt: 'when you get a CR', x: 200, y: 50, size: 30, color: 'white' }] },
{ selectedImgId: 2, selectedLineIdx: 0, lines: [{ txt: 'me and your mum ❤️', x: 200, y: 50, size: 30, color: 'black' }] },
{ selectedImgId: 3, selectedLineIdx: 0, lines: [{ txt: 'when you finally finish the sprint', x: 240, y: 300, size: 20, color: 'black' }] },
{ selectedImgId: 4, selectedLineIdx: 0, lines: [{ txt: 'when you finally finish the sprint', x: 200, y: 50, size: 20, color: 'black' }] },
{ selectedImgId: 5, selectedLineIdx: 0, lines: [{ txt: 'when you finally finish the sprint', x: 150, y: 50, size: 20, color: 'black' }] },
{ selectedImgId: 6, selectedLineIdx: 0, lines: [{ txt: 'me trying to explain what i do as a junior', x: 200, y: 50, size: 15, color: 'pink' }] },
{ selectedImgId: 13, selectedLineIdx: 0, lines: [{ txt: 'when you get that junior position', x: 200, y: 50, size: 20, color: 'red' }] },
{ selectedImgId: 9, selectedLineIdx: 0, lines: [{ txt: 'כשהיא אומרת יש לי בית ריק', x: 200, y: 50, size: 30, color: 'black' }] },
{ selectedImgId: 10, selectedLineIdx: 0, lines: [{ txt: 'אובמה פשוט מלך', x: 200, y: 50, size: 50, color: 'black' }] }]


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I eat Falafel',
            size: 50,
            color: 'black'
        },
        {
            txt: 'I Love Falafel',
            size: 50,
            color: 'pink'
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
    const img = getImgs()[id - 1]
    const savedMemes = getSavedMemes()
    const savedMeme = savedMemes.find(meme => meme.selectedImgId === id)
    const gMemeNew = savedMeme ? savedMeme : {
        selectedImgId: id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I love Falafel',
                x: 200,
                y: 250,
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

function setNewLine() {
    if (gMeme.lines.length === 0) {
        const newLine = {
            txt: 'New Line',
            x: 100,
            y: 300,
            size: 30,
            color: 'black'
        }
        gMeme.lines.push(newLine)
    } else {
        const lastLine = gMeme.lines[gMeme.lines.length - 1]
        const newLine = {
            txt: 'New Line',
            x: lastLine.x,
            y: lastLine.y + 50,
            size: lastLine.size,
            color: lastLine.color
        }
        gMeme.lines.push(newLine)
    }
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchSelectedLine() {
    var numLines = gMeme.lines.length
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === numLines) gMeme.selectedLineIdx = 0

}

function deleteSelectedLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
}


function moveLineRight() {
    gMeme.lines[gMeme.selectedLineIdx].x += 10
}
function moveLineLeft() {
    gMeme.lines[gMeme.selectedLineIdx].x -= 10
}
function moveLineUp() {
    gMeme.lines[gMeme.selectedLineIdx].y -= 10
}
function moveLineDown() {
    gMeme.lines[gMeme.selectedLineIdx].y += 10
}

function addEmoji(emoji) {
    gMeme.lines[gMeme.selectedLineIdx].txt += emoji
}


function setRandomMeme() {
    gMeme = randomMemes[getRandomInt(0, randomMemes.length)]
}


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}