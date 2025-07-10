# 🧭 Compass - Environmental Compliance Dashboard

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.5.0-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Compass** is an AI-powered environmental compliance intelligence platform designed specifically for mining and PSU companies in India. It transforms complex regulatory requirements (EC, FC, CTE, CTO) into intuitive, actionable insights through interactive dashboards and real-time monitoring.
 
## 🎯 Project Vision

This project is part of a three-module compliance ecosystem:
- **🧭 Compass** (Current) - Strategic oversight and executive dashboards
- **🛡️ Asgard** (Planned) - Operational excellence and field management  
- **🤖 Juris** (Planned) - AI-powered legal assistance and document analysis

## 🏭 Target Audience

**Primary Users:**
- Mining PSUs (SAIL, Coal India, NMDC, SCCL)
- Corporate executives and compliance officers
- Environmental consultants and regulatory teams
- Site managers and field engineers

**Regulatory Focus:**
- Environmental Clearance (EC) - MoEF&CC compliance
- Forest Clearance (FC) - Compensatory afforestation tracking
- Consent to Establish (CTE) - State pollution control boards
- Consent to Operate (CTO) - Operational permits and renewals

##  Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd compass-dashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production
```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Architecture

### Core File Structure
```
compass-dashboard/
├── 📄 Configuration Files
│   ├── package.json          # Dependencies and scripts
│   ├── vite.config.ts        # Vite build configuration
│   └── index.html            # HTML entry point with enhanced CSS
│
├── 🎯 Source Code
│   ├── src/
│   │   ├── main.tsx          # React application entry point
│   │   ├── App.tsx           # Main application component
│   │   │
│   │   ├── 📊 Data Layer
│   │   │   └── mockData.ts   # SAIL mine data structures
│   │   │
│   │   └── 🧩 Components
│   │       ├── FilterPanel.tsx         # Smart filtering system
│   │       ├── ComplianceChart.tsx     # Interactive compliance visualization
│   │       ├── DepartmentalMatrix.tsx  # Team collaboration insights
│   │       ├── RiskHeatMap.tsx         # Risk assessment visualization
│   │       └── DocumentTimeline.tsx    # Compliance document tracking
```

---

## 📋 Detailed File Documentation

### 🔧 Configuration Files

#### `package.json`
**Purpose:** Project dependencies and build scripts
```json
{
  "dependencies": {
    "react": "^18.2.0",           // Core React framework
    "react-dom": "^18.2.0",       // DOM rendering
    "lucide-react": "^0.294.0"    // Icon library (500+ icons)
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.1.0",  // React integration for Vite
    "typescript": "^5.2.2",            // Type safety and IntelliSense
    "vite": "^4.5.0"                   // Lightning-fast build tool
  }
}
```

**Key Scripts:**
- `npm run dev` - Development server with hot reload
- `npm run build` - Production build with optimization
- `npm run preview` - Preview production build locally

#### `vite.config.ts`
**Purpose:** Build tool configuration for optimal development experience
```typescript
export default defineConfig({
  plugins: [react()],    // Enable React support
  server: {
    port: 3000,          // Development server port
    open: true           // Auto-open browser
  }
})
```

#### `index.html`
**Purpose:** Application shell with enhanced styling system

**Key Features:**
- **Gradient Backgrounds:** Modern visual hierarchy with CSS gradients
- **Animation System:** Smooth hover effects and transitions
- **Responsive Grid:** Mobile-first layout system
- **Status Indicators:** Color-coded compliance states
- **Interactive Elements:** Hover effects and button animations

**CSS Classes:**
```css
.widget        // Main container with shadow and hover effects
.metric        // KPI display with centered layout
.btn-primary   // Primary action buttons with gradients
.status-*      // Compliance status indicators (excellent/good/warning/critical)
.heat-cell     // Risk assessment grid cells
.timeline-item // Document status timeline entries
```

---

### 🎯 Core Application Files

#### `src/main.tsx`
**Purpose:** React application bootstrap and mounting
```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**Responsibilities:**
- DOM mounting and React initialization
- Strict mode for development warnings
- Error boundary setup (future enhancement)

#### `src/App.tsx`
**Purpose:** Main application orchestrator and state management

**Key Features:**
```typescript
// State Management
const [filteredMines, setFilteredMines] = useState(sailMines);

// Filter Logic
const handleFilterChange = (filters: { type: string; site: string }) => {
  // Applies filtering by mine type (Iron Ore/Coal/Limestone) and location
}

// Calculated Metrics
const overallCompliance = Math.round(/* calculated from filtered mines */);
const totalIssues = /* count of non-active document statuses */;
```

**Component Composition:**
1. **Enhanced Header** - Executive summary with real-time metrics
2. **Filter Panel** - Interactive filtering controls
3. **KPI Metrics Grid** - Four key performance indicators
4. **Dashboard Widgets** - Chart, heat map, matrix, timeline
5. **Mine Portfolio** - Individual mine performance cards
6. **Action Center** - Quick access to common tasks

---

### 📊 Data Layer

#### `src/data/mockData.ts`
**Purpose:** Realistic SAIL mine data structure and type definitions

**Core Data Types:**
```typescript
interface Mine {
  id: string;                    // Unique identifier
  name: string;                  // Mine name (e.g., "Gua Main Mine")
  location: string;              // Geographic location
  type: 'Iron Ore' | 'Coal' | 'Limestone';  // Mining operation type
  complianceScore: number;       // Overall score (0-100)
  status: 'excellent' | 'good' | 'warning' | 'critical';
  
  documents: {
    EC: { score: number; status: string; dueDate: string; };   // Environmental Clearance
    CTE: { score: number; status: string; dueDate: string; };  // Consent to Establish
    CTO: { score: number; status: string; dueDate: string; };  // Consent to Operate
    FC: { score: number; status: string; dueDate: string; };   // Forest Clearance
  };
  
  departments: {
    environmental: number;       // Environmental team score
    safety: number;             // Safety team score
    operations: number;         // Operations team score
    legal: number;             // Legal team score
  };
}
```

**Sample Data:**
- **5 Realistic Mines** across Jharkhand, Odisha, Chhattisgarh
- **SAIL-specific locations** (Gua, Rourkela, Durg)
- **Varied compliance scenarios** (excellent to critical status)
- **Document due dates** spanning next 12 months
- **Departmental scores** showing team interdependencies

---

### 🧩 Interactive Components

#### `src/components/FilterPanel.tsx`
**Purpose:** Smart filtering system for data analysis

**Features:**
- **Mine Type Filters:** Iron Ore, Coal, Limestone
- **Location Filters:** Gua/Jharkhand, Rourkela/Odisha, Durg/Chhattisgarh
- **Interactive Chips:** Visual selection with active states
- **Clear Filters:** Reset to show all data
- **Real-time Updates:** Instant dashboard refresh

**Usage Example:**
```typescript
<FilterPanel 
  onFilterChange={(filters) => setFilteredMines(/* filtered data */)}
  mines={sailMines}
/>
```

#### `src/components/ComplianceChart.tsx`
**Purpose:** Interactive compliance score visualization

**Technical Implementation:**
- **Canvas-based Rendering:** High-performance chart drawing
- **Document Comparison:** EC, CTE, CTO, FC scores side-by-side
- **Color-coded Bars:** Visual status indication
- **Hover Interactions:** Detailed tooltips (planned)
- **Gradient Effects:** Professional visual styling

**Chart Features:**
```typescript
// Data visualization logic
const documents = ['EC', 'CTE', 'CTO', 'FC'];
const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

// Bar chart with gradients and rounded corners
ctx.createLinearGradient(/* gradient styling */);
ctx.roundRect(/* rounded bar corners */);
```

#### `src/components/DepartmentalMatrix.tsx`
**Purpose:** Team collaboration and interdependency visualization

**Business Logic:**
```typescript
// Calculate department averages across all mines
const deptAverages = departments.map(dept => {
  const total = mines.reduce((sum, mine) => sum + mine.departments[dept], 0);
  return Math.round(total / mines.length);
});

// Color coding based on performance
const getDeptColor = (score: number) => {
  if (score >= 95) return '#059669';  // Excellent
  if (score >= 85) return '#3b82f6';  // Good
  if (score >= 75) return '#f59e0b';  // Needs improvement
  return '#ef4444';                   // Critical
};
```

**Insights Provided:**
- Environmental and Legal team coordination levels
- Operations team alignment with compliance requirements
- Safety protocol implementation across departments
- Trend indicators showing monthly improvements

#### `src/components/RiskHeatMap.tsx`
**Purpose:** Visual risk assessment and attention area identification

**Risk Calculation:**
```typescript
const getRiskLevel = (score: number) => {
  if (score >= 95) return 'LOW';      // Green zone
  if (score >= 85) return 'MEDIUM';   // Blue zone
  if (score >= 75) return 'HIGH';     // Yellow zone
  return 'CRITICAL';                  // Red zone
};
```

**Interactive Features:**
- **Hover Effects:** Scale animation and detailed tooltips
- **Color Gradients:** Risk-based background colors
- **Quick Actions:** Generate risk reports
- **Legend System:** Clear risk level indicators

#### `src/components/DocumentTimeline.tsx`
**Purpose:** Compliance document status tracking and deadline management

**Timeline Logic:**
```typescript
// Calculate days until due date
const getDaysUntilDue = (dueDate: string) => {
  const due = new Date(dueDate);
  const now = new Date();
  const diffTime = due.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Sort by urgency (closest deadlines first)
const allDocuments = mines.flatMap(/* flatten and sort */)
  .sort((a, b) => a.daysUntil - b.daysUntil);
```

**Status Indicators:**
- **Active:** Green checkmark, normal timeline
- **Renewal Due:** Yellow warning, 30-90 days
- **Action Required:** Orange alert, immediate attention
- **Critical/Overdue:** Red alert, emergency action

---

## 🎨 User Experience Design

### Design Philosophy
**"Anxiety to Confidence Transformation"**
- Convert overwhelming compliance data into clear, actionable insights
- Use familiar consumer app patterns (Netflix cards, Instagram interactions)
- Provide immediate visual feedback and positive reinforcement
- Create psychological safety through clear next steps and guidance

### Visual Hierarchy
1. **Strategic Level** (Header) - Executive KPIs and overall health
2. **Tactical Level** (Widgets) - Operational insights and analysis
3. **Operational Level** (Mine Cards) - Individual site performance
4. **Action Level** (Buttons) - Immediate next steps

### Color Psychology for Compliance
```css
🟢 Green (#059669)  - Compliant, Safe, Excellent performance
🔵 Blue (#3b82f6)   - Information, Good performance, Navigation
🟡 Yellow (#f59e0b) - Warning, Attention needed, Due soon
🔴 Red (#ef4444)    - Critical, Violation, Immediate action
⚪ Gray (#6b7280)   - Neutral, Supporting information
```

### Responsive Design Strategy
- **Mobile First:** Core functionality works on smartphones
- **Progressive Enhancement:** Desktop gets advanced features
- **Touch Targets:** Minimum 44px for mobile interactions
- **Readable Typography:** Optimized for various screen sizes

---

## 🔧 Development Guidelines

### Code Organization Principles
1. **Component Separation:** Each widget is an independent, reusable component
2. **Data Flow:** Unidirectional data flow from App → Components
3. **State Management:** useState for local state, props for data passing
4. **Type Safety:** TypeScript interfaces for all data structures
5. **Performance:** Optimized rendering and minimal re-renders

### Adding New Features
```typescript
// 1. Define data structure in mockData.ts
interface NewFeature {
  id: string;
  name: string;
  // ... other properties
}

// 2. Create component in src/components/
const NewComponent: React.FC<Props> = ({ data }) => {
  return <div className="widget">{/* component JSX */}</div>;
};

// 3. Import and use in App.tsx
import NewComponent from './components/NewComponent';

function App() {
  return (
    <div className="container">
      <NewComponent data={filteredMines} />
    </div>
  );
}
```

### Performance Optimizations
- **Lazy Loading:** Components load on demand
- **Memoization:** React.memo for expensive computations
- **Virtual Scrolling:** For large data sets (future enhancement)
- **Code Splitting:** Bundle optimization for faster loading

---

## 📊 Business Impact & Analytics

### Key Performance Indicators (KPIs)
1. **Overall Compliance Score** - Portfolio-wide regulatory adherence
2. **Active Issues Count** - Real-time problem tracking
3. **Penalty-Free Days** - Financial impact measurement
4. **Excellent Sites Count** - Performance benchmarking

### Compliance Categories Tracked
- **Environmental Clearance (EC)** - Air, water, noise pollution controls
- **Forest Clearance (FC)** - Deforestation approvals and compensatory afforestation
- **Consent to Establish (CTE)** - Pre-operational pollution control approvals
- **Consent to Operate (CTO)** - Operational permit renewals and compliance

### Risk Assessment Framework
```typescript
// Risk scoring algorithm
const calculateRisk = (mine: Mine) => {
  const documentRisk = Object.values(mine.documents)
    .map(doc => doc.status === 'Active' ? 0 : 25)
    .reduce((sum, risk) => sum + risk, 0);
    
  const timeRisk = Object.values(mine.documents)
    .map(doc => getDaysUntilDue(doc.dueDate))
    .filter(days => days < 30)
    .length * 15;
    
  return Math.min(documentRisk + timeRisk, 100);
};
```

---

## 🚀 Future Roadmap

### Phase 2: Enhanced Analytics (Q2 2024)
- **Predictive Compliance:** ML models for violation prediction
- **Automated Reporting:** Scheduled PDF/Excel exports
- **Mobile App:** Native iOS/Android applications
- **API Integration:** Real-time data from government portals

### Phase 3: Asgard Integration (Q3 2024)
- **Field Operations:** Mobile task management
- **Document Management:** Digital filing and approval workflows
- **GIS Mapping:** Boundary monitoring and spatial analysis
- **Photo Documentation:** AI-powered site condition assessment

### Phase 4: Juris AI Assistant (Q4 2024)
- **Legal Q&A:** Natural language compliance queries
- **Document Analysis:** Automated regulation interpretation
- **Risk Prediction:** AI-powered violation forecasting
- **Regulatory Updates:** Real-time law change notifications

---

## 🤝 Contributing

### Development Setup
```bash
# Fork the repository
git clone <your-fork-url>
cd compass-dashboard

# Create feature branch
git checkout -b feature/new-widget

# Make changes and commit
git add .
git commit -m "feat: add new compliance widget"

# Push and create pull request
git push origin feature/new-widget
```

### Code Standards
- **TypeScript:** All new code must be type-safe
- **Component Structure:** Follow existing patterns
- **CSS Classes:** Use established design system
- **Testing:** Add tests for business logic (future requirement)
- **Documentation:** Update README for new features

### Pull Request Guidelines
1. **Clear Description:** Explain what and why
2. **Screenshots:** For UI changes
3. **Testing:** Verify on multiple browsers
4. **Performance:** No significant degradation
5. **Accessibility:** Maintain WCAG compliance

---

## 📞 Support & Contact

### Technical Issues
- **GitHub Issues:** Report bugs and feature requests
- **Development Questions:** Check existing documentation first
- **Performance Problems:** Include browser and system details

### Business Inquiries
- **Demo Requests:** Schedule product demonstrations
- **Custom Development:** Enterprise feature requirements
- **Integration Support:** API and system integration assistance

### Documentation
- **User Guide:** Detailed feature documentation (planned)
- **API Reference:** Integration documentation (planned)
- **Video Tutorials:** Step-by-step usage guides (planned)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SAIL Management:** Domain expertise and requirement validation
- **Mining Industry Experts:** Regulatory compliance insights
- **Open Source Community:** React, TypeScript, and Vite ecosystems
- **Design Inspiration:** Modern dashboard and analytics platforms

---

**Built by informalai with ❤️ for the mining industry's digital transformation journey.**

*"Transforming compliance from anxiety to confidence, one dashboard at a time."*
