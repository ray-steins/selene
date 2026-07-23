import { PrefixMap, Prefix, generateFieldNames } from "./stringUtils";

const dynamicPrefix = (count: number, sub?: PrefixMap) => {
  const t: Record<string, Prefix> = {}

  for (let i = 0; i < count; i++) {
    t[i] = {
      prefix: String(i),
      subprefixes: sub
    }
  }

  return t;
}

export function assignmentPrefixGenerator(selectedClassLength: number) {
  const selectedClassSubprefixes = dynamicPrefix(selectedClassLength);

  const map = {
    main: {
      prefix: 'main',
    },
    classes: {
      prefix: 'classes',
      subprefixes: selectedClassSubprefixes
    }    
  } satisfies PrefixMap;

  return generateFieldNames(map);
}