# ShoppingList Component Structure

This directory contains all components related to the shopping list functionality, organized in a modular structure for better maintainability.

## Directory Structure

```
ShoppingList/
├── index.js                    # Main exports file
├── ShoppingListScreen.js       # Main container component
├── ShoppingListScreen.scss     # Main styles
├── Header/
│   ├── index.js               # Header exports
│   └── ShoppingHeader.js      # Header component
├── Products/
│   ├── index.js               # Products exports
│   ├── CategoriesBar.js       # Category filter buttons
│   ├── ProductCard.js         # Individual product display
│   └── ProductsSection.js     # Products container
├── Cart/
│   ├── index.js               # Cart exports
│   ├── CartItem.js            # Individual cart item
│   ├── EmptyCart.js           # Empty cart state
│   ├── CartFooter.js          # Cart total and checkout
│   └── CartSection.js         # Cart container
└── States/
    ├── index.js               # States exports
    ├── LoadingState.js        # Loading component
    └── ErrorState.js          # Error component
```

## Component Responsibilities

### Header Components
- **ShoppingHeader**: Displays title and cart summary

### Products Components
- **CategoriesBar**: Category filter navigation
- **ProductCard**: Individual product display with add to cart
- **ProductsSection**: Container managing products display and filtering

### Cart Components
- **CartItem**: Individual cart item with quantity controls
- **EmptyCart**: Empty state message
- **CartFooter**: Total price and checkout button
- **CartSection**: Container managing entire cart functionality

### State Components
- **LoadingState**: Loading spinner/message
- **ErrorState**: Error message display

## Import Usage

```javascript
// Import main component
import { ShoppingListScreen } from './components/ShoppingList';

// Import specific sub-components
import { ShoppingHeader } from './components/ShoppingList/Header';
import { ProductCard, CategoriesBar } from './components/ShoppingList/Products';
import { CartItem, CartSection } from './components/ShoppingList/Cart';
import { LoadingState, ErrorState } from './components/ShoppingList/States';

// Import all components
import * as ShoppingComponents from './components/ShoppingList';
```

## Benefits of This Structure

1. **Logical Grouping**: Related components are grouped together
2. **Easy Navigation**: Clear directory structure
3. **Scalability**: Easy to add new components to appropriate sections  
4. **Reusability**: Components can be imported individually
5. **Maintainability**: Changes to specific functionality are isolated
6. **Testing**: Each component can be tested independently
7. **Code Review**: Smaller, focused files are easier to review
