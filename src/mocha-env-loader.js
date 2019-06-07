const sourceMap = require('source-map');
const loaderUtils = require('loader-utils');

const { SourceNode } = sourceMap;
const { SourceMapConsumer } = sourceMap;

module.exports = function mochaEnvLoader(content, map) {
  const options = Object.assign({}, loaderUtils.getOptions(this));
  const id = options.name;
  let sourceNode;

  if (!id) {
    return this.callback(null, content, map);
  }

  if (map) {
    sourceNode = SourceNode.fromStringWithSourceMap(
      content,
      new SourceMapConsumer(map)
    );
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
    `describe(${JSON.stringify(id)}, function() {\n`,
    sourceNode,
    '\n});',
  ]);

  const result = concatSrc.toStringWithSourceMap();

  return this.callback(null, result.code, result.map.toString());
};
