export class gameState{
    constructor(animState, player, environment, mouse) {
        this.animState = animState;            
        this.player = player;
        this.environment = environment;
        this.mouse = mouse;
    }
    // returnNewState(x, y, z) {
    //     var newState = new gameState(x, y, z)
    //     return newState;
    // }
    
}