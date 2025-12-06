// Elevater Design LLD 

// Type Direction : 1) UP 2) DOWN

// ElevaterSates : (I dont want any other state then defines therefore abstract class, data as well tgherefore its a class)
// 1) moveUpState 2) moveDownSyate 3) IdleState
//move fubnction to move elvator up and dowon
//contructor 

// Elevater: (Class) : 1) Id 2) Floor 3) State 4) queue(for deciding where to move)
// contructor
// addReqest function to add an elevator flooor to the queue
// setState to add elevator state
// step where to move when something is pressed inside an elevator

// ElevatorSelectionStargergy : (which elevator to choose when a button is pressed)(INterface as we can have different stratergies to do the same)

// ElevatorManager  : Class, ElevatorList, stratergy
// contructor
// addElevator
// requestEleveator : based on selection stratergy
//

// OuterPanel : pressses a button to request an elevator (manger assigns elevator based on stratergy)
// press function what happens when a elevator is pressed from outside

export enum Direction {
    UP = "UP",
    DOWN = "DOWN"
}

abstract class ElevatorState{
    constructor(protected elevator: Elevator){}
    abstract move(): void;
}

class IdleState extends ElevatorState{
    move(){

    }
}

class MovingUpState extends ElevatorState{
    move(){
        this.elevator.currentFloor++;
    }
}
class MovingDownState extends ElevatorState{
    move(){
        this.elevator.currentFloor--;
    }
}

class Elevater{

    id: string;
    currentFloor: number = 0;
    state: ElevatorState;
    queue: number[] = [];

    constructor(id:string, startFloor: number = 0){
        this.id = id;
        this.currentFloor = startFloor;
        this.state = new IdleState(this);
    }

    addRequest(floor: number){
        this.queue.push(floor);
    }

    setState(state: ElevatorState){
        this.state = state;
    }

    step(){
        if(this.queue.length === 0){
            this.setState(new IdleState(this));
            return;
        }
        const target = this.queue[0];
        if(target > this.currentFloor){
            this.setState(new MovingUpState(this));
        }else if(target < this.currentFloor){
            this.setState(new MovingDownState(this));
        }else{
            this.setState(new IdleState(this));
            return;
        }
        this.state.move();
    }

}

interface ElevatorSelectionStratergy{
    select(elevators: Elevater[], floor: number, direction: Direction): Elevater;
}

class NearestElevatorStratergy implements ElevatorSelectionStratergy{
    select(elevators: Elevater[], floor: number, direction: Direction): Elevater{
        let best = elevators[0];
        let bestDistance = Math.abs(elevators[0].currentFloor - floor);
        for(let e of elevators){
            const d = Math.abs(e.currentFloor - floor);
            if(d < bestDistance){
                bestDistance = d;
                best = e;
            }
        }
        return best;
    }
}

class ElevatorManager{
    elevators: Elevater[] = [];
    stratergy: ElevatorSelectionStratergy;

    constructor(stratergy: ElevatorSelectionStratergy){
        this.stratergy = stratergy;
    }
    addElevator(e: Elevater){
        this.elevators.push(e);
    }
    requestElevator(floor: number, direction: Direction){
        let chosenElevator = this.stratergy.select(this.elevators, floor, direction);
        chosenElevator.addRequest(floor);
    }
    step(){
        for(let e of this.elevators){
            e.step();
        }
    }
}

class OuterPanel{
    constructor(private manager: ElevatorManager, private floor: number){}
    press(direction: Direction){
        this.manager.requestElevator(this.floor, direction);
    }
}
