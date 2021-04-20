function WorldMap(){
    this.x = x; //map X value
    this.y = y; //map Y value
    this.imageSource = imageSource; //string
}
//each map square will contain a biome name, an amount of resources, maybe random event?
function MapSquare(){
    this.biome = biome; //String
    this.stickRange = stickRange; //integer [0, i]
    this.logRange = logRange; //integer [0, j]
    this.riskReward = this.riskReward; //String
    
}

function ()