import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/Numeric "
}

export default meta;

export const Integer = createStory({
    "storybook-name": "1️⃣ Integer",
    schema: {
        "type": "integer"
    }
});

export const MultipleOf = createStory({
    "storybook-name": "✖️ Multiple Of",
    schema: {
        "type": "number",
        "multipleOf": 10
    }
});

export const Number = createStory({
    "storybook-name": "🔢 Number",
    schema: {
        "type": "number"
    }
});

export const Ranges = createStory({
    "storybook-name": "🌡️ Ranges",
    schema: {
        "type": "number",
        "minimum": 0,
        "exclusiveMaximum": 100
    }
});