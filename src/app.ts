import * as vscode from 'vscode';
import { ExtensionContext } from 'vscode';
import { DefaultLogger } from './logger';

export class App extends DefaultLogger {
  private ctx: ExtensionContext;
  constructor(ctx: ExtensionContext) {
    const channel = vscode.window.createOutputChannel('Utils');
    super({
      logLevel: 'debug',
      channel,
    });
    this.ctx = ctx;
    this.removeFoldersByCurrentFile =
      this.removeFoldersByCurrentFile.bind(this);
  }

  async removeOtherFolders(): Promise<boolean> {
    // this script prompt use to select a folder to keep
    const { workspace } = vscode;
    const folders = workspace.workspaceFolders;
    if (!folders) {
      return false;
    }
    const folderNames = folders.map(folder => folder.name);
    const folderName = await vscode.window.showQuickPick(folderNames);
    if (!folderName) {
      return false;
    }
    const folder = folders.find(folder => folder.name === folderName);
    if (!folder) {
      return false;
    }
    workspace.updateWorkspaceFolders(0, folders.length, folder);
    return true;
  }

  removeFoldersByCurrentFile(): boolean {
    const folder = this.getActiveWorkspaceFolder();
    if (!folder) {
      return false;
    }
    const { workspace } = vscode;
    const folders = workspace.workspaceFolders;
    workspace.updateWorkspaceFolders(0, folders?.length, folder);
    return true;
  }

  getActiveWorkspaceFolder(): vscode.WorkspaceFolder | false {
    const { workspace, window } = vscode;
    const folders = workspace.workspaceFolders;
    const editor = window.activeTextEditor;
    if (!folders || !editor) {
      return false;
    }
    const fileName = editor.document.fileName;
    for (const folder of [...folders].reverse()) {
      const path = folder.uri.path;
      if (fileName.includes(path)) {
        return folder;
      }
    }
    return false;
  }
}
