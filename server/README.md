## movie reviews backend

### setup
First [install poetry](https://python-poetry.org/docs/#installation), then run the following command:
```bash
$ poetry install
```

### running the dev server
```bash
$ poetry run uvicorn app:app --reload
```

Once the dev server is running head to http://127.0.0.1:8000/docs for API docs.