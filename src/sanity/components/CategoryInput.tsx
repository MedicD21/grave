import { useCallback, useId } from "react";
import { set, unset, type StringInputProps } from "sanity";
import { categories as baseCategories } from "@/data/products";

// Custom category input: a free-text field with autocomplete suggestions, so
// Kami can pick a known category OR type a brand-new one. Sanity's built-in
// `options.list` dropdown is strict (pick-only); this allows typing.
export function CategoryInput(props: StringInputProps) {
  const { value = "", onChange, elementProps } = props;
  const listId = useId();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.currentTarget.value;
      onChange(next ? set(next) : unset());
    },
    [onChange],
  );

  return (
    <>
      <input
        {...elementProps}
        type="text"
        value={value}
        onChange={handleChange}
        list={listId}
        placeholder="Pick one or type a new category…"
        style={{
          width: "100%",
          padding: "0.6rem 0.75rem",
          borderRadius: "3px",
          border: "1px solid var(--card-border-color, #ced2d9)",
          background: "var(--card-bg-color, #fff)",
          color: "inherit",
          fontSize: "1rem",
        }}
      />
      <datalist id={listId}>
        {baseCategories.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </>
  );
}
