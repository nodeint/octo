import { Icon, Splitter } from '@chakra-ui/react';
import { LuEllipsisVertical } from 'react-icons/lu';

import { useAppShellStyles } from '../../hooks';

type AppResizeHandleProps = {
  /** `"<before panel id>:<after panel id>"`, the pair of panels this handle resizes. */
  readonly id: `${string}:${string}`;
};

export function AppResizeHandle({ id }: AppResizeHandleProps): React.ReactElement {
  const styles = useAppShellStyles();
  return (
    <Splitter.ResizeTrigger id={id} css={styles.resizeHandle}>
      <Splitter.ResizeTriggerSeparator css={styles.resizeLine} aria-hidden />
    </Splitter.ResizeTrigger>
  );
}
