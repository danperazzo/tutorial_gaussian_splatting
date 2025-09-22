/**
 * Simple test suite for research paper website template
 * Tests core functionality and interactive elements
 */

class SimpleTest {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(description, testFn) {
        this.tests.push({ description, testFn });
    }

    async run() {
        console.log('🧪 Starting website functionality tests...\n');
        
        for (let test of this.tests) {
            try {
                await test.testFn();
                console.log(`✅ PASS: ${test.description}`);
                this.passed++;
            } catch (error) {
                console.log(`❌ FAIL: ${test.description}`);
                console.log(`   Error: ${error.message}`);
                this.failed++;
            }
        }

        console.log(`\n📊 Test Results: ${this.passed} passed, ${this.failed} failed`);
        return this.failed === 0;
    }

    assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    }

    assertEqual(actual, expected, message) {
        if (actual !== expected) {
            throw new Error(`${message}. Expected: ${expected}, Got: ${actual}`);
        }
    }
}

// Initialize test suite
const testSuite = new SimpleTest();

// Test 1: Check if all required sections exist
testSuite.test('All required sections are present', () => {
    const requiredSections = ['abstract', 'introduction', 'methodology', 'results', 'conclusion', 'bibtex', 'acknowledgement'];
    
    requiredSections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        testSuite.assert(section !== null, `Section "${sectionId}" should exist`);
    });
});

// Test 2: Navigation links work
testSuite.test('Navigation links are functional', () => {
    const navLinks = document.querySelectorAll('.nav a');
    testSuite.assert(navLinks.length > 0, 'Navigation links should exist');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        testSuite.assert(href && href.startsWith('#'), `Navigation link should have valid anchor: ${href}`);
    });
});

// Test 3: Dark mode toggle exists and is functional
testSuite.test('Dark mode toggle is functional', () => {
    const toggleBtn = document.querySelector('.toggle-btn');
    testSuite.assert(toggleBtn !== null, 'Dark mode toggle button should exist');
    
    const initialClass = document.body.classList.contains('dark-mode');
    
    // Simulate click
    toggleBtn.click();
    
    const afterClickClass = document.body.classList.contains('dark-mode');
    testSuite.assert(initialClass !== afterClickClass, 'Dark mode should toggle when button is clicked');
});

// Test 4: Carousel elements exist
testSuite.test('Image and video carousels are present', () => {
    const imageCarousel = document.getElementById('imageCarousel');
    const videoCarousel = document.getElementById('videoCarousel');
    
    testSuite.assert(imageCarousel !== null, 'Image carousel should exist');
    testSuite.assert(videoCarousel !== null, 'Video carousel should exist');
});

// Test 5: Copy to clipboard functionality
testSuite.test('Copy to clipboard button is functional', () => {
    const copyBtn = document.querySelector('button[onclick*="copyBibTeX"]');
    testSuite.assert(copyBtn !== null, 'Copy to clipboard button should exist');
    
    // Check if the function exists
    testSuite.assert(typeof window.copyBibTeX === 'function', 'copyBibTeX function should be defined');
});

// Test 6: Essential content structure
testSuite.test('Essential content structure is valid', () => {
    const title = document.querySelector('h1');
    testSuite.assert(title !== null, 'Main title should exist');
    
    const authors = document.querySelector('.authors');
    testSuite.assert(authors !== null, 'Authors section should exist');
    
    const buttons = document.querySelector('.buttons');
    testSuite.assert(buttons !== null, 'Action buttons section should exist');
});

// Test 7: Script and style files are loaded
testSuite.test('Required assets are loaded', () => {
    const scriptTag = document.querySelector('script[src="script.js"]');
    const styleTag = document.querySelector('link[href="style.css"]');
    
    testSuite.assert(scriptTag !== null, 'script.js should be included');
    testSuite.assert(styleTag !== null, 'style.css should be included');
});

// Auto-run tests when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => testSuite.run());
} else {
    testSuite.run();
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SimpleTest, testSuite };
}