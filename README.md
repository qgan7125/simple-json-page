# A simple webpage to render the JSON file to html page

The original JSON data would be stored in the `<script type="application/ld+json">`. The javascript would convert the content into html `<textarea>` when the window loads.

<hr/>
## Target file

[index.html](./index.html)

<hr/>

## Testcases
- [id.txt](./id.txt) file contains all record identifiers.
- [savefiles.ipynb](./savefiles.ipynb) is a jupyter file to fetch all JSON data from endpoints and stores them in the `records` folder.
To fetch data:
```
python -m venv env
source env/bin/activate
pip install requirements.txt
```
Then, run all chunks in the `savefiles.ipynb`
- [records folder](./records) contains all record JSON files.

<hr/>

## Jest to check the `index.html`

[Jest](https://jestjs.io/) is a Javascript testing framework.

```
npm install
npm run test
```

## Result
```
 PASS  ./index.test.js
  index.html
    ✓ load ./records/ark:-28722-k2t152s9s.json record into textarea (39 ms)
    ✓ load ./records/ark:-28722-k2vm49b28.json record into textarea (9 ms)
    ✓ load ./records/ark:-28722-k2zg6r29r.json record into textarea (7 ms)
    ✓ load ./records/ark:-65665-31a4ebda8-01f5-4b26-8ff3-1da928424337.json record into textarea (12 ms)
    ✓ load ./records/ark:-65665-337ce8d1d-78f9-4583-83c8-bedda5e747fc.json record into textarea (14 ms)
    ✓ load ./records/IGSN:DSR000GGA.json record into textarea (7 ms)
    ✓ load ./records/IGSN:IENWU00VJ.json record into textarea (7 ms)
    ✓ load ./records/IGSN:NHB0031EE.json record into textarea (8 ms)
    ✓ load ./records/IGSN:ODP014CZT.json record into textarea (13 ms)
    ✓ load ./records/IGSN:ODP02DGLR.json record into textarea (9 ms)

Test Suites: 1 passed, 1 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        0.715 s, estimated 1 s
```