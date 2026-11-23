import { DirectionProvider } from '@base-ui/react/direction-provider';
import { Slider as SliderPrimitive } from '@base-ui/react/slider';

import { cn } from '../../../lib/utils';

type SliderValueText = (formattedValue: string, value: number, index: number) => string;

type SliderProps = SliderPrimitive.Root.Props<number> & {
  getAriaValueText?: SliderValueText;
  /** Reading direction. Base UI places the thumb and reverses the arrow keys from this, not from the DOM. */
  dir?: 'ltr' | 'rtl';
};

function Slider({
  className,
  getAriaValueText,
  dir,
  ...props
}: SliderProps): React.JSX.Element {
  const slider = (
    <SliderPrimitive.Root
      {...props}
      dir={dir}
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
  return dir ? <DirectionProvider direction={dir}>{slider}</DirectionProvider> : slider;
}

export { Slider };
export type { SliderProps, SliderValueText };
