import type { ProjectConfiguration } from '@nrwl/devkit';
import { Tree, formatFiles, updateJson, getProjects } from '@nrwl/devkit';

function getScopeTags(tags?: string[]) {
  if (tags === undefined) {
    return [];
  }

  return tags.filter((tag) => tag.startsWith('scope:'));
}

function getScopes(projectMap: Map<string, ProjectConfiguration>) {
  const allScopes: string[] = Array.from(projectMap.values())
    // take only those that point to scope
    .map(({ tags }) => getScopeTags(tags))
    // flatten the array
    .reduce((acc, tags) => [...acc, ...tags], [])
    // remove prefix `scope:`
    .map((scope) => scope.slice(6));
  // remove duplicates
  return Array.from(new Set(allScopes));
}

function replaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map((s) => `'${s}'`).join(' | ');
  const PATTERN = /interface Schema \{\n.*\n.*\n\}/gm;
  return content.replace(
    PATTERN,
    `interface Schema {
      name: string;
      directory: ${joinScopes};
    }`
  );
}

export default async function (tree: Tree, schema: any) {
  const scopes = getScopes(getProjects(tree));

  updateJson(tree, 'tools/generators/util-lib/schema.json', (schemaJson) => {
    schemaJson.properties.directory['x-prompt'].items = scopes.map((scope) => ({
      value: scope,
      label: scope,
    }));
    return schemaJson;
  });

  const content = tree.read('tools/generators/util-lib/index.ts', 'utf-8');
  if (content !== null) {
    const newContent = replaceScopes(content, scopes);
    tree.write('tools/generators/util-lib/index.ts', newContent);
  }

  await formatFiles(tree);
}
