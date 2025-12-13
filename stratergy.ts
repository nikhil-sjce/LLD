// Strategy Interface
interface PaymentStrategy {
  pay(amount: number): void;
}

// Concrete Strategies
class CreditCardPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Credit Card`);
  }
}

class PayPalPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal`);
  }
}

class BitcoinPayment implements PaymentStrategy {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Bitcoin`);
  }
}

// Context
class PaymentProcessor {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  pay(amount: number) {
    this.strategy.pay(amount);
  }
}

// Client code
const processor = new PaymentProcessor(new CreditCardPayment());
processor.pay(100); // Paid 100 using Credit Card

processor.setStrategy(new PayPalPayment());
processor.pay(200); // Paid 200 using PayPal

processor.setStrategy(new BitcoinPayment());
processor.pay(500); // Paid 500 using Bitcoin
