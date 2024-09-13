# Backend start

```bash
brew update
brew install pyenv
brew install python

brew info python
```

Now we need to activate a virtual environment
```bash
python3 -m venv env
source env/bin/activate.fish
```

In case to deactivate python environment, type:

```bash
deactivate
```

Install libraries

```bash
pip install -r requirements.txt
```


## Commands
Start project:
```
docker compose up -d
```

Create initial migration file:
```
backend/scripts/generate_initial_migration.sh "Initial migration"
```

Run migration:
```
backend/scripts/run_migrations.sh
```

To apply changes run
```
docker-compose build
docker compose up -d
```