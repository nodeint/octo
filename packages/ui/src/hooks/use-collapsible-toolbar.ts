import {
  type PointerEvent,
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const HOVER_OPEN_DELAY_MS = 80;
const HOVER_CLOSE_DELAY_MS = 200;
const TOUCH_POINTER = 'touch';
/** A widget popup the content opened. The trigger also sets `aria-expanded`, so it is not read here. */
const EXPANDED_POPUP_SELECTOR = '[aria-expanded="true"]';

interface CollapsibleToolbarState {
  isOpen: boolean;
  /** Pinned by a click or a tap. Hover and an open popup open the bar without pinning it. */
  isPinned: boolean;
  toggle: () => void;
  railProps: {
    onPointerEnter: (event: PointerEvent) => void;
    onPointerLeave: (event: PointerEvent) => void;
  };
}

/**
 * Open state for a toolbar that collapses to its trigger.
 * Open when a mouse hovers it, when a click pinned it, or while a popup in the content is open.
 * Touch never hovers, so a tap on the trigger pins it.
 * Only the trigger unpins it. Focus or a press outside leaves it open.
 */
function observePopup(content: HTMLElement, setHasPopup: (value: boolean) => void): () => void {
  const sync = (): void => {
    setHasPopup(content.querySelector(EXPANDED_POPUP_SELECTOR) !== null);
  };
  sync();
  const observer = new MutationObserver(sync);
  observer.observe(content, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['aria-expanded'],
  });
  return () => {
    observer.disconnect();
  };
}

export function useCollapsibleToolbar(
  contentRef: RefObject<HTMLElement | null>,
): CollapsibleToolbarState {
  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasPopup, setHasPopup] = useState(false);
  const hoverTimer = useRef<number | undefined>(undefined);

  const scheduleHover = useCallback((next: boolean, delay: number) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(setIsHovered, delay, next);
  }, []);

  const release = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    setIsPinned(false);
    setIsHovered(false);
  }, []);

  useEffect(() => () => {
    window.clearTimeout(hoverTimer.current);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (content === null) {
      return undefined;
    }
    return observePopup(content, setHasPopup);
  }, [contentRef]);

  const toggle = useCallback(() => {
    if (isPinned) {
      release();
      return;
    }
    setIsPinned(true);
  }, [isPinned, release]);

  return {
    isOpen: isPinned || isHovered || hasPopup,
    isPinned,
    toggle,
    railProps: {
      onPointerEnter: (event) => {
        if (event.pointerType !== TOUCH_POINTER) {
          scheduleHover(true, HOVER_OPEN_DELAY_MS);
        }
      },
      onPointerLeave: (event) => {
        if (event.pointerType !== TOUCH_POINTER) {
          scheduleHover(false, HOVER_CLOSE_DELAY_MS);
        }
      },
    },
  };
}
