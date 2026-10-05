import { Fragment } from "react";

/**
 * Renders **bold** spans inside a plain string, so content files can mark
 * emphasis without containing any JSX.
 */
export function RichText({ text }: { text: string }) {
  // Splitting on a capture group puts the bold text at every odd index.
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
