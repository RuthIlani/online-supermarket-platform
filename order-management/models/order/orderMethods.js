
const getSummary = function() {
  return {
    orderId: this.orderId,
    customerName: this.customer.fullName,
    customerEmail: this.customer.email,
    totalItems: this.orderSummary.totalItems,
    totalAmount: this.orderSummary.totalAmount,
    orderDate: this.orderDate,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

// Function to apply all instance methods to schema
const applyInstanceMethods = (schema) => {
  // Core methods
  schema.methods.getSummary = getSummary;
};

module.exports = {
  getSummary,
  applyInstanceMethods
};