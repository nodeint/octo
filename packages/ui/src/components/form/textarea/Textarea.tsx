import * as React from 'react';

import { cn } from '../../../lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>): React.JSX.Element {
  return (
    <textarea
      data-slot="textarea"
      data-variant="field"
      className={cn('textarea', className)}
      {...props}
    />
  );
}

export { Textarea };
