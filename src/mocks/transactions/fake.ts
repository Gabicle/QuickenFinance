import { faker } from "@faker-js/faker";
import type {
  Account,
  Amount,
  Transaction,
  TransactionStatus,
} from "../../features/transactions/model/transaction";
import type { User } from "../../types/User";


const DEFAULT_CURRENCY = 'EUR'

// ---------- Currency Formatting ----------
function formatCurrency(amount: number, currency: string, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

// ---------- Categories ----------
type CatKey =
  | "groceries"
  | "dining"
  | "transportation"
  | "subscription"
  | "shopping"
  | "utilities"
  | "rent"
  | "health"
  | "entertainment"
  | "investment"
  | "salary"
  | "freelance"
  | "refund"
  | "other";

type CategoryInfo = {
  key: CatKey;
  label: string;
  type: "income" | "expense";
  samples: string[];
};

const CATEGORY_BANK: CategoryInfo[] = [
  { key: "groceries", label: "Food", type: "expense", samples: ["Grocery Store", "Supermarket", "Local Market", "Corner Shop"] },
  { key: "dining", label: "Dining", type: "expense", samples: ["Cafe", "Restaurant", "Takeaway", "Food Truck"] },
  { key: "transportation", label: "Transportation", type: "expense", samples: ["Metro", "Bus Fare", "Taxi", "Rideshare"] },
  { key: "subscription", label: "Subscription", type: "expense", samples: ["Streaming Service", "Music Service", "News Subscription", "Cloud Storage"] },
  { key: "shopping", label: "Shopping", type: "expense", samples: ["Online Store", "Clothing Store", "Electronics Shop", "Bookstore"] },
  { key: "utilities", label: "Utilities", type: "expense", samples: ["Electric Bill", "Water Bill", "Gas Bill", "Internet Bill"] },
  { key: "rent", label: "Rent", type: "expense", samples: ["Landlord Payment", "Rent"] },
  { key: "health", label: "Health", type: "expense", samples: ["Pharmacy", "Clinic", "Dental"] },
  { key: "entertainment", label: "Entertainment", type: "expense", samples: ["Cinema", "Concert", "Game Store"] },
  { key: "investment", label: "Investment", type: "expense", samples: ["ETF Purchase", "Stock Buy", "Crypto Buy"] },
  { key: "salary", label: "Income", type: "income", samples: ["Salary", "Payroll"] },
  { key: "freelance", label: "Income", type: "income", samples: ["Invoice Payment", "Freelance Work", "Payout"] },
  { key: "refund", label: "Income", type: "income", samples: ["Refund", "Chargeback"] },
  { key: "other", label: "Other", type: faker.datatype.boolean() ? "expense" : "income", samples: ["Miscellaneous"] },
];

function pickCategory(forceType?: "income" | "expense"): CategoryInfo {
  const pool = forceType ? CATEGORY_BANK.filter((c) => c.type === forceType) : CATEGORY_BANK;
  return faker.helpers.arrayElement(pool);
}

// ---------- Status ----------
const statuses: TransactionStatus[] = ["pending", "completed", "failed"];

export function makeTransactionStatus(): TransactionStatus {
  return faker.helpers.arrayElement(statuses);
}

// ---------- Account ----------
export function makeAccount(overrides?: Partial<Account> & { balance?: number; currency?: string }): Account {
  const currency = overrides?.currency ?? DEFAULT_CURRENCY;
  return {
    id: faker.string.uuid(),
    name: faker.finance.accountName(),
    currency,
    balance: overrides?.balance ?? faker.number.float({ min: 500, max: 10000, multipleOf: 0.01 }),
    ...(overrides ?? {}),
  } as Account;
}

// ---------- Amount ----------
export function makeAmountForAccount(account: Account, min = 1, max = 5000, decimals = 2): Amount {
  const raw = faker.number.float({ min, max, multipleOf: Number((1).toFixed(decimals)) });
  return {
    amount: parseFloat(raw.toFixed(decimals)),
    currency: account.currency,
  };
}

// ---------- User ----------
export function makeUser(): User {
  return {
    id: faker.number.int({ min: 1000, max: 999999 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    type: "Basic Account",
    imgUrl: faker.image.avatar(),
  };
}

// ---------- Transaction ----------
export function makeTransaction(accounts: Account[]): Transaction {
  const account = faker.helpers.arrayElement(accounts);
  const forceType: "income" | "expense" = faker.helpers.weightedArrayElement([
    { value: "expense", weight: 7 },
    { value: "income", weight: 3 },
  ]);

  const category = pickCategory(forceType);
  const description = faker.helpers.arrayElement(category.samples);
  const amount = makeAmountForAccount(account, forceType === "expense" ? 1 : 10, forceType === "expense" ? 300 : 5000);

const statusBias = forceType === "expense"
  ? ["completed", "completed", "completed", "pending", "failed"] 
  : ["completed", "completed", "pending"]; 
  const status = faker.helpers.arrayElement(statusBias) as TransactionStatus;

  const tx: Transaction = {
    id: faker.string.uuid(),
    description,
     date: faker.date.between({
     from: new Date(new Date().getFullYear(), 0, 1),
     to: new Date(), 
    }).toISOString(),
    account,
    type: forceType,
    status,
    amount,
    category: category.label,
    displayAmount: (forceType === "expense" ? "-" : "+") + formatCurrency(amount.amount, amount.currency),
  } as Transaction;

  if (status === "completed") {
    account.balance += forceType === "income" ? amount.amount : -amount.amount;
  }

  return tx;
}



// ---------- Batch Helpers ----------
export function makeAccounts(n = 3): Account[] {
  return Array.from({ length: n }, () => makeAccount());
}
export function makeTransactions(accounts: Account[], n = 120): Transaction[] {
  return Array.from({ length: n }, () => makeTransaction(accounts));
}
