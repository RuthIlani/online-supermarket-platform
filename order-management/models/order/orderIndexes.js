const orderIndexes = [
    // Primary unique index on orderId
    {
        fields: { orderId: 1 },
        options: {
            unique: true,
            name: 'idx_orderId_unique'
        }
    },
    {
        fields: { 'customer.email': 1 },
        options: {
            name: 'idx_customer_email'
        }
    },
    {
        fields: { orderDate: -1 },
        options: {
            name: 'idx_orderDate_desc'
        }
    },
    {
        fields: { 'customer.email': 1, orderDate: -1 },
        options: {
            name: 'idx_customer_orderDate'
        }
    },
    {
        fields: { 'orderSummary.totalAmount': 1 },
        options: {
            name: 'idx_totalAmount'
        }
    },
    {
        fields: {
            'customer.name': 'text',
            'products.productName': 'text'
        },
        options: {
            name: 'idx_text_search',
            weights: {
                'customer.name': 10,
                'products.productName': 5
            }
        }
    }
];

// Function to apply indexes to schema
const applyIndexes = (schema) => {
    console.log('📊 Applying database indexes...');

    orderIndexes.forEach((indexDef, i) => {
        try {
            schema.index(indexDef.fields, indexDef.options);
            console.log(`✅ Index ${i + 1} applied: ${indexDef.options.name}`);
        } catch (error) {
            console.error(`❌ Failed to apply index ${i + 1}:`, error.message);
        }
    });

    console.log(`✅ Applied ${orderIndexes.length} indexes to Order schema`);
};

// Function to get index information for documentation
const getIndexInfo = () => {
    return orderIndexes.map(index => ({
        name: index.options.name,
        fields: Object.keys(index.fields),
        type: index.options.unique ? 'unique' : 'standard',
        purpose: getIndexPurpose(index.options.name)
    }));
};

// Helper function to explain index purposes
const getIndexPurpose = (indexName) => {
    const purposes = {
        'idx_orderId_unique': 'Primary key for fast order lookup',
        'idx_customer_email': 'Fast customer order history queries',
        'idx_orderDate_desc': 'Recent orders first, date range queries',
        'idx_customer_orderDate': 'Customer order history with date sorting',
        'idx_totalAmount': 'Analytics queries on order values',
        'idx_text_search': 'Full-text search on customer and product names'
    };

    return purposes[indexName] || 'General purpose index';
};

module.exports = {
    orderIndexes,
    applyIndexes,
    getIndexInfo
};