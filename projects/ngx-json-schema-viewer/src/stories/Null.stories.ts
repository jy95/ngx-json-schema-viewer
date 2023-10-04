import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/Null"
}

export default meta;

export const Null = createStory({
    "storybook-name": "🕳️ Null",
    schema: {
        "type": "null"
    }
  });