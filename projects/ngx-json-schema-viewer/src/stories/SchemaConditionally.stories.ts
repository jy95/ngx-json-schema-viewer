import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/Schema Conditionally"
}

export default meta;

export const dependentRequired1 = createStory({
    "storybook-name": "🤞 dependencies (dependentRequired)",
    schema: {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "credit_card": {
            "type": "number"
          },
          "billing_address": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ],
        "dependencies": {
          "credit_card": [
            "billing_address"
          ]
        }
      }
});

export const dependentSchemas1 = createStory({
    "storybook-name": "🌳 dependencies (dependentSchemas)",
    schema: {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "credit_card": {
            "type": "number"
          }
        },
        "required": [
          "name"
        ],
        "dependencies": {
          "credit_card": {
            "properties": {
              "billing_address": {
                "type": "string"
              }
            },
            "required": [
              "billing_address"
            ]
          }
        }
      }
});

export const dependentRequired2 = createStory({
    "storybook-name": "🔑 dependentRequired",
    schema: {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "credit_card": {
            "type": "number"
          },
          "billing_address": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ],
        "dependentRequired": {
          "credit_card": [
            "billing_address"
          ]
        }
      }
});

export const dependentRequired3 = createStory({
    "storybook-name": "🔁 dependentRequired (bidirectional)",
    schema: {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "credit_card": {
            "type": "number"
          },
          "billing_address": {
            "type": "string"
          }
        },
        "required": [
          "name"
        ],
        "dependentRequired": {
          "credit_card": [
            "billing_address"
          ],
          "billing_address": [
            "credit_card"
          ]
        }
      }
});

export const dependentSchemas = createStory({
    "storybook-name": "🏗️ dependentSchemas",
    schema: {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "credit_card": {
            "type": "number"
          }
        },
        "required": [
          "name"
        ],
        "dependentSchemas": {
          "credit_card": {
            "properties": {
              "billing_address": {
                "type": "string"
              }
            },
            "required": [
              "billing_address"
            ]
          }
        }
      }
});

export const IfThenElse = createStory({
    "storybook-name": "🎬 If-Then-Else",
    schema: {
        "type": "object",
        "properties": {
          "street_address": {
            "type": "string"
          },
          "country": {
            "default": "United States of America",
            "enum": [
              "United States of America",
              "Canada"
            ]
          }
        },
        "if": {
          "properties": {
            "country": {
              "const": "United States of America"
            }
          }
        },
        "then": {
          "properties": {
            "postal_code": {
              "pattern": "[0-9]{5}(-[0-9]{4})?"
            }
          }
        },
        "else": {
          "properties": {
            "postal_code": {
              "pattern": "[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"
            }
          }
        }
      }
});

export const IfThenElse2 = createStory({
    "storybook-name": "🔀 If-Then-Else (multiple)",
    schema: {
        "type": "object",
        "properties": {
          "street_address": {
            "type": "string"
          },
          "country": {
            "default": "United States of America",
            "enum": [
              "United States of America",
              "Canada",
              "Netherlands"
            ]
          }
        },
        "allOf": [
          {
            "title": "Rule 1",
            "if": {
              "properties": {
                "country": {
                  "const": "United States of America"
                }
              }
            },
            "then": {
              "properties": {
                "postal_code": {
                  "pattern": "[0-9]{5}(-[0-9]{4})?"
                }
              }
            }
          },
          {
            "title": "Rule 2",
            "if": {
              "properties": {
                "country": {
                  "const": "Canada"
                }
              },
              "required": [
                "country"
              ]
            },
            "then": {
              "properties": {
                "postal_code": {
                  "pattern": "[A-Z][0-9][A-Z] [0-9][A-Z][0-9]"
                }
              }
            }
          },
          {
            "title": "Rule 3",
            "if": {
              "properties": {
                "country": {
                  "const": "Netherlands"
                }
              },
              "required": [
                "country"
              ]
            },
            "then": {
              "properties": {
                "postal_code": {
                  "pattern": "[0-9]{4} [A-Z]{2}"
                }
              }
            }
          }
        ]
      }
});