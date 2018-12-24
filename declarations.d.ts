import * as karma from 'karma';
import * as webpack from 'webpack';

declare module 'karma' {
  interface ConfigOptions {
    webpack? : webpack.Configuration
  }
}

declare module 'webpack' {
  interface Configuration {
    transformPath?: (path: string) => string
  }
}