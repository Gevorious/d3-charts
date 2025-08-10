# PieChart Component

The PieChart component has been refactored into smaller, more manageable parts for better maintainability and reusability.

## Component Structure

```
PieChart/
├── index.tsx                 # Main component (orchestrates everything)
├── types.ts                  # TypeScript type definitions
├── _constants.ts            # Chart constants (colors, etc.)
├── _hooks/
│   └── usePieChart.ts      # Custom hook for chart logic and state
├── _partials/
│   ├── index.ts            # Export all partial components
│   ├── ChartCanvas.tsx     # SVG container and layout
│   ├── PieSlices.tsx       # Renders individual pie slices
│   ├── Legend.tsx          # Legend/controls on the right
│   ├── Arc.tsx             # Individual arc/slice component
│   └── ListItem.tsx        # Legend item component
├── _utils/
│   ├── index.ts            # Export all utility functions
│   └── chartUtils.ts       # Chart calculation utilities
└── styles.scss             # Component styles
```

## Component Responsibilities

### Main Components

- **`PieChart`** (index.tsx): Main orchestrator component that uses the custom hook and renders child components
- **`usePieChart`**: Custom hook that manages all chart state, calculations, and business logic

### Partial Components

- **`ChartCanvas`**: Handles the main SVG container and provides layout structure
- **`PieSlices`**: Manages the rendering of all pie chart slices with hover effects
- **`Legend`**: Handles the legend/controls on the right side of the chart
- **`Arc`**: Individual pie slice component
- **`ListItem`**: Individual legend item component

### Utilities

- **`chartUtils`**: Contains pure functions for chart calculations:
  - `calculateRadius`: Calculates chart radius based on dimensions
  - `calculatePercentage`: Calculates percentage values
  - `calculateHoverOffset`: Calculates hover animation offsets
  - `calculateIconSize`: Calculates legend icon sizes

## Benefits of This Structure

1. **Separation of Concerns**: Each component has a single, clear responsibility
2. **Reusability**: Components can be easily reused in other chart types
3. **Testability**: Smaller components are easier to test in isolation
4. **Maintainability**: Changes to one aspect don't affect others
5. **Performance**: Better memoization opportunities with smaller components
6. **Type Safety**: Clear interfaces between components

## Usage

```tsx
import PieChart from './components/Charts/PieChart';

const data = [
  { category: 'A', value: 30 },
  { category: 'B', value: 50 },
  { category: 'C', value: 20 },
];

<PieChart
  data={data}
  keyField="category"
  valueField="value"
  width={800}
  height={600}
/>;
```
