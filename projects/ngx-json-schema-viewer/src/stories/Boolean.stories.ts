import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/Boolean"
}

export default meta;

export const Booleans = createStory({
    "storybook-name": "✅ Boolean",
    schema: {
        "type": "boolean"
    }
});