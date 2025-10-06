# Testing Guide

This document describes how to test the research paper website template to ensure all functionality works correctly.

## Test Files

- `test.js` - Core test suite with JavaScript tests for website functionality
- `test.html` - Interactive test runner that can be opened in a browser
- `run-tests.js` - Command-line test runner for automated testing
- `TESTING.md` - This documentation file

## Running Tests

### 1. Interactive Browser Testing (Recommended)

Open `test.html` in your web browser:

```bash
# If you have a local server running:
# Visit: http://localhost:8080/test.html

# Or open directly in browser:
open test.html  # macOS
start test.html # Windows
xdg-open test.html # Linux
```

Features:
- ▶️ **Run Tests in Iframe** - Runs automated tests within the page
- 🚀 **Run Tests in New Tab** - Opens website in new tab with tests in console
- Visual test output with pass/fail indicators
- Links to view the website and test code

### 2. Command-Line Testing

Basic validation (no dependencies required):
```bash
node run-tests.js
```

With browser automation (requires Puppeteer):
```bash
node run-tests.js --puppeteer
```

### 3. Manual Testing Checklist

Test these interactive features manually:

- [ ] **Dark Mode Toggle** - Click "Toggle Dark Mode" button
- [ ] **Navigation Links** - Click Abstract, Introduction, etc. in nav bar
- [ ] **Image Carousel** - Use ← → buttons to navigate images
- [ ] **Video Carousel** - Use ← → buttons to navigate videos
- [ ] **Copy to Clipboard** - Click "Copy to Clipboard" in BibTeX section
- [ ] **Scroll to Top** - Scroll down to see ⬆ button, then click it
- [ ] **Responsive Design** - Resize browser window
- [ ] **All Sections Present** - Verify all content sections load

## Test Coverage

### Automated Tests

1. **Section Presence** - Verifies all required sections exist (Abstract, Introduction, etc.)
2. **Navigation Functionality** - Checks nav links have valid anchors
3. **Dark Mode Toggle** - Tests toggle button functionality
4. **Carousel Elements** - Verifies image and video carousels are present
5. **Copy to Clipboard** - Checks button and function exist
6. **Content Structure** - Validates essential HTML structure
7. **Asset Loading** - Confirms CSS and JS files are included

### File Validation Tests (Command-line)

1. **Required Files** - Checks index.html, style.css, script.js exist
2. **HTML Structure** - Validates essential HTML elements and IDs
3. **JavaScript Functions** - Confirms required functions are defined

## Test Results

### Expected Output (All Tests Passing)

```
🧪 Starting website functionality tests...

✅ PASS: All required sections are present
✅ PASS: Navigation links are functional
✅ PASS: Dark mode toggle is functional
✅ PASS: Image and video carousels are present
✅ PASS: Copy to clipboard button is functional
✅ PASS: Essential content structure is valid
✅ PASS: Required assets are loaded

📊 Test Results: 7 passed, 0 failed
```

## Troubleshooting

### Common Issues

1. **Tests don't run in iframe** - Try "Run Tests in New Tab" instead
2. **Cross-origin restrictions** - Use a local web server (e.g., `python3 -m http.server`)
3. **JavaScript errors** - Check browser console for detailed error messages
4. **Missing Puppeteer** - Install with `npm install puppeteer` for automated browser testing

### Debug Mode

To see detailed test output, check browser console when running tests.

## Adding New Tests

To add new tests, modify `test.js`:

```javascript
// Add new test
testSuite.test('My new test description', () => {
    // Test code here
    testSuite.assert(condition, 'Error message if condition fails');
});
```

## Browser Compatibility

Tests verified to work in:
- ✅ Chrome/Chromium
- ✅ Firefox  
- ✅ Safari
- ✅ Edge

The website template should work in all modern browsers that support ES6+ JavaScript.