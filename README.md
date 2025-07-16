# Web Development Project 5 - *CryptoDash*

Submitted by: **Mohamed Semah Khlifi**

This web app: **A comprehensive cryptocurrency data dashboard that provides real-time market analysis with advanced filtering capabilities. Users can explore 50+ cryptocurrencies with live prices, market data, and performance metrics through an intuitive sidebar-based interface.**

Time spent: **8** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
 - The dashboard displays 50+ unique cryptocurrencies in a compact table format
 - Each row includes 6+ features: rank, coin info, price, 24h change, market cap, and volume
- [x] **`useEffect` React hook and `async`/`await` are used**
 - Visible loading screen demonstrates useEffect triggering and async/await API calls
 - Progress bar and step-by-step status messages show the async process
- [x] **The app dashboard includes at least three summary statistics about the data** 
 - **Total Cryptocurrencies**: Count of all fetched coins
 - **Average Price**: Mean price across all cryptocurrencies  
 - **Total Market Cap**: Sum of all market capitalizations
 - **Positive Gainers**: Number of coins with positive 24h performance
- [x] **A search bar allows the user to search for an item in the fetched data**
 - Search filters by cryptocurrency name or symbol in real-time
 - Results update dynamically as user types
 - Case-insensitive matching with instant visual feedback
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
 - Price range dropdown filter (Under $1, $1-$100, $100-$1000, Over $1000)
 - Filters by different attribute than search (price vs name/symbol)
 - Dynamic updates with real-time filtering

The following **optional** features are implemented:

- [x] **Multiple filters can be applied simultaneously**
 - All filters work together: search + price + market cap + performance + volume
 - Real-time filtering with instant results updates
- [x] **Filters use different input types**
 - **Text Input**: Search bar and custom price range bounds
 - **Dropdown**: Quick price range selection
 - **Radio Buttons**: Market cap categories and 24h performance filters
 - **Range Slider**: Trading volume range selector
- [x] **The user can enter specific bounds for filter values**
 - Custom price range with min/max number inputs
 - Volume range slider with percentage-based bounds
 - Market cap categories with specific dollar thresholds

The following **additional** features are implemented:

* [x] **Modern sidebar-based layout** with dedicated filter controls and main content area
* [x] **Compact table design** optimized for maximum information density (15-20 visible rows)
* [x] **Cosmic dark theme** with gradient backgrounds and glassmorphism effects
* [x] **Interactive statistics cards** with hover animations and gradient designs
* [x] **Visual loading demonstration** showing useEffect and async/await process
* [x] **Color-coded performance indicators** with trend icons for price changes
* [x] **Responsive design** that adapts to different screen sizes
* [x] **One-click filter clearing** and demo reload functionality
* [x] **Real-time filter status** showing which filters are currently active

## Video Walkthrough

Here's a walkthrough of implemented user stories:

https://imgur.com/a/GFf18NI

GIF created with ...  ScreenToGif


## Notes

**Challenges encountered while building the app:**

- **API Integration**: Initially faced CORS issues with some cryptocurrency APIs, resolved by using CoinGecko's free public API
- **Complex Filtering Logic**: Implementing simultaneous filters required careful state management to ensure all filters work together properly
- **JSX Syntax Errors**: Encountered unterminated JSX elements during layout restructuring, resolved through complete component rewrite
- **Information Density**: Balancing readability with maximum data visibility in the compact table design
- **Responsive Design**: Ensuring the sidebar layout works well across different screen sizes while maintaining functionality
- **Performance Optimization**: Managing multiple state updates and re-renders when filters change simultaneously

**Technical Implementations:**
- Used CoinGecko API for real-time cryptocurrency data without requiring API keys
- Implemented custom filtering logic that handles multiple simultaneous filter combinations
- Created reusable styling patterns for consistent glassmorphism effects throughout the app
- Optimized component structure for better maintainability and debugging

## License

   Copyright [2025] [Mohamed Semah Khlifi]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.