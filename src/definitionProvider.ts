import { DefinitionProvider, TextDocument, Position, CancellationToken, Location } from 'vscode';

export class JSightDefinitionProvider implements DefinitionProvider {

  public provideDefinition(
    document: TextDocument,
    position: Position,
    token: CancellationToken
  ): Location | null {

    let range = document.getWordRangeAtPosition(position, /@[A-Za-z0-9_]+/);
    if (range == undefined) {
      return null
    }
    let typeName = document.getText(range)
    
    const regexBase = '^[\\t ]*TYPE\\s+'
    const regex = new RegExp(regexBase + typeName, 'm')
    const definitionLineOffset = document.getText().search(regex)
    if (definitionLineOffset == -1) {
      return null
    }

    const definitionLinePos = document.positionAt(definitionLineOffset)
    const declarationLine = document.lineAt(definitionLinePos)
    const typeNameOffset = declarationLine.text.search(new RegExp(typeName))
    const pos = document.positionAt(definitionLineOffset + typeNameOffset)

    return new Location(document.uri, pos)
  }
}
