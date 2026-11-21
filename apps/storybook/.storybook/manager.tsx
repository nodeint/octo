import { IconButton, TooltipLinkList, WithTooltip } from 'storybook/internal/components';
import { addons, types, useGlobals } from 'storybook/manager-api';
import React, { useState } from 'react';

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

  const links = openAxis === null
    ? APPEARANCE_AXES.map((axis) => ({
        id: axis.key,
        title: axis.label,
        right: currentValue(axis),
        onClick: (): void => setOpenAxis(axis),
      }))
    : [
        { id: 'back', title: `‹ ${openAxis.label}`, onClick: (): void => setOpenAxis(null) },
        ...openAxis.options.map((option) => ({
          id: option,
          title: option,
          active: currentValue(openAxis) === option,
          onClick: (): void => updateGlobals({ [openAxis.key]: option }),
        })),
      ];

  return (
    <WithTooltip
      placement="bottom-start"
      closeOnOutsideClick
      onVisibleChange={(isVisible) => {
        if (!isVisible) setOpenAxis(null);
      }}
      tooltip={<TooltipLinkList links={links} />}
    >
      <IconButton title="Appearance" aria-label="Appearance">
        <AppearanceIcon />
      </IconButton>
    </WithTooltip>
  );
}

addons.register(TOOL_ID, () => {
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Appearance',
    render: () => <AppearanceMenu />,
  });
});
