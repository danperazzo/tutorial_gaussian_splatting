#!/usr/bin/env node

/**
 * Command-line test runner for the research paper website
 * Runs tests using Puppeteer for headless browser testing
 */

const fs = require('fs');
const path = require('path');

// Simple fallback for environments without Puppeteer
async function runBasicValidation() {
    console.log('🧪 Running basic file validation tests...\n');
    
    const requiredFiles = ['index.html', 'style.css', 'script.js'];
    let passed = 0;
    let failed = 0;
    
    // Test 1: Check required files exist
    for (const file of requiredFiles) {
        if (fs.existsSync(path.join(__dirname, file))) {
            console.log(`✅ PASS: ${file} exists`);
            passed++;
        } else {
            console.log(`❌ FAIL: ${file} missing`);
            failed++;
        }
    }
    
    // Test 2: Check HTML structure
    try {
        const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
        
        const requiredSections = ['abstract', 'introduction', 'methodology', 'results', 'conclusion', 'bibtex'];
        for (const section of requiredSections) {
            if (htmlContent.includes(`id="${section}"`)) {
                console.log(`✅ PASS: HTML contains ${section} section`);
                passed++;
            } else {
                console.log(`❌ FAIL: HTML missing ${section} section`);
                failed++;
            }
        }
        
        // Check for essential elements
        const essentialElements = [
            '<title>',
            'class="nav"',
            'class="toggle-btn"',
            'onclick="toggleDarkMode()"',
            'onclick="copyBibTeX()"'
        ];
        
        for (const element of essentialElements) {
            if (htmlContent.includes(element)) {
                console.log(`✅ PASS: HTML contains essential element: ${element}`);
                passed++;
            } else {
                console.log(`❌ FAIL: HTML missing essential element: ${element}`);
                failed++;
            }
        }
        
    } catch (error) {
        console.log(`❌ FAIL: Error reading index.html: ${error.message}`);
        failed++;
    }
    
    // Test 3: Check JavaScript functions exist
    try {
        const jsContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
        
        const requiredFunctions = ['toggleDarkMode', 'copyBibTeX', 'scrollToTop'];
        for (const func of requiredFunctions) {
            if (jsContent.includes(`function ${func}`) || jsContent.includes(`${func} =`)) {
                console.log(`✅ PASS: JavaScript contains ${func} function`);
                passed++;
            } else {
                console.log(`❌ FAIL: JavaScript missing ${func} function`);
                failed++;
            }
        }
        
    } catch (error) {
        console.log(`❌ FAIL: Error reading script.js: ${error.message}`);
        failed++;
    }
    
    console.log(`\n📊 Basic Validation Results: ${passed} passed, ${failed} failed`);
    return failed === 0;
}

async function runWithPuppeteer() {
    try {
        const puppeteer = require('puppeteer');
        console.log('🚀 Running tests with Puppeteer...\n');
        
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        // Capture console logs
        const logs = [];
        page.on('console', msg => {
            logs.push(msg.text());
        });
        
        // Navigate to the website
        await page.goto(`file://${path.join(__dirname, 'index.html')}`);
        
        // Inject and run our test script
        const testScript = fs.readFileSync(path.join(__dirname, 'test.js'), 'utf8');
        await page.evaluate(testScript);
        
        // Wait for tests to complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Print all console logs
        logs.forEach(log => console.log(log));
        
        await browser.close();
        
        // Check if tests passed
        const testResults = logs.find(log => log.includes('📊 Test Results:'));
        if (testResults && testResults.includes('0 failed')) {
            console.log('\n🎉 All Puppeteer tests passed!');
            return true;
        } else {
            console.log('\n❌ Some Puppeteer tests failed!');
            return false;
        }
        
    } catch (error) {
        console.log(`⚠️  Puppeteer not available: ${error.message}`);
        console.log('Falling back to basic validation...\n');
        return await runBasicValidation();
    }
}

// Main execution
async function main() {
    console.log('🔍 Research Paper Website Test Runner\n');
    
    // Check if we should run Puppeteer tests
    const runPuppeteer = process.argv.includes('--puppeteer') || process.argv.includes('--browser');
    
    let success;
    if (runPuppeteer) {
        success = await runWithPuppeteer();
    } else {
        success = await runBasicValidation();
    }
    
    if (success) {
        console.log('\n🎉 All tests passed!');
        console.log('💡 To run browser-based tests, use: node run-tests.js --puppeteer');
        console.log('🌐 Or open test.html in your browser for interactive testing');
        process.exit(0);
    } else {
        console.log('\n💥 Some tests failed!');
        process.exit(1);
    }
}

// Run only if called directly
if (require.main === module) {
    main().catch(error => {
        console.error('❌ Test runner error:', error);
        process.exit(1);
    });
}

module.exports = { runBasicValidation, runWithPuppeteer };