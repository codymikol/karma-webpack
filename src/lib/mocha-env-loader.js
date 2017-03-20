import { SourceNode } from 'source-map';
import loaderUtils from 'loader-utils';

export default function (content, map) {
  this.cacheable();

  let sourceNode;
  const id = this.options.name;

  if (!id) {
    this.callback(null, content, map);
  }

  if (map) {
    sourceNode = SourceNode.fromSourceWithMap(content, map);
  } else {
    const fileName = loaderUtils.getRemainingRequest(this);

    sourceNode = new SourceNode(null, null, null);
    content.split('\n').forEach((line, idx) => {
      sourceNode.add(new SourceNode(idx + 1, 0, fileName, `${line}\n`));
    });
    sourceNode.setSourceContent(fileName, content);
  }

  const concatSrc = new SourceNode();

  concatSrc.add([
    `describe(${JSON.stringify(id)}, function() {\n`, sourceNode, '\n});',
  ]);

  const result = concatSrc.toStringWithSourceMap();

  this.callback(undefined, result.code, result.map.toString()); // eslint-disable-line no-undefined
}
