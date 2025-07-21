# Online Supermarket Shopping App

A React-based shopping application built for an online supermarket platform. This project provides a complete grocery shopping experience with Hebrew RTL support and Redux Toolkit state management.

## Features

- **Redux Toolkit State Management**: Efficient state management with `cartItems`, categories, and products
- **Hebrew RTL Support**: Full right-to-left text direction with Hebrew localization (רשימת קניות)
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Three-Screen Flow**: Shopping → Order Summary → Success confirmation
- **Mock API Integration**: Ready for backend integration with .NET and Node.js services

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Redux Toolkit**: State management with createSlice and createAsyncThunk
- **React Redux**: Official React bindings for Redux
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Hebrew Support**: RTL layout and Hebrew text throughout

## Application Flow

### Screen 1: Shopping List (רשימת קניות)
- **Category Selection**: Choose from Hebrew categories (פירות וירקות, חלב וביצים, etc.)
- **Product Selection**: Filter products by selected category
- **Add to Cart**: Add products with specified quantities
- **Cart Management**: View, modify quantities, remove items
- **Real-time Total**: Automatic price calculation

### Screen 2: Order Summary (סיכום ההזמנה)
- **Order Review**: Display all selected items with quantities and prices
- **Customer Form**: Required fields (שם פרטי, שם משפחה, כתובת, מייל)
- **Form Validation**: Hebrew error messages for required fields
- **Order Submission**: Submit order and clear cart

### Screen 3: Success Screen
- **Order Confirmation**: Success message with order ID
- **Return Navigation**: Start new shopping session

## Redux State Structure

```javascript
const initialState = {
  cartItems: [],           // Shopping cart items with quantities
  categories: [],          // Product categories from API
  products: [],           // Available products from API
  loading: false,         // Data loading state
  submitLoading: false,   // Order submission state
  error: null,           // Error messages
  lastOrderId: null      // Last successful order ID
};