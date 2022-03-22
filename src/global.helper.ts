import * as format from 'string-format';

declare global {
  interface String {
    format(arguments: any): string;
  }
}
// String format
format.extend(String.prototype, {})