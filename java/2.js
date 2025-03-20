function getUniqueTransactionTypes(transactions) {
  return [...new Set(transactions.map(t => t.transaction_type))];
}

function calculateTotalAmount(transactions) {
  return transactions.reduce((sum, t) => sum + t.transaction_amount, 0);
}

function calculateTotalAmountByDate(transactions, year, month, day) {
  return transactions.filter(t => {
      const date = new Date(t.transaction_date);
      return (!year || date.getFullYear() === year) &&
             (!month || date.getMonth() + 1 === month) &&
             (!day || date.getDate() === day);
  }).reduce((sum, t) => sum + t.transaction_amount, 0);
}

function getTransactionByType(transactions, type) {
  return transactions.filter(t => t.transaction_type === type);
}

function getTransactionsInDateRange(transactions, startDate, endDate) {
  return transactions.filter(t => {
      const date = new Date(t.transaction_date);
      return date >= new Date(startDate) && date <= new Date(endDate);
  });
}

function getTransactionsByMerchant(transactions, merchantName) {
  return transactions.filter(t => t.merchant_name === merchantName);
}

function calculateAverageTransactionAmount(transactions) {
  return transactions.length ? calculateTotalAmount(transactions) / transactions.length : 0;
}

function getTransactionsByAmountRange(transactions, minAmount, maxAmount) {
  return transactions.filter(t => t.transaction_amount >= minAmount && t.transaction_amount <= maxAmount);
}

function calculateTotalDebitAmount(transactions) {
  return calculateTotalAmount(getTransactionByType(transactions, "debit"));
}

function findMostTransactionsMonth(transactions) {
  const count = {};
  transactions.forEach(t => {
      const month = new Date(t.transaction_date).getMonth() + 1;
      count[month] = (count[month] || 0) + 1;
  });
  return Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b);
}

function findMostDebitTransactionMonth(transactions) {
  return findMostTransactionsMonth(getTransactionByType(transactions, "debit"));
}

function mostTransactionTypes(transactions) {
  const debitCount = getTransactionByType(transactions, "debit").length;
  const creditCount = getTransactionByType(transactions, "credit").length;
  return debitCount > creditCount ? "debit" : creditCount > debitCount ? "credit" : "equal";
}

function getTransactionsBeforeDate(transactions, date) {
  return transactions.filter(t => new Date(t.transaction_date) < new Date(date));
}

function findTransactionById(transactions, id) {
  return transactions.find(t => t.transaction_id === id) || null;
}

function mapTransactionDescriptions(transactions) {
  return transactions.map(t => t.transaction_description);
}

// Тестирование функций
const testTransactions = [
  { transaction_id: "1", transaction_date: "2025-02-01", transaction_amount: 500, transaction_type: "debit", transaction_description: "Groceries", merchant_name: "Store1", card_type: "Visa" },
  { transaction_id: "2", transaction_date: "2025-02-02", transaction_amount: 1500, transaction_type: "credit", transaction_description: "Salary", merchant_name: "Employer", card_type: "MasterCard" },
  { transaction_id: "3", transaction_date: "2025-03-05", transaction_amount: 200, transaction_type: "debit", transaction_description: "Coffee", merchant_name: "Cafe", card_type: "Visa" },
  // Ваш JSON-объект
  { transaction_id: "1234567890123456", transaction_date: "2025-02-03", transaction_amount: 18000.0, transaction_type: "debit", transaction_description: "Salary deposit", merchant_name: "IRMO", card_type: "MasterCard" }
];

// Проверка всех функций
console.log("Unique Transaction Types:", getUniqueTransactionTypes(testTransactions));
console.log("Total Amount:", calculateTotalAmount(testTransactions));
console.log("Total Amount by Date (2025-02-01):", calculateTotalAmountByDate(testTransactions, 2025, 2, 1));
console.log("Transactions by Type (debit):", getTransactionByType(testTransactions, "debit"));
console.log("Transactions in Date Range (Feb 2025 - Mar 2025):", getTransactionsInDateRange(testTransactions, "2025-02-01", "2025-03-31"));
console.log("Transactions by Merchant (Store1):", getTransactionsByMerchant(testTransactions, "Store1"));
console.log("Average Transaction Amount:", calculateAverageTransactionAmount(testTransactions));
console.log("Transactions by Amount Range (100-1000):", getTransactionsByAmountRange(testTransactions, 100, 1000));
console.log("Total Debit Amount:", calculateTotalDebitAmount(testTransactions));
console.log("Most Transactions Month:", findMostTransactionsMonth(testTransactions));
console.log("Most Debit Transaction Month:", findMostDebitTransactionMonth(testTransactions));
console.log("Most Transaction Types:", mostTransactionTypes(testTransactions));
console.log("Transactions Before Date (2025-02-02):", getTransactionsBeforeDate(testTransactions, "2025-02-02"));
console.log("Find Transaction by ID (1):", findTransactionById(testTransactions, "1"));
console.log("Transaction Descriptions:", mapTransactionDescriptions(testTransactions));

// Дополнительные проверки
console.log("Test with empty transactions array:", calculateTotalAmount([]));
console.log("Test with single transaction:", calculateTotalAmount([{ transaction_id: "4", transaction_date: "2025-04-01", transaction_amount: 300, transaction_type: "credit", transaction_description: "Bonus", merchant_name: "Company", card_type: "Visa" }]));
