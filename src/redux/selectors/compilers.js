import { createSelector } from 'reselect';

export const compilersSelector = (state) => state.compilers;

export const compilerSourceVersionsSelector = createSelector(
  compilersSelector,
  (compilers) => compilers.jsonSources
);

export const compilerReleaseVersionsSelector = createSelector(
  compilersSelector,
  (compilers) => compilers.jsonReleases
);

export const selectedCompilerSelector = createSelector(
  compilersSelector,
  (compilers) => compilers.selectedCompiler
)

export const selectedEditorThemeSelector = createSelector(
  compilersSelector,
  (compilers) => compilers.selectedEditorTheme
)