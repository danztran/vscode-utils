import * as vscode from "vscode";
import { ExtensionContext } from "vscode";
import { DefaultLogger } from "./logger";

export class App extends DefaultLogger {
  private ctx: ExtensionContext;
  constructor(ctx: ExtensionContext) {
    const channel = vscode.window.createOutputChannel("Utils");
    super({
      level: "debug",
      channel,
    });
    this.ctx = ctx;
    this.removeOtherFolders = this.removeOtherFolders.bind(this);
  }

  removeOtherFolders(): boolean {
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
    for (const folder of folders) {
      const path = folder.uri.path;
      if (fileName.includes(path)) {
        return folder;
      }
    }
    return false;
  }
}
