/*eslint no-unused-vars: 0*/ // solcBrowserWrapper is loaded into the window object when imported
import solcBrowserWrapper from 'browser-solc';

export const versionFetcher = () => {
  return new Promise((resolve, reject) => {
    window.BrowserSolc.getVersions((jsonSources, jsonReleases) => {
      resolve({jsonSources, jsonReleases});
    });
  });
}

export const compilerFetcher = (selectedVersion) => {
  return new Promise((resolve, reject) => {
    window.BrowserSolc.loadVersion(selectedVersion, (compiler) => {
      resolve(compiler);
    });
  });
}