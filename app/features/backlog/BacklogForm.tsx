import { Form, useNavigation } from "react-router";
import { PRIORITIES } from "~/features/board/types";
import type { BacklogInput } from "./types";
import { DESCRIPTION_MAX, TITLE_MAX, type FieldErrors } from "./validation";

type BacklogFormProps = {
  initialValues?: BacklogInput;
  submitLabel: string;
  fieldErrors?: FieldErrors;
  error?: string;
};

const EMPTY: BacklogInput = { title: "", description: "", priority: "medium" };

const inputStyles =
  "mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none aria-invalid:border-rose-500 aria-invalid:ring-rose-500/30";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-rose-600">
      {message}
    </p>
  );
}

export function BacklogForm({
  initialValues = EMPTY,
  submitLabel,
  fieldErrors = {},
  error,
}: BacklogFormProps) {
  const navigation = useNavigation();
  const isSaving = navigation.formMethod === "POST";

  return (
    <Form method="post" noValidate className="flex flex-col gap-4">
      {error && (
        <p
          role="alert"
          className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
        >
          {error}
        </p>
      )}

      <div>
        <label htmlFor="title" className="text-sm font-medium text-slate-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={initialValues.title}
          maxLength={TITLE_MAX}
          aria-invalid={fieldErrors.title ? true : undefined}
          aria-describedby={fieldErrors.title ? "title-error" : undefined}
          className={inputStyles}
        />
        <FieldError id="title-error" message={fieldErrors.title} />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm font-medium text-slate-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={initialValues.description}
          maxLength={DESCRIPTION_MAX}
          aria-invalid={fieldErrors.description ? true : undefined}
          aria-describedby={
            fieldErrors.description ? "description-error" : undefined
          }
          className={inputStyles}
        />
        <FieldError id="description-error" message={fieldErrors.description} />
      </div>

      <div>
        <label
          htmlFor="priority"
          className="text-sm font-medium text-slate-700"
        >
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          defaultValue={initialValues.priority}
          aria-invalid={fieldErrors.priority ? true : undefined}
          aria-describedby={fieldErrors.priority ? "priority-error" : undefined}
          className={inputStyles}
        >
          {PRIORITIES.map((priority) => (
            <option key={priority} value={priority}>
              {priority}
            </option>
          ))}
        </select>
        <FieldError id="priority-error" message={fieldErrors.priority} />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="self-start rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-wait disabled:bg-blue-400"
      >
        {isSaving ? "Saving…" : submitLabel}
      </button>
    </Form>
  );
}
