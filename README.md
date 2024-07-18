# vscode-utils

This extension provides utilities for Visual Studio Code that are not supported by default.

## Installation

```sh
git clone git://github.com/danztran/vscode-utils
cd vscode-utils
yarn
yarn vscode:install
```

This will build the extension and install it in Visual Studio Code.

## Usage

This extension provides a command that removes all folders from the workspace except for the one that contains the currently active file. To use this command, follow these steps:

1. Open the folder that you want to work with in Visual Studio Code.

2. Open a file in the folder.

3. Open the Command Palette by pressing `Ctrl+Shift+P` (Windows, Linux) or `Cmd+Shift+P` (macOS).

4. Type "Utils: Remove Other Folders from Workspace" and select the command from the list.

   This will remove all folders from the workspace except for the one that contains the currently active file.
