"use strict"

var sourceCanvas = null
var sourceContext = null

var resultCanvas = null
var resultContext = null

var mosaicDimension = 300

///////////////////////////////////////////////////////////////////////////////

function initLogic() {
    //
    sourceCanvas = goodbye.createCanvas(600, 400)
    sourceContext = sourceCanvas.getContext("2d")
    //
    resultCanvas = goodbye.createCanvas(300, 300)
    resultContext = resultCanvas.getContext("2d")
}

///////////////////////////////////////////////////////////////////////////////

function save() {
    //
    let name = box.get("base.options.name").getText() 
    //
    if (name == "") { name = "mosaic-generated" }
    //
    const cnv = goodbye.createCanvas(mosaicDimension, mosaicDimension)
    const ctx = cnv.getContext("2d")
    //
    let left = 0
    let top = 0
    //
    while (true) {
        //
        ctx.drawImage(resultCanvas, left, top)    
        //
        left += 300
        if (left >= mosaicDimension) { 
            left = 0
            top += 300
            if (top >= mosaicDimension) { break }
        }
    }
    //
    goodbye.saveImage(name + ".png",  cnv) 
}

///////////////////////////////////////////////////////////////////////////////

function loadSourceImage() {
    //
    goodbye.loadImage(sourceImageLoaded) 
}

function sourceImageLoaded(source) {
    //
    box.get("base.header.save").enable()
    //
    box.get("base.options.size").enable()
    //
    box.get("base.options.randomize").enable()
    //
    const panel = box.get("base.source")
    //
    if (box.get("base.options.stretch").getChecked()) {
        //
        sourceContext.drawImage(source, 0,0,source.width,source.height, 0,0,600,400)
    }
    else {    
        //
        sourceContext.drawImage(goodbye.createCheckerboard(600, 400, 50, 50, "silver", "gainsboro"), 0, 0)
        //
        const adjusted = createAdjustedImage(source)
        //
        const left = Math.floor((600 - adjusted.width) / 2)
        //
        const top = Math.floor((400 - adjusted.height) / 2)
        //
        sourceContext.drawImage(adjusted, left, top)
    }
    //
    panel.paintImage(sourceCanvas, 0, 0)
    //
    createMosaic(300, 200)
}

function createAdjustedImage(source) {
    //
    const widthFactor = 600 / source.width 
    const heightFactor = 400 / source.height 
    //
    const factor = (widthFactor <= heightFactor) ? widthFactor : heightFactor
    //
    const width = Math.round(source.width * factor) 
    const height = Math.round(source.height * factor) 
    //
    const cnv = goodbye.createCanvas(width, height)
    const ctx = cnv.getContext("2d")
    //
    ctx.drawImage(source, 0,0,source.width,source.height, 0,0,width,height)
    //
    return cnv
}

///////////////////////////////////////////////////////////////////////////////

function randomize() {
    //
    const maxX = 600 - 75
    const x = Math.floor(Math.random() * maxX)
    //
    const maxY = 400 - 75
    const y = Math.floor(Math.random() * maxY)
    //
    createMosaic(x, y)
}

///////////////////////////////////////////////////////////////////////////////

function createMosaic(x, y) {
    //
    const o = goodbye.createCanvas(75, 75) // original
    const ctx = o.getContext("2d")
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, 75, 75)
    ctx.drawImage(sourceCanvas, -x, -y)
    //
    let h = goodbye.cloneImage(o)
    horizontalReverse(h)
    //
    let v = goodbye.cloneImage(o)
    verticalReverse(v)
    //
    let hv = goodbye.cloneImage(v)
    horizontalReverse(hv)
    //
    resultContext.drawImage(o,   0,   0)
    resultContext.drawImage(h,  75,   0)
    resultContext.drawImage(o, 150,   0)
    resultContext.drawImage(h, 225,   0)
    //
    resultContext.drawImage(v,   0,  75)
    resultContext.drawImage(hv, 75,  75)
    resultContext.drawImage(v, 150,  75)
    resultContext.drawImage(hv,225,  75)
    //
    resultContext.drawImage(o,   0, 150)
    resultContext.drawImage(h,  75, 150)
    resultContext.drawImage(o, 150, 150)
    resultContext.drawImage(h, 225, 150)
    //
    resultContext.drawImage(v,   0, 225)
    resultContext.drawImage(hv, 75, 225)
    resultContext.drawImage(v, 150, 225)
    resultContext.drawImage(hv,225, 225)
    //
    resultContext.drawImage(o,   0, 300)
    resultContext.drawImage(h,  75, 300)
    resultContext.drawImage(o, 150, 300)
    resultContext.drawImage(h, 225, 300)
    //
    box.get("base.result").paintImage(resultCanvas, 0, 0)
}

///////////////////////////////////////////////////////////////////////////////

function horizontalReverse(src) { 
    const ctx = src.getContext("2d")
    const clone = goodbye.cloneImage(src)
    //
    ctx.clearRect(0, 0, src.width, src.height)
    ctx.save()
    ctx.translate(src.width, 0)
    ctx.scale(-1, 1)
    ctx.drawImage(clone, 0, 0)
    ctx.restore()
}

///////////////////////////////////////////////////////////////////////////////

function verticalReverse(src) {
    const ctx = src.getContext("2d")
    const clone = goodbye.cloneImage(src)
    //
    ctx.clearRect(0, 0, src.width, src.height)
    ctx.save()
    ctx.translate(0, src.height)
    ctx.scale(1, -1)
    ctx.drawImage(clone, 0, 0)
    ctx.restore()
}

