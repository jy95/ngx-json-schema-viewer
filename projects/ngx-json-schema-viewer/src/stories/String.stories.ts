import { defaultMeta, createStory } from "./setup";
import type { MetaViewer } from "./setup";

const meta : MetaViewer = {
  ...defaultMeta,
  title: "Viewer/String"
}

export default meta;

export const ContentEncoding = createStory({
    "storybook-name": "📜 ContentEncoding",
    schema: {
        "type": "string",
        "contentEncoding": "base64"
      }
});

export const ContentEncodingAndContentMediaType = createStory({
    "storybook-name": "📄 ContentEncoding & ContentMediaType",
    schema: {
        "type": "string",
        "contentEncoding": "base64",
        "contentMediaType": "application/json"
    }
});

export const ContentMediaType = createStory({
    "storybook-name": "🔖 ContentMediaType",
    schema: {
        "type": "string",
        "contentMediaType": "application/json"
      }
});

export const ContentSchema = createStory({
    "storybook-name": "📑 ContentSchema",
    schema: {
        "type": "string",
        "contentSchema": {
          "type": "object",
          "required": [
            "name",
            "age"
          ]
        }
      }
});

export const Format = createStory({
    "storybook-name": "📅 Format",
    schema: {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "type": "object",
        "properties": {
          "prop1": {
            "type": "string",
            "format": "date-time",
            "examples": [
              "2018-11-13T20:20:39+00:00"
            ]
          },
          "prop2": {
            "type": "string",
            "format": "time",
            "examples": [
              "20:20:39+00:00"
            ]
          },
          "prop3": {
            "type": "string",
            "format": "date",
            "examples": [
              "2018-11-13"
            ]
          },
          "prop4": {
            "type": "string",
            "format": "duration",
            "examples": [
              "P3D"
            ]
          },
          "prop5": {
            "type": "string",
            "format": "email",
            "examples": [
              "test@gmail.com"
            ]
          },
          "prop6": {
            "type": "string",
            "format": "idn-email",
            "examples": [
              "test@gmail.com"
            ]
          },
          "prop7": {
            "type": "string",
            "format": "hostname",
            "examples": [
              "example"
            ]
          },
          "prop8": {
            "type": "string",
            "format": "idn-hostname",
            "examples": [
              "example"
            ]
          },
          "prop9": {
            "type": "string",
            "format": "ipv4",
            "examples": [
              "192.168.1.1"
            ]
          },
          "prop10": {
            "type": "string",
            "format": "ipv6",
            "examples": [
              "2001:db8:3333:4444:5555:6666:7777:8888"
            ]
          },
          "prop11": {
            "type": "string",
            "format": "uuid",
            "examples": [
              "3e4666bf-d5e5-4aa7-b8ce-cefe41c7568a"
            ]
          },
          "prop12": {
            "type": "string",
            "format": "uri",
            "examples": [
              "https://www.perdu.com/"
            ]
          },
          "prop12B": {
            "type": "string",
            "format": "uri-reference"
          },
          "prop13": {
            "type": "string",
            "format": "iri",
            "examples": [
              "https://www.perdu.com/"
            ]
          },
          "prop13B": {
            "type": "string",
            "format": "iri-reference"
          },
          "prop14": {
            "type": "string",
            "format": "uri-template"
          },
          "prop15": {
            "type": "string",
            "format": "json-pointer"
          },
          "prop16": {
            "type": "string",
            "format": "relative-json-pointer"
          },
          "prop17": {
            "type": "string",
            "format": "regex",
            "examples": [
              "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
            ]
          }
        }
      }
});

export const Length = createStory({
    "storybook-name": "📏 Length",
    schema: {
        "type": "string",
        "minLength": 2,
        "maxLength": 3
      }
});

export const Pattern = createStory({
    "storybook-name": "🔮 Pattern",
    schema: {
        "type": "string",
        "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
      }
});

export const Basic = createStory({
    "storybook-name": "🟦 Basic",
    schema: {
        "type": "string"
      }
});