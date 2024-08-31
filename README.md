# Initialization python project

First of all, we need to update our global python files 

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