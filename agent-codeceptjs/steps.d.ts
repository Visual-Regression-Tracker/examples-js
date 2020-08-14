/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');
type VisualRegressionTrackerHelper = import('@visual-regression-tracker/agent-codeceptjs');

declare namespace CodeceptJS {
  interface SupportObject { I: CodeceptJS.I }
  interface CallbackOrder { [0]: CodeceptJS.I }
  interface Methods extends CodeceptJS.WebDriver, VisualRegressionTrackerHelper {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
