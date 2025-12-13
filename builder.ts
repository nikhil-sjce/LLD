class Pizza{
    size!: string;
    cheeze!: boolean;
    paneer!: boolean;
    bacon!: boolean;
    getDetails(): void{
        console.log(`Pizza [size=${this.size}, cheese=${this.cheeze}, pepperoni=${this.paneer}, bacon=${this.bacon}]`);
    }
}

class PizzaBuilder{
    private pizza: Pizza;
    constructor(){
        this.pizza = new Pizza();
    }
    setSize(size: string): PizzaBuilder{
        this.pizza.size = size;
        return this; // chaining
    }
    addCheeze(): PizzaBuilder{
        this.pizza.cheeze = true;
        return this;
    }
    addPaneer(): PizzaBuilder {
        this.pizza.paneer= true;
        return this;
    }
    addBacon(): PizzaBuilder {
        this.pizza.bacon = true;
        return this;
    }
    build(): Pizza{
        return this.pizza;
    }
}

const pizzaObject = new PizzaBuilder().setSize("18").addBacon().addCheeze().addPaneer().build()

console.log(pizzaObject.getDetails())
