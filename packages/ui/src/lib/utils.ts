import { type ClassValue, clsx } from 'clsx';

import {
  COLOR_NAMES,
  type ColorName,
} from '../constants';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function isColorName(value: string): value is ColorName {
  return (COLOR_NAMES as readonly string[]).includes(value);
}
