import React, { useState } from 'react';
import { Button, PopoverProvider } from 'storybook/internal/components';
import { addons, types, useGlobals } from 'storybook/manager-api';

import { APPEARANCE_AXES, type AppearanceAxis, INITIAL_APPEARANCE } from './appearance';

const TOOL_ID = 'octo/appearance';

function AppearanceIcon(): React.JSX.Element {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 1.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" />
    </svg>
  );
}

function AppearanceMenu(): React.JSX.Element {
  const [globals, updateGlobals] = useGlobals();
  const [openAxis, setOpenAxis] = useState<AppearanceAxis | null>(null);

  /** Globals arrive after the preview loads; until then show the initial value. */
  const currentValue = (axis: AppearanceAxis): string => String(globals[axis.key] ?? INITIAL_APPEARANCE[axis.key]);

  const rows = openAxis === null
    ? APPEARANCE_AXES.map((axis) => ({
        id: axis.key,
        title: axis.label,
        right: currentValue(axis),
        active: false,
        onClick: (): void => setOpenAxis(axis),
      }))
    : [
        { id: 'back', title: `‹ ${openAxis.label}`, right: '', active: false, onClick: (): void => setOpenAxis(null) },
        ...openAxis.options.map((option) => ({
          id: option,
          title: option,
          right: '',
          active: currentValue(openAxis) === option,
          onClick: (): void => updateGlobals({ [openAxis.key]: option }),
        })),
      ];

  return (
    <PopoverProvider
      ariaLabel="Appearance"
      placement="bottom-start"
      padding={4}
      onVisibleChange={(isVisible: boolean) => {
        if (!isVisible) setOpenAxis(null);
      }}
      popover={(
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 160 }}>
          {rows.map((row) => (
            <Button
              key={row.id}
              ariaLabel={false}
              variant={row.active ? 'solid' : 'ghost'}
              onClick={row.onClick}
              style={{ justifyContent: 'space-between', gap: 16 }}
            >
              <span>{row.title}</span>
              <span>{row.right}</span>
            </Button>
          ))}
        </div>
      )}
    >
      <Button variant="ghost" padding="small" ariaLabel="Appearance">
        <AppearanceIcon />
      </Button>
    </PopoverProvider>
  );
}

addons.register(TOOL_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Appearance',
    render: () => <AppearanceMenu />,
  });
});
