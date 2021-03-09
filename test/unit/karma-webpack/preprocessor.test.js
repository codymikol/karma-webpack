const KW_Preprocessor = require('../../../lib/karma-webpack/preprocessor');

describe('KW_Preprocessor', () => {
  beforeAll(() => {
    jest.mock('../../../lib/karma-webpack/controller');
  });

  afterAll(() => {
    jest.unmock('../../../lib/karma-webpack/controller');
  });

  it('should be defined', () => {
    expect(KW_Preprocessor).toBeDefined();
  });

  it('should process a file', (done) => {
    const config = {
      files: [],
      frameworks: ['webpack'],
      preprocessors: {},
      webpack: {},
    };

    expect(config.__karmaWebpackController).not.toBeDefined();

    const processFile = KW_Preprocessor(config, {});

    expect(config.__karmaWebpackController).toBeDefined();

    // mock used fields
    config.__karmaWebpackController.bundle = jest.fn(() => Promise.resolve());
    config.__karmaWebpackController.bundlesContent = new Proxy(
      {},
      {
        // usign a proxy because the key is the name with a hash
        get() {
          return 'bundle content';
        },
      }
    );

    const doneFn = jest.fn();

    const file = {
      path: 'some\\initial/path/initialfilename.js',
      //         ^^
      //          Added to make sure the "normalize" function is working
      // However, unsure how we could check, only the file name is kept
      // the rest of the path is ignored.
    };

    processFile('unused', file, doneFn);

    Promise.resolve().then(() => {
      const FILENAME_WITH_HASH_RE = /initialfilename\.(\d+)\.js/;
      expect(FILENAME_WITH_HASH_RE.test(file.path)).toBe(true);
      expect(config.__karmaWebpackController.bundle).toHaveBeenCalled();
      expect(doneFn).toHaveBeenCalledWith(null, 'bundle content');

      done();
    });
  });
});
