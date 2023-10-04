import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/Array"
}

export default meta;

export const AdditionalItems1 = createStory({
  "storybook-name": "❌ AdditionalItems (1)",
  schema: {
      "type": "array",
      "items": [
        {
          "type": "integer"
        },
        {
          "type": "string"
        }
      ],
      "additionalItems": false
  }
});

export const AdditionalItems2 = createStory({
  "storybook-name": "➕ AdditionalItems (2)",
  schema: {
    "type": "array",
    "items": [
      {
        "type": "integer"
      },
      {
        "type": "string"
      }
    ],
    "additionalItems": {
      "type": "boolean"
    }
  }
});


export const Contains = createStory({
  "storybook-name": "🍱 Contains",
  schema: {
    "type": "array",
    "contains": {
      "type": "number"
    }
  }
});

export const Items = createStory({
  "storybook-name": "🛍️ Items",
  schema: {
    "type": "array",
    "items": {
      "type": "number"
    }
  }
});

export const Length = createStory({
  "storybook-name": "📐 Length",
  schema: {
    "type": "array",
    "minItems": 2,
    "maxItems": 3
  }
});

export const minContainsAndmaxContains = createStory({
  "storybook-name": "📊 minContains & maxContains",
  schema: {
    "type": "array",
    "contains": {
      "type": "number"
    },
    "minContains": 2,
    "maxContains": 3
  }
});

export const Simple = createStory({
  "storybook-name": "🟦 Simple",
  schema: {
    "type": "array"
  }
});

export const Tuples = createStory({
  "storybook-name": "📋 Tuples",
  schema: {
    "type": "array",
    "description": "Represent a street address such as ['1600','Pennsylvania','Avenue','NW']",
    "items": false,
    "prefixItems": [
      {
        "type": "number",
        "description": "The address number"
      },
      {
        "type": "string",
        "description": "The name of the street"
      },
      {
        "enum": [
          "Street",
          "Avenue",
          "Boulevard"
        ],
        "description": "The type of street"
      },
      {
        "enum": [
          "NW",
          "NE",
          "SW",
          "SE"
        ],
        "description": "The city quadrant of the address"
      }
    ]
  }
});

export const UnevaluatedItems1 = createStory({
  "storybook-name": "🤔 UnevaluatedItems (1)",
  schema: {
    "type": "array",
    "prefixItems": [
      {
        "type": "integer"
      },
      {
        "type": "string"
      }
    ],
    "unevaluatedItems": false
  }
});

export const UnevaluatedItems2 = createStory({
  "storybook-name": "📋 UnevaluatedItems (2)",
  schema: {
    "type": "array",
    "prefixItems": [
      {
        "type": "integer"
      },
      {
        "type": "string"
      }
    ],
    "unevaluatedItems": {
      "type": "boolean"
    }
  }
});

export const UniqueItems = createStory({
  "storybook-name": "🦄 Unique items",
  schema: {
    "type": "array",
    "uniqueItems": true
  }
});