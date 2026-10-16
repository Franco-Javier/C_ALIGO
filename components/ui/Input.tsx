import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  /** Obligatorio por accesibilidad. Usa `hideLabel` si no debe verse. */
  label: string;
  hideLabel?: boolean;
  hint?: string;
  error?: string;
};

const CONTROL =
  "w-full rounded-lg border bg-surface-2 px-3 text-sm text-text placeholder:text-text-muted/70 " +
  "transition focus:border-primary focus:outline-none focus-visible:outline-none focus:shadow-glow-sm " +
  "disabled:cursor-not-allowed disabled:opacity-50";

function Field({
  id,
  label,
  hideLabel,
  hint,
  error,
  children,
}: FieldProps & { id: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={cn("text-sm font-medium text-text", hideLabel && "sr-only")}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="text-xs text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-msg`} className="text-xs text-text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function controlA11y(id: string, { hint, error }: FieldProps) {
  return {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error || hint ? `${id}-msg` : undefined,
  };
}

type InputProps = FieldProps & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, hideLabel, hint, error, id, className, ...props }: InputProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <Field id={fieldId} label={label} hideLabel={hideLabel} hint={hint} error={error}>
      <input
        {...controlA11y(fieldId, { label, hint, error })}
        className={cn(CONTROL, "h-10", error ? "border-danger" : "border-border", className)}
        {...props}
      />
    </Field>
  );
}

type TextareaProps = FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ label, hideLabel, hint, error, id, className, ...props }: TextareaProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <Field id={fieldId} label={label} hideLabel={hideLabel} hint={hint} error={error}>
      <textarea
        rows={4}
        {...controlA11y(fieldId, { label, hint, error })}
        className={cn(CONTROL, "py-2", error ? "border-danger" : "border-border", className)}
        {...props}
      />
    </Field>
  );
}

type SelectProps = FieldProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: { value: string; label: string }[];
    placeholder?: string;
  };

export function Select({
  label,
  hideLabel,
  hint,
  error,
  id,
  className,
  options,
  placeholder,
  ...props
}: SelectProps) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  return (
    <Field id={fieldId} label={label} hideLabel={hideLabel} hint={hint} error={error}>
      <select
        {...controlA11y(fieldId, { label, hint, error })}
        className={cn(CONTROL, "h-10", error ? "border-danger" : "border-border", className)}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
