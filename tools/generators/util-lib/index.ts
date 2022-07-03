import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

const withPrefix = (path) => {
  const pathArr = path.split('/');
  pathArr[pathArr.length - 1] = `util-${pathArr[pathArr.length - 1]}`;
  return pathArr.join('/');
};

interface Schema {
  name: string;
  directory: 'store' | 'api' | 'shared';
}

export default async function (tree: Tree, schema: Schema) {
  const { name, directory } = schema;
  console.log(name, directory);
  await libraryGenerator(tree, {
    name: withPrefix(schema.name),
    directory,
    tags: [`scope:${directory}`, 'type:util'].join(','),
  });
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
