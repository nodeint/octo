import {
  COLOR_NAMES,
  type ColorName,
} from '../constants';

export { cn } from '@workspace/ds';

export function isColorName(value: string): value is ColorName {
  return (COLOR_NAMES as readonly string[]).includes(value);
}
