# ufit-frontend
A capstone project.

## Setting up your ENVIRONMENT

### Installs

[Git - Downloads (git-scm.com)](https://git-scm.com/downloads)

[Node.js (nodejs.org)](https://nodejs.org/en)

Alternatively, you can get a node version manager like [NVM](https://github.com/nvm-sh/nvm)

### Getting the Repo

In the directory of your choice clone the frontend by running the following in the terminal

```bash
git clone https://github.com/KyleGrande/ufit-frontend.git
```

### Start the Application

Then you can CD into the directory, install the dependencies, and run the app

```bash
cd ufit-frontend 
npm install
npm start
```

### Seeing the Application on your Phone

Download the ExpoGo app

[Expo Go on the App Store (apple.com)](https://apps.apple.com/us/app/expo-go/id982107779)

After starting the application you can scan the QR code in the terminal with your camera app and it will launch the ExpoGo App.

### Making Contributions

[Github Docs](https://www.notion.so/Github-Docs-ff612891bbc34fdc9acef33bf75e3cba?pvs=21)

Before anything else and every time you are going to work on the application you need to get all recent updates

in the directory run

```bash
git pull #pull updates
```

Then once you want to work on something create a branch, these are created for each component of the application. Use a name that describes a component of the app you are working on.

```bash
git checkout -b branch_name. # create and goto branch
```

Once you are finished you can push branches to the repo on GitHub using

```bash
git add . #add all updates
git commit -m "a message saying what you did"  # commit a message
git push -u origin branch_name # push your branch and updates to the repo
```

Then on the GitHub site in the repository, you can see your pull/merge request and accept them.

Once merged you can return to the main branch

```bash
git checkout main.  # return to the main branch
git pull # pull the updates you merged
git branch -d branch_name # delete your old branch
```
