import {SET_COMPILER_VERSIONS, SELECT_COMPILER, SELECT_EDITOR_THEME} from '../actions/compilers';

const compilers = (state = {}, action) => {
  const {type, jsonSources, jsonReleases, selectedCompiler, selectedEditorTheme} = action;

  switch (type) {
    case SET_COMPILER_VERSIONS:
      return {...state, jsonSources, jsonReleases}
    case SELECT_COMPILER:
      return {...state, selectedCompiler}
    case SELECT_EDITOR_THEME:
      return {...state, selectedEditorTheme}
    default:
      return state;
  }
}

export default compilers;