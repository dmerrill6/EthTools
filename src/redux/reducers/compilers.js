import {SET_COMPILER_VERSIONS, SELECT_COMPILER} from '../actions/compilers';

const compilers = (state = {}, action) => {
  const {type, jsonSources, jsonReleases, selectedCompiler} = action;

  switch (type) {
    case SET_COMPILER_VERSIONS:
      return {...state, jsonSources, jsonReleases}
    case SELECT_COMPILER:
      return {...state, selectedCompiler}
    default:
      return state;
  }
}

export default compilers;