import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/Generic keywords"
}

export default meta;

export const Annotations = createStory({
    "storybook-name": "📌 Annotations",
    schema: {
        "title": "Match anything",
        "description": "This is a *schema* that matches **anything.**",
        "default": "Default value",
        "examples": [
          "Anything",
          4035
        ],
        "deprecated": true,
        "readOnly": true,
        "writeOnly": false
    },
    vierwerOptions: {
        showExamples: true
    }
  });

export const Const = createStory({
    "storybook-name": "🧊 Const",
    schema: {
        "properties": {
          "country": {
            "const": "United States of America"
          }
        }
    }
});

export const Enum = createStory({
    "storybook-name": "🔒 Enum",
    schema: {
        "enum": [
          "red",
          "amber",
          "green"
        ]
    }
});
