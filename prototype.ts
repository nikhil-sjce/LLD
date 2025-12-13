interface Shape{
    clone(): Shape;
    getDetails(): void;
}

class ICircle implements Shape{
    constructor(public radius: string){};
    clone() : ICircle{
        return new ICircle(this.radius);
    }
    getDetails(): void{
        console.log(`Circle with radius: ${this.radius}`);
    }
}

const circleObject1 = new ICircle("5");
const circleObject2 = circleObject1.clone();

circleObject1.getDetails();
circleObject2.getDetails();
