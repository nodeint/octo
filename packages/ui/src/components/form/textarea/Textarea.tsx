import * as React from 'react';

import { cn } from '../../../lib/utils';

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>): React.JSX.Element {
  return (
    <textarea
      data-slot="textarea"
      data-field-size="md"
      data-paint="field"
      className={cn('field-control', 'textarea', className)}
      {...props}
    />
  );
}

export { Textarea };
