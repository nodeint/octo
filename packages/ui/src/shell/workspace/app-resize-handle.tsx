import { Box, Splitter } from '@chakra-ui/react';

import { useAppShellStyles } from '../../hooks';

type AppResizeHandleProps = {
  /** `"<before panel id>:<after panel id>"`, the pair of panels this handle resizes. */
  readonly id: `${string}:${string}`;
};

export function AppResizeHandle({ id }: AppResizeHandleProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Splitter.ResizeTrigger id={id} unstyled css={styles.resizeHandle}>
      <Box data-part="dots" aria-hidden css={styles.resizeDots} />
    </Splitter.ResizeTrigger>
  );
}
