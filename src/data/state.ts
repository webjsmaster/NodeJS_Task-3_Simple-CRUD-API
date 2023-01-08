class State { 
    public currentState: number
    public incrementState: () => void
    constructor() { 
        this.currentState = 0; 
        this.incrementState = () => { 
            this.currentState++; 
        }; 
    } 
}

export const appState = new State(); 


