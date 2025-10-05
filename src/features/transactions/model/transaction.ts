export type TransactionStatus = "pending"
  | "completed"
  | "failed";
export type TransactionType = "expense" | "income";

export type Account = {
  id: string;          
  name: string;        
  currency: string;    
  balance: number;   
};


export interface TimelineEntry {
  label: string;
  description?: string;
  timestamp?: string; // ISO
}

export interface PaymentDetail {
  referenceNumber: string;
  amount: number;
  fee: number;
  notes?: string;
  nextBillingDate?: string;
  autoRenewal?: boolean;
}

export type Amount = {
  amount: number;      
  currency: string;    
};


export type Transaction = {
 id: string;               
  description: string;   
  date: string;           
  account: Account;         
  type: "income" | "expense"  
  status: TransactionStatus;
  amount: Amount;           
  category: string;         
  displayAmount: string;    
}
