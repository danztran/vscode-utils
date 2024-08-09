// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { App } from './app';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(ctx: vscode.ExtensionContext) {
  const app = new App(ctx);

  const removeOtherFoldersInCurrentWorkspace = vscode.commands.registerCommand(
    'vscode-utils.removeOtherFoldersFromWorkspaceByCurrentFile',
    app.removeFoldersByCurrentFile,
  );

  const removeOtherFoldersFromWorkspace = vscode.commands.registerCommand(
    'vscode-utils.removeOtherFoldersFromWorkspace',
    app.removeOtherFolders,
  );

  ctx.subscriptions.push(
    removeOtherFoldersInCurrentWorkspace,
    removeOtherFoldersFromWorkspace,
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
