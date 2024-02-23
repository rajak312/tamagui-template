import type { PopoverArrowProps, PopoverContentProps, PopoverProps, PopoverTriggerProps } from 'tamagui';
import { Adapt, Popover } from 'tamagui';
import React from 'react';
import type { ReactNode } from 'react';

export type SimplePopoverProps = PopoverProps & {
  contentStyle?: PopoverContentProps;
  arrowStyle?: PopoverArrowProps;
  triggerStyle?: PopoverTriggerProps;
  arrow?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  trigger: ReactNode;
};

export function SimplePopover({
  children,
  contentStyle,
  triggerStyle,
  arrowStyle,
  arrow = true,
  trigger,
  ...props
}: SimplePopoverProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover size="$5" allowFlip open={open} onOpenChange={setOpen} hoverable {...props}>
      <Popover.Trigger asChild {...triggerStyle}>
        {trigger}
      </Popover.Trigger>
      <Adapt when="sm" platform="touch">
        <Popover.Sheet modal dismissOnSnapToBottom>
          <Popover.Sheet.Frame padding="$4">
            <Adapt.Contents />
          </Popover.Sheet.Frame>
          <Popover.Sheet.Overlay />
        </Popover.Sheet>
      </Adapt>
      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        {...contentStyle}
      >
        {arrow && <Popover.Arrow borderWidth={1} borderColor="$borderColor" {...arrowStyle} />}
        {children}
      </Popover.Content>
    </Popover>
  );
}
