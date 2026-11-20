import { Slider as SliderPrimitive } from '@base-ui/react/slider';

import { cn } from '../../../lib/utils';

type SliderValueText = (formattedValue: string, value: number, index: number) => string;

type SliderProps = SliderPrimitive.Root.Props<number> & {
  getAriaValueText?: SliderValueText;
};

function Slider({
  className,
  getAriaValueText,
  ...props
}: SliderProps): React.JSX.Element {
  return (
    <SliderPrimitive.Root
      {...props}
      data-slot="slider"
      className={cn('slider', className)}
    >
      <SliderPrimitive.Control className="slider-control">
        <SliderPrimitive.Track className="slider-track">
          <SliderPrimitive.Indicator className="slider-indicator" />
          <SliderPrimitive.Thumb
            className="slider-thumb"
            getAriaValueText={getAriaValueText}
          />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
export type { SliderProps, SliderValueText };
