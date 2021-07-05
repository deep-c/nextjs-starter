type UnknownArrayOrObject = unknown[] | Record<string, unknown>;

export const getDirtyValues = (
  dirtyFields: UnknownArrayOrObject | boolean,
  allValues: UnknownArrayOrObject
): UnknownArrayOrObject => {
  // If *any* item in an array was modified, the entire array must be submitted, because there's no
  // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [
      key,
      // @ts-ignore
      getDirtyValues(dirtyFields[key], allValues[key]),
    ])
  );
};
