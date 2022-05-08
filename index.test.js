/**
 * How to test html file in the jest
 * See link:
 *  https://levelup.gitconnected.com/how-to-unit-test-html-and-vanilla-javascript-without-a-ui-framework-c4c89c9f5e56
 */
const testDom = require('@testing-library/dom');
const { fireEvent } = testDom;
const JSDOM = require('jsdom').JSDOM;
const fs = require('fs');
const glob = require('glob');
const path = require('path');

require('@testing-library/jest-dom/extend-expect');

// Load index.html file in
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

// Load all json test file into a dict
let files = {};
glob.sync('./records/*.json').forEach(function (file) {
    files[file] = fs.readFileSync(path.resolve(file));
});

let dom;
let container;

describe('index.html', () => {
    beforeEach(() => {
        // Load html file into dom and run script
        // See link:
        //  https://github.com/jsdom/jsdom#executing-scripts
        dom = new JSDOM(html, { runScripts: 'dangerously' });
        container = dom.window.document.body;
    });

    // Test all testcases
    for (let key of Object.keys(files)) {
        it('load ' + key + ' record into textarea', async () => {

            // Inject json data into script
            let scripts = dom.window.document.querySelector('script[type="application/ld+json"]');
            scripts.innerHTML = JSON.stringify(JSON.parse(files[key]), null, 4);

            // Fire load event
            fireEvent.load(dom.window);
            let textArea = container.querySelector('textarea');

            // Check if the textarea is rendered
            expect(textArea).not.toBeNull();

            // Check if the value in textarea is the same in the json file
            expect(textArea.value).toBe(JSON.stringify(JSON.parse(files[key]), null, 4));
        })
    }
})