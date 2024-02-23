import React, { useEffect } from 'react';
import type {
  DialogProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogContentProps,
  DialogPortalProps,
  DialogOverlayProps,
  SizeTokens,
} from 'tamagui';
import type { ReactNode } from 'react';
import { Adapt, Button, Dialog, Sheet, Unspaced } from 'tamagui';
import { X } from '@tamagui/lucide-icons';

export type SimpleDialogProps = DialogProps & {
  contentStyle?: DialogContentProps;
  description?: ReactNode;
  descriptionStyle?: DialogDescriptionProps;
  portalStyle?: DialogPortalProps;
  open?: boolean;
  title?: ReactNode;
  titleStyle?: DialogTitleProps;
  trigger?: ReactNode;
  withoutCloseButton?: boolean;
  overlayStyle?: DialogOverlayProps;
  onOpenChange?: (open: boolean) => void;
  asLeftSideSheet?: boolean;
  asRightSideSheet?: boolean;
  transitionWidth?: number | SizeTokens | undefined;
};

export function SimpleDialog({
  children,
  contentStyle,
  description,
  descriptionStyle,
  title,
  titleStyle,
  trigger,
  portalStyle,
  withoutCloseButton,
  overlayStyle,
  asLeftSideSheet,
  asRightSideSheet,
  transitionWidth,
  ...props
}: SimpleDialogProps) {
  const [open, setOpen] = React.useState(props.open);

  useEffect(() => {
    if (typeof props.open === 'undefined' || props.open === open) return;
    setOpen(props.open);
  }, [props.open]);

  return (
    <Dialog
      modal
      {...props}
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (props.onOpenChange) props.onOpenChange(open);
      }}
    >
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Adapt when="sm" platform="touch">
        <Sheet zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" space>
            <Adapt.Contents />
          </Sheet.Frame>
          <Sheet.Overlay />
        </Sheet>
      </Adapt>
      <Dialog.Portal
        {...(asRightSideSheet && { jc: 'flex-start', ai: 'flex-end' })}
        {...(asLeftSideSheet && { jc: 'flex-start', ai: 'flex-start' })}
        {...portalStyle}
      >
        <Dialog.Overlay
          key="overlay"
          animation="bouncy"
          o={0.5}
          enterStyle={{ o: 0 }}
          exitStyle={{ o: 0 }}
          {...overlayStyle}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -150, opacity: 0, scale: 0.4 }}
          exitStyle={{ x: 0, y: -150, opacity: 0, scale: 0.4 }}
          space
          {...(asRightSideSheet && {
            enterStyle: { x: transitionWidth || 200, opacity: 0 },
            exitStyle: { x: transitionWidth || 200, opacity: 0 },
            position: 'absolute',
            top: 0,
            bottom: 0,
          })}
          {...(asLeftSideSheet && {
            enterStyle: { x: -(transitionWidth || 100), opacity: 0 },
            exitStyle: { x: -(transitionWidth || 100), opacity: 0 },
            animation: 'bouncy',
            position: 'absolute',
            top: 0,
            bottom: 0,
          })}
          {...contentStyle}
        >
          {title && <Dialog.Title {...titleStyle}>{title}</Dialog.Title>}
          {description && <Dialog.Description {...descriptionStyle}>{description}</Dialog.Description>}
          {children}
          {!withoutCloseButton && (
            <Unspaced>
              <Dialog.Close asChild space>
                <Button pos="absolute" t="$3" r="$3" size="$2" circular space icon={X} />
              </Dialog.Close>
            </Unspaced>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
