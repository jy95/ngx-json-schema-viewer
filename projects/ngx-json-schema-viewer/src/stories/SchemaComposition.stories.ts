import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/Schema Composition"
}

export default meta;

export const allOf = createStory({
    "storybook-name": "🤝 allOf",
    schema: {
        "allOf": [
          {
            "title": "Option 1",
            "type": "string"
          },
          {
            "title": "Option 2",
            "maxLength": 5
          }
        ]
      }
});

export const anyOf = createStory({
    "storybook-name": "🌐 anyOf",
    schema: {
        "anyOf": [
          {
            "title": "Option 1",
            "type": "string",
            "maxLength": 5
          },
          {
            "title": "Option 2",
            "type": "number",
            "minimum": 0
          }
        ]
      }
});

export const not = createStory({
    "storybook-name": "🚫 not",
    schema: {
        "title": "Not a string",
        "not": {
            "type": "string"
        }
      }
});

export const oneOf = createStory({
    "storybook-name": "🎯 oneOf",
    schema: {
        "oneOf": [
          {
            "title": "Option 1",
            "type": "number",
            "multipleOf": 5
          },
          {
            "title": "Option 2",
            "type": "number",
            "multipleOf": 3
          }
        ]
      }
});