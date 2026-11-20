import * as React from 'react';

import { cn } from '../../../lib/utils';

const SPOTLIGHT_EDGE_RADIUS_PX = 130;
const HALF = 2;
const EDGE_STROKE_PX = 1;
const EDGE_STROKE_INSET_PX = EDGE_STROKE_PX / HALF;

/**
 * 1px stroke sits 0.5px inside the box so the whole stroke stays in view.
 * The corner radius is the outer radius minus half the stroke, matching `rounded-lg`.
 */
const EDGE_RECT_STYLE = {
  x: EDGE_STROKE_INSET_PX,
  y: EDGE_STROKE_INSET_PX,
  width: `calc(100% - ${EDGE_STROKE_PX}px)`,
  height: `calc(100% - ${EDGE_STROKE_PX}px)`,
  rx: `calc(var(--radius-lg) - ${EDGE_STROKE_INSET_PX}px)`,
  ry: `calc(var(--radius-lg) - ${EDGE_STROKE_INSET_PX}px)`,
} as const;

type CanvasNodeProps = React.ComponentProps<'div'> & {
  /** Node id. Names the spotlight gradient so two nodes do not share one paint. */
  nodeId: string;
  /** Selected nodes paint the edge in the primary color. */
  selected?: boolean;
};

type CanvasNodeEffectProps = {
  nodeId: string;
  selected: boolean;
};

function CanvasNodeEffect({ nodeId, selected }: CanvasNodeEffectProps) {
  const gradientId = `spotlight-grad-${nodeId}`;
  return (
    <>
      <div className="canvas-node-fill" />
      <svg className="canvas-node-edge-frame" aria-hidden>
        <defs>
          <radialGradient
            id={gradientId}
            cx="var(--mouse-x, 0px)"
            cy="var(--mouse-y, 0px)"
            r={SPOTLIGHT_EDGE_RADIUS_PX}
            gradientUnits="userSpaceOnUse"
          >
            <stop
              offset="0%"
              stopColor="var(--primary)"
              style={{ stopOpacity: 'var(--spotlight-intensity, 0)' }}
            />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect
          fill="none"
          data-selected={selected ? '' : undefined}
          className="canvas-node-edge"
          style={EDGE_RECT_STYLE}
        />
        <rect
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={EDGE_STROKE_PX}
          style={EDGE_RECT_STYLE}
        />
      </svg>
    </>
  );
}

function CanvasNode({
  className,
  nodeId,
  selected = false,
  children,
  ref,
  ...props
}: CanvasNodeProps): React.JSX.Element {
  return (
    <div
      ref={ref}
      data-slot="canvas-node"
      data-selected={selected ? '' : undefined}
      className={cn('canvas-node', className)}
      {...props}
    >
      {children}
      <CanvasNodeEffect nodeId={nodeId} selected={selected} />
    </div>
  );
}

function CanvasNodeHeader({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="canvas-node-header"
      className={cn('canvas-node-header', className)}
      {...props}
    />
  );
}

function CanvasNodeContent({ className, ...props }: React.ComponentProps<'div'>): React.JSX.Element {
  return (
    <div
      data-slot="canvas-node-content"
      className={cn('canvas-node-content', className)}
      {...props}
    />
  );
}

export { CanvasNode, CanvasNodeContent, CanvasNodeHeader };
export type { CanvasNodeProps };
