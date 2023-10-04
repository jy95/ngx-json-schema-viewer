import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/Object"
}

export default meta;

export const AdditionalProperties1 = createStory({
    "storybook-name": "🗝️ AdditionalProperties (1)",
    schema: {
        "type": "object",
        "properties": {
          "number": {
            "type": "number"
          },
          "street_name": {
            "type": "string"
          },
          "street_type": {
            "enum": [
              "Street",
              "Avenue",
              "Boulevard"
            ]
          }
        },
        "additionalProperties": false
    }
});

export const AdditionalProperties2 = createStory({
    "storybook-name": "🛠️ AdditionalProperties (2)",
    schema: {
        "type": "object",
        "properties": {
          "number": {
            "type": "number"
          },
          "street_name": {
            "type": "string"
          },
          "street_type": {
            "enum": [
              "Street",
              "Avenue",
              "Boulevard"
            ]
          }
        },
        "additionalProperties": {
          "type": "string"
        }
      }
});

export const AdditionalPropertiesWithPatternProperties = createStory({
    "storybook-name": "🌈 AdditionalProperties with patternProperties",
    schema: {
        "type": "object",
        "properties": {
          "builtin": {
            "type": "number"
          }
        },
        "patternProperties": {
          "^S_": {
            "type": "string"
          },
          "^I_": {
            "type": "integer"
          }
        },
        "additionalProperties": {
          "type": "string"
        }
      }
});

export const PatternProperties = createStory({
    "storybook-name": "🎨 PatternProperties",
    schema: {
        "type": "object",
        "patternProperties": {
          "^S_": {
            "type": "string"
          },
          "^I_": {
            "type": "integer"
          }
        }
      }
});

export const Properties = createStory({
    "storybook-name": "📝 Properties",
    schema: {
        "type": "object",
        "properties": {
          "number": {
            "type": "number"
          },
          "street_name": {
            "type": "string"
          },
          "street_type": {
            "enum": [
              "Street",
              "Avenue",
              "Boulevard"
            ]
          }
        }
      }
});

export const PropertyNames = createStory({
    "storybook-name": "🏷️ PropertyNames",
    schema: {
        "type": "object",
        "propertyNames": {
          "pattern": "^[A-Za-z_][A-Za-z0-9_]*$"
        }
      }
});

export const Required = createStory({
    "storybook-name": "🔴 Required",
    schema: {
        "type": "object",
        "properties": {
          "id": {
            "type": "number",
            "readOnly": true
          },
          "name": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "telephone": {
            "type": "string",
            "deprecated": true
          },
          "password": {
            "type": "string",
            "writeOnly": true
          }
        },
        "required": [
          "name",
          "email"
        ]
      }
});

export const Simple = createStory({
    "storybook-name": "🟦 Simple",
    schema: {
        "type": "object"
      }
});

export const Size = createStory({
    "storybook-name": "📏 Size",
    schema: {
        "type": "object",
        "minProperties": 2,
        "maxProperties": 3
      }
});

export const UnevaluatedProperties1 = createStory({
    "storybook-name": "🧐 UnevaluatedProperties (1)",
    schema: {
        "type": "object",
        "properties": {
          "number": {
            "type": "number"
          },
          "street_name": {
            "type": "string"
          },
          "street_type": {
            "enum": [
              "Street",
              "Avenue",
              "Boulevard"
            ]
          }
        },
        "unevaluatedProperties": false
      }
});

export const UnevaluatedProperties2 = createStory({
    "storybook-name": "🕵️‍♀️ UnevaluatedProperties (2)",
    schema: {
        "type": "object",
        "properties": {
          "number": {
            "type": "number"
          },
          "street_name": {
            "type": "string"
          },
          "street_type": {
            "enum": [
              "Street",
              "Avenue",
              "Boulevard"
            ]
          }
        },
        "unevaluatedProperties": {
          "type": "boolean"
        }
      }
});