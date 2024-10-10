import { workspace, ExtensionContext, languages, DocumentSelector, DocumentFilter } from 'vscode';
import { JSightDefinitionProvider } from './definitionProvider';

export function activate(context: ExtensionContext) {
  // const docSel = { language: 'go', scheme: 'file' };
  languages.registerDefinitionProvider('jsight', new JSightDefinitionProvider())
}

export function deactivate() {}