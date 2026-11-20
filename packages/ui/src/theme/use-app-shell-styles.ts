import { type SystemStyleObject, useSlotRecipe } from '@chakra-ui/react';

export type AppShellStyles = Readonly<Record<string, SystemStyleObject>>;

export function useAppShellStyles(): AppShellStyles {
  const recipe = useSlotRecipe({ key: 'appShell' });
  return recipe();
}
