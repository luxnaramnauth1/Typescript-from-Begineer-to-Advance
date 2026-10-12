// 06 - INTERMEDIATE: Classes, access modifiers, interfaces, and inheritance

interface Logger {
  log(message: string): void;
}

class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`[LOG] ${message}`);
  }
}

abstract class Account {
  private balance: number;          // only this class can access it
  protected readonly owner: string; // this class and subclasses can read it
  static bankName = "TS Bank";      // belongs to the class, not instances

  constructor(owner: string, initialBalance = 0) {
    this.owner = owner;
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error("Deposit must be positive");
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }

  abstract describe(): string; // subclasses must implement this
}

class SavingsAccount extends Account {
  constructor(
    owner: string,
    initialBalance: number,
    private readonly rate: number, // parameter property: declares and assigns
  ) {
    super(owner, initialBalance);
  }

  addInterest(): void {
    this.deposit(this.getBalance() * this.rate);
  }

  describe(): string {
    return `Savings for ${this.owner} at ${this.rate * 100}%`;
  }
}

// Getters and setters with validation
class Temperature {
  private _celsius = 0;

  get celsius(): number {
    return this._celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) throw new RangeError("Below absolute zero");
    this._celsius = value;
  }

  get fahrenheit(): number {
    return (this._celsius * 9) / 5 + 32;
  }
}

const account = new SavingsAccount("Ada", 1000, 0.05);
account.deposit(500);
account.addInterest();
console.log(account.getBalance(), account.describe(), Account.bankName);
// account.balance; // Error: 'balance' is private

const temp = new Temperature();
temp.celsius = 25;
console.log(temp.fahrenheit); // 77

const logger: Logger = new ConsoleLogger();
logger.log("Classes done");

export {};
