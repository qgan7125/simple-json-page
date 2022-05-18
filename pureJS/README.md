# A simple webpage to render the JSON file to html page

The original JSON data would be stored in the `<script type="application/ld+json">`. The javascript would convert the content into html `table` when the window loads.

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

## Inject JSON data into html
[injectJSON.ipynb](injectJSON.ipynb) uses `BeautifulSoup` function in `bs4` library to modfiy the `html` file.

The result html files could be found in [pages folder](./pages/)