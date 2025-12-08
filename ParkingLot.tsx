// =============================================
// ENUMS
// =============================================
enum VehicleType {
  CAR = "CAR",
  BIKE = "BIKE",
  TRUCK = "TRUCK",
}

// =============================================
// VEHICLES
// =============================================
class Vehicle {
  constructor(
    public number: string,
    public type: VehicleType
  ) {}
}

class Car extends Vehicle {
  constructor(number: string) {
    super(number, VehicleType.CAR);
  }
}

class Bike extends Vehicle {
  constructor(number: string) {
    super(number, VehicleType.BIKE);
  }
}

class Truck extends Vehicle {
  constructor(number: string) {
    super(number, VehicleType.TRUCK);
  }
}

// =============================================
// VEHICLE FACTORY
// =============================================
class VehicleFactory {
  static create(number: string, type: VehicleType): Vehicle {
    switch (type) {
      case VehicleType.CAR: return new Car(number);
      case VehicleType.BIKE: return new Bike(number);
      case VehicleType.TRUCK: return new Truck(number);
      default: throw new Error("Invalid vehicle type");
    }
  }
}

// =============================================
// PARKING SPOT
// =============================================
class ParkingSpot {
  constructor(
    public id: string,
    public allowed: VehicleType,
    public isFree: boolean = true
  ) {}

  parkVehicle(): boolean {
    if (!this.isFree) return false;
    this.isFree = false;
    return true;
  }

  removeVehicle(): void {
    this.isFree = true;
  }
}

// =============================================
// PARKING FLOOR
// =============================================
class ParkingFloor {
  constructor(
    public id: string,
    public spots: ParkingSpot[]
  ) {}

  findFreeSpot(type: VehicleType): ParkingSpot | null {
    return this.spots.find(s => s.isFree && s.allowed === type) || null;
  }
}

// =============================================
// TICKET
// =============================================
class Ticket {
  constructor(
    public ticketId: string,
    public vehicle: Vehicle,
    public entryTime: Date,
    public spot: ParkingSpot
  ) {}
}

// =============================================
// PRICING STRATEGY (Strategy Pattern)
// =============================================
interface PricingStrategy {
  calculateCost(entryTime: Date, exitTime: Date): number;
}

class EventBasedPricing implements PricingStrategy {
  calculateCost(entryTime: Date, exitTime: Date): number {
    return 50; // Flat event price
  }
}

class TimeBasedPricing implements PricingStrategy {
  calculateCost(entryTime: Date, exitTime: Date): number {
    const diffHours =
      Math.ceil((exitTime.getTime() - entryTime.getTime()) / (1000 * 60 * 60));

    return diffHours * 20; // ex: 20 rupees per hour
  }
}

// =============================================
// PAYMENT STRATEGY (Strategy Pattern)
// =============================================
interface PaymentStrategy {
  pay(invoiceId: string, amount: number): boolean;
}

class CardPayment implements PaymentStrategy {
  pay(id: string, amount: number): boolean {
    console.log(`Paid ₹${amount} using Card.`);
    return true;
  }
}

class CashPayment implements PaymentStrategy {
  pay(id: string, amount: number): boolean {
    console.log(`Paid ₹${amount} in Cash.`);
    return true;
  }
}

// =============================================
// PAYMENT PROCESSOR
// =============================================
class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  process(ticketId: string, amount: number): boolean {
    return this.strategy.pay(ticketId, amount);
  }
}

// =============================================
// GATES (Entry & Exit)
// =============================================
class Gate {
  constructor(public id: string) {}
}

class EntryGate extends Gate {
  getTicket(vehicle: Vehicle, floor: ParkingFloor): Ticket | null {
    const spot = floor.findFreeSpot(vehicle.type);
    if (!spot) {
      console.log("No free spots available");
      return null;
    }

    spot.parkVehicle();

    return new Ticket(
      Date.now().toString(),
      vehicle,
      new Date(),
      spot
    );
  }
}

class ExitGate extends Gate {
  checkout(ticket: Ticket, pricing: PricingStrategy, payment: PaymentStrategy) {
    const exitTime = new Date();
    const amount = pricing.calculateCost(ticket.entryTime, exitTime);
    ticket.spot.removeVehicle();

    const processor = new PaymentProcessor(payment);
    return processor.process(ticket.ticketId, amount);
  }
}

// =============================================
// PARKING LOT (Singleton style optional)
// =============================================
class ParkingLot {
  constructor(
    public floors: ParkingFloor[],
    public name: string
  ) {}

  findFloorWithSpot(type: VehicleType): ParkingFloor | null {
    for (const floor of this.floors) {
      if (floor.findFreeSpot(type)) return floor;
    }
    return null;
  }
}

// =============================================
// CLIENT
// =============================================
class Client {
  constructor(
    public vehicleNumber: string,
    public vehicleType: VehicleType
  ) {}

  enterParking(lot: ParkingLot, gate: EntryGate): Ticket | null {
    const vehicle = VehicleFactory.create(this.vehicleNumber, this.vehicleType);

    const floor = lot.findFloorWithSpot(vehicle.type);
    if (!floor) {
      console.log("Parking Full!");
      return null;
    }

    return gate.getTicket(vehicle, floor);
  }

  exitParking(ticket: Ticket, pricing: PricingStrategy, payment: PaymentStrategy, gate: ExitGate) {
    return gate.checkout(ticket, pricing, payment);
  }
}

// =============================================
// DEMO USAGE
// =============================================
const floor1 = new ParkingFloor("F1", [
  new ParkingSpot("S1", VehicleType.CAR),
  new ParkingSpot("S2", VehicleType.BIKE),
  new ParkingSpot("S3", VehicleType.CAR),
]);

const floor2 = new ParkingFloor("F2", [
  new ParkingSpot("S4", VehicleType.TRUCK),
  new ParkingSpot("S5", VehicleType.CAR),
]);

const lot = new ParkingLot([floor1, floor2], "MyMall Parking");

const entryGate = new EntryGate("E1");
const exitGate = new ExitGate("X1");

const client = new Client("KA01AB1234", VehicleType.CAR);

// ENTER
const ticket = client.enterParking(lot, entryGate)!;

// EXIT
client.exitParking(ticket, new TimeBasedPricing(), new CardPayment(), exitGate);
