import {versionFetcher, compilerFetcher} from '../../utils/compiler/compilersLoader';

export const SET_COMPILER_VERSIONS = 'SET_COMPILER_VERSIONS';

export const setCompilerVersions = (jsonSources, jsonReleases) => {
  return {
    type: SET_COMPILER_VERSIONS,
      jsonSources,
      jsonReleases
  }
}

export const fetchCompilerVersions = () => dispatch => {
  return versionFetcher().then(({jsonSources, jsonReleases}) => {
    dispatch(setCompilerVersions(jsonSources, jsonReleases));
    return {jsonSources, jsonReleases};
  });
}

export const SELECT_COMPILER = 'SELECT_COMPILER';

export const selectCompiler = selectedCompiler => {
  return {
    type: SELECT_COMPILER,
    selectedCompiler
  };
}

export const fetchCompiler = (compilerVersion) => dispatch => {
  return compilerFetcher(compilerVersion).then(compiler => {
    dispatch(selectCompiler(compiler));
    return compiler;
  });
}

export const SELECT_EDITOR_THEME = 'SELECT_EDITOR_THEME';

export const selectEditorTheme = (selectedEditorTheme) => {
  return {
    type: SELECT_EDITOR_THEME,
    selectedEditorTheme
  }
}