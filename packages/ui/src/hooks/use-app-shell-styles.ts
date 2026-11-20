import { type SlotRecipeFn, useSlotRecipe } from '@chakra-ui/react';

export type AppShellStyles = Readonly<ReturnType<SlotRecipeFn<'appShell'>>>;

export function useAppShellStyles(): AppShellStyles {
  const recipe = useSlotRecipe({ key: 'appShell' });
  return recipe();
}
