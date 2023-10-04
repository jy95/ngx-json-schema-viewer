import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/Type"
}

export default meta;

export const MultipleTypes = createStory({
    "storybook-name": "🐾 Multiple types",
    schema: {
        "type": [
          "number",
          "string"
        ]
      }
});

export const SingleTypes = createStory({
    "storybook-name": "🌟 Single type",
    schema: {
        "type": "number"
      }
});