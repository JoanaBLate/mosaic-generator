"use strict"

var goodbye = null

var box = null

///////////////////////////////////////////////////////////////////////////////

function main() {
    //
    goodbye = createGoodbyeHtmlLibrary()
    loadResources()
}

function loadResources() {
    //
    const loader = goodbye.createLoader()
    //
    loader.loadFont("sg", fontSmallGrey) 
    loader.loadFont("black", fontSourceProSansBlack) 
    loader.loadFont("white", fontSourceProSansWhite)
    //
    const keys = Object.keys(blackIconsSources)
    //
    for (const key of keys) { loader.loadImage(key, blackIconsSources[key]) }
    //
    loader.ready(resourcesLoaded) // must send a callback
}  
  
function resourcesLoaded() { // the callback 
    //
    initLogic()
    //
    mountInterface()    
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function mountInterface() {
    //
    box = goodbye.createBox(1000, 600, document.body)
    //
    box.setBgColor("#084d6e")
    //
    box.initLayers(["base", "help"])
    //
    box.get("help").hide()
    //
    createHeader()
    //
    createSourceArea()
    //
    createResultArea()
    //
    createOptionsPanel()
    //
    createHelp()
    //
}

///////////////////////////////////////////////////////////////////////////////

function createHeader() {
    //
    const i = goodbye.allImages
    //
    const ph = box.get("base").createPanel("header", 0, 0, 1000, 50, "black")
    //
    ph.paintRect(0, 0, 250, 50, "white")
    //
    ph.setFont("black")
    //
    ph.write(30, 10, "Mosaic Generator")
    //
    ph.setFont("white")
    //
    ph.write(265, 10, "demo - web app made using only one HTML element")
    //
    const bl = ph.createButton("load", 790, 0, 50, 50, "rgb(0,150,180)")
    bl.setImageNormal(i["load-black"])
    bl.setOnClick(loadSourceImage)
    //
    const bs = ph.createButton("save", 865, 0, 50, 50, "rgb(0,150,180)")
    bs.setImageNormal(i["save-black"])
    const disabled = goodbye.fadeImage(i["save-black"], "black", 0.40)
    bs.setImageDisabled(disabled)
    bs.disable()
    bs.setOnClick(save)
    //
    const bh = ph.createButton("help", 940, 0, 50, 50, "rgb(0,150,180)")
    bh.setImageNormal(i["help-black"])
    const negative = goodbye.negativeFromImage(i["help-black"])
    bh.setImageActive(negative)
    bh.setOnClick(buttonHelpClicked)
}

function buttonHelpClicked() {
    //
    const button = box.get("base.header.help")
    //
    if (button.getActive()) {
        //
        button.deactivate()
        box.get("help").hide()
    }
    else {
        //
        button.activate()
        box.resetFocus()
        box.get("help").show()
    }
}    
    
///////////////////////////////////////////////////////////////////////////////
 
function createSourceArea() {
    //
    const ps = box.get("base").createPanel("source", 20, 70, 600, 400, "red")
    //
    const chess = goodbye.createCheckerboard(600, 400, 50, 50, "silver", "gainsboro")
    //
    ps.paintImage(chess, 0, 0)
}    
    
///////////////////////////////////////////////////////////////////////////////
 
function createResultArea() {
    //
    const pr = box.get("base").createPanel("result", 670, 120, 300, 300, "red")
    //
    const chess = goodbye.createCheckerboard(800, 450, 50, 50, "silver", "gainsboro")
    //
    pr.paintImage(chess, 0, 0)
} 
    
///////////////////////////////////////////////////////////////////////////////
 
function createOptionsPanel() {
    //
    const po = box.get("base").createPanel("options", 20, 500, 960, 80, "lightgrey")
    //
    po.setFont("sg")
    //
    po.createCheckbox("stretch", 10, 10, 14, true, null)
    //
    po.write(30, 10, "stretch both dimensions when loading") 
    //
    const br = po.createButton("randomize", 90, 35, 120, 30, "white")
    br.config("sg", "randomize", randomize)
    br.disable()
    //
    po.write(418, 10, "size of resulting mosaic")
    //
    paintMosaicSize()
    //
    const ss = po.createSlider("size", 400, 30, 200, 30, 0)
    //
    ss.setOnChange(changeMosaicSize)
    ss.disable()
    //
    po.write(772, 10, "choose mosaic name")
    //
    const tn = po.createTextbox("name", 760,30,150,35,15, "black", true)
    tn.setText("my-mosaic")
}

function changeMosaicSize() {
    //
    const factor = box.get("base.options.size").getValue()
    //
    mosaicDimension = 300 + (Math.floor(1500 * factor / 300) * 300)
    //
    paintMosaicSize()
}

function paintMosaicSize() {
    //
    const panel = box.get("base.options")
    //
    panel.clearRect(390, 60, 100, 20)
    //
    panel.write(400, 63, mosaicDimension + " x " + mosaicDimension)
}
 
///////////////////////////////////////////////////////////////////////////////

function createHelp() {
    //
    const ph = box.get("help").createPanel("help", 0, 50, 1000, 550, "lightgrey")
    //
    ph.setFont("sg")
    //
    ph.write(150,  50, "This is a desktop application.")
    ph.write(150, 100, "Loading an image creates a mosaic based on its center.")
    ph.write(150, 150, "Pressing \"randomize\" creates another mosaic based on a random point of the image.")
    ph.write(150, 200, "There is only a single HTML element (a canvas) inside the document body.")
    ph.write(150, 250, "All other widgets were constructed inside this single canvas and the browser doesn't know about them:")
    ph.write(170, 280, "single icon button, stage icon button, text button, checkbox, slider and text input box.")
    ph.write(150, 330, "The code of the *interface* of this demo has less than 100 meaningful, simple lines and was written")
    ph.write(170, 360, "using the GoodbyeHTML library.")
    ph.write(150, 410, "The library is available at https://github.com/JoanaBLate/goodbye-html")  
    ph.write(150, 460, "Clicking again the help icon hides this help.")    
}

///////////////////////////////////////////////////////////////////////////////

main()

