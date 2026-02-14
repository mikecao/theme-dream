"use client";

import { useMemo, useState } from "react";

const defaultTokens = {
  "titleBar.activeBackground": "#181818",
  "titleBar.activeForeground": "#cccccc",
  "statusBar.background": "#007acc",
  "statusBar.foreground": "#ffffff",
  "badge.background": "#4d4d4d",
  "badge.foreground": "#ffffff",
  "activityBar.background": "#181818",
  "activityBar.foreground": "#d4d4d4",
  "activityBar.activeBorder": "#0078d4",
  "sideBar.background": "#1f1f1f",
  "sideBar.foreground": "#cccccc",
  "sideBar.border": "#2b2b2b",
  "sideBarTitle.foreground": "#cccccc",
  "sideBarSectionHeader.background": "#252526",
  "sideBarSectionHeader.foreground": "#cccccc",
  "list.activeSelectionBackground": "#04395e",
  "list.activeSelectionForeground": "#ffffff",
  "list.inactiveSelectionBackground": "#37373d",
  "list.hoverBackground": "#2a2d2e",
  "editorGroupHeader.tabsBackground": "#1f1f1f",
  "tab.activeBackground": "#1e1e1e",
  "tab.activeForeground": "#ffffff",
  "tab.inactiveBackground": "#2d2d2d",
  "tab.inactiveForeground": "#969696",
  "panel.background": "#181818",
  "panel.border": "#3c3c3c",
  "panelTitle.activeForeground": "#e7e7e7",
  "panelTitle.inactiveForeground": "#969696",
  "editor.background": "#1e1e1e",
  "editor.foreground": "#d4d4d4",
  "editorGutter.background": "#1e1e1e",
  "editorLineNumber.foreground": "#858585",
  "editorLineNumber.activeForeground": "#c6c6c6",
  "editorCursor.foreground": "#aeafad",
  "editor.selectionBackground": "#264f78",
  "editor.selectionHighlightBackground": "#add6ff26",
  "editor.lineHighlightBackground": "#2a2d2e66",
  "editorIndentGuide.background1": "#404040",
  "editorWhitespace.foreground": "#40404080",
  "editorError.foreground": "#f14c4c",
  "editorWarning.foreground": "#cca700",
  "terminal.ansiBlue": "#569cd6",
  "terminal.ansiGreen": "#6a9955",
  "terminal.ansiYellow": "#dcdcaa",
  "terminal.ansiRed": "#f44747",
  "syntax.comment": "#6a9955",
  "syntax.keyword": "#c586c0",
  "syntax.string": "#ce9178",
  "syntax.number": "#b5cea8",
  "syntax.function": "#dcdcaa",
  "syntax.variable": "#9cdcfe",
  "syntax.type": "#4ec9b0",
  "syntax.class": "#4ec9b0",
  "syntax.parameter": "#9cdcfe",
  "syntax.property": "#9cdcfe",
  "syntax.decorator": "#d7ba7d",
  "syntax.operator": "#d4d4d4",
  "syntax.regexp": "#d16969",
  "syntax.tag": "#569cd6",
  "syntax.attribute": "#92c5f8",
  "syntax.punctuation": "#d4d4d4",
} as const;

type TokenKey = keyof typeof defaultTokens;
type ThemeTokens = Record<TokenKey, string>;

type TokenGroup = {
  title: string;
  items: Array<{ key: TokenKey; label: string }>;
};

type TokenColorRule = {
  name: string;
  scope: string[];
  key: TokenKey;
};

type CodeChunk = {
  text: string;
  key?: TokenKey;
  selection?: "primary" | "secondary";
};

type CodeLine = {
  number: number;
  active?: boolean;
  chunks: CodeChunk[];
};

const groups: TokenGroup[] = [
  {
    title: "Window & Status",
    items: [
      { key: "titleBar.activeBackground", label: "Title Bar BG" },
      { key: "titleBar.activeForeground", label: "Title Bar FG" },
      { key: "statusBar.background", label: "Status Bar BG" },
      { key: "statusBar.foreground", label: "Status Bar FG" },
      { key: "badge.background", label: "Badge BG" },
      { key: "badge.foreground", label: "Badge FG" },
    ],
  },
  {
    title: "Activity & Sidebar",
    items: [
      { key: "activityBar.background", label: "Activity BG" },
      { key: "activityBar.foreground", label: "Activity FG" },
      { key: "activityBar.activeBorder", label: "Activity Active" },
      { key: "sideBar.background", label: "Sidebar BG" },
      { key: "sideBar.foreground", label: "Sidebar FG" },
      { key: "sideBar.border", label: "Sidebar Border" },
      { key: "sideBarTitle.foreground", label: "Sidebar Title" },
      {
        key: "sideBarSectionHeader.background",
        label: "Section Header BG",
      },
      {
        key: "sideBarSectionHeader.foreground",
        label: "Section Header FG",
      },
      { key: "list.activeSelectionBackground", label: "List Active BG" },
      { key: "list.activeSelectionForeground", label: "List Active FG" },
      {
        key: "list.inactiveSelectionBackground",
        label: "List Inactive BG",
      },
      { key: "list.hoverBackground", label: "List Hover BG" },
    ],
  },
  {
    title: "Tabs & Panel",
    items: [
      {
        key: "editorGroupHeader.tabsBackground",
        label: "Tabs Strip BG",
      },
      { key: "tab.activeBackground", label: "Active Tab BG" },
      { key: "tab.activeForeground", label: "Active Tab FG" },
      { key: "tab.inactiveBackground", label: "Inactive Tab BG" },
      { key: "tab.inactiveForeground", label: "Inactive Tab FG" },
      { key: "panel.background", label: "Panel BG" },
      { key: "panel.border", label: "Panel Border" },
      { key: "panelTitle.activeForeground", label: "Panel Active Title" },
      {
        key: "panelTitle.inactiveForeground",
        label: "Panel Inactive Title",
      },
    ],
  },
  {
    title: "Editor UI",
    items: [
      { key: "editor.background", label: "Editor BG" },
      { key: "editor.foreground", label: "Editor FG" },
      { key: "editorGutter.background", label: "Gutter BG" },
      { key: "editorLineNumber.foreground", label: "Line Number" },
      { key: "editorLineNumber.activeForeground", label: "Active Line #" },
      { key: "editorCursor.foreground", label: "Cursor" },
      { key: "editor.selectionBackground", label: "Selection BG" },
      {
        key: "editor.selectionHighlightBackground",
        label: "Selection Match",
      },
      { key: "editor.lineHighlightBackground", label: "Line Highlight" },
      {
        key: "editorIndentGuide.background1",
        label: "Indent Guides",
      },
      { key: "editorWhitespace.foreground", label: "Whitespace" },
    ],
  },
  {
    title: "Diagnostics & Terminal",
    items: [
      { key: "editorError.foreground", label: "Error" },
      { key: "editorWarning.foreground", label: "Warning" },
      { key: "terminal.ansiBlue", label: "Terminal Blue" },
      { key: "terminal.ansiGreen", label: "Terminal Green" },
      { key: "terminal.ansiYellow", label: "Terminal Yellow" },
      { key: "terminal.ansiRed", label: "Terminal Red" },
    ],
  },
  {
    title: "Syntax",
    items: [
      { key: "syntax.comment", label: "Comment" },
      { key: "syntax.keyword", label: "Keyword" },
      { key: "syntax.string", label: "String" },
      { key: "syntax.number", label: "Number" },
      { key: "syntax.function", label: "Function" },
      { key: "syntax.variable", label: "Variable" },
      { key: "syntax.type", label: "Type" },
      { key: "syntax.class", label: "Class" },
      { key: "syntax.parameter", label: "Parameter" },
      { key: "syntax.property", label: "Property" },
      { key: "syntax.decorator", label: "Decorator" },
      { key: "syntax.operator", label: "Operator" },
      { key: "syntax.regexp", label: "RegExp" },
      { key: "syntax.tag", label: "Tag" },
      { key: "syntax.attribute", label: "Attribute" },
      { key: "syntax.punctuation", label: "Punctuation" },
    ],
  },
];

const tokenColorRules: TokenColorRule[] = [
  {
    name: "Comments",
    scope: ["comment", "punctuation.definition.comment"],
    key: "syntax.comment",
  },
  {
    name: "Keywords",
    scope: ["keyword", "storage", "storage.type"],
    key: "syntax.keyword",
  },
  {
    name: "Strings",
    scope: ["string", "string.quoted", "constant.other.symbol"],
    key: "syntax.string",
  },
  {
    name: "Numbers",
    scope: ["constant.numeric"],
    key: "syntax.number",
  },
  {
    name: "Functions",
    scope: ["entity.name.function", "support.function"],
    key: "syntax.function",
  },
  {
    name: "Variables",
    scope: ["variable", "identifier"],
    key: "syntax.variable",
  },
  {
    name: "Types",
    scope: ["support.type", "storage.type", "entity.name.type"],
    key: "syntax.type",
  },
  {
    name: "Classes",
    scope: ["entity.name.class"],
    key: "syntax.class",
  },
  {
    name: "Parameters",
    scope: ["variable.parameter"],
    key: "syntax.parameter",
  },
  {
    name: "Properties",
    scope: ["variable.other.property", "meta.property-name"],
    key: "syntax.property",
  },
  {
    name: "Decorators",
    scope: ["meta.decorator", "entity.name.function.decorator"],
    key: "syntax.decorator",
  },
  {
    name: "Operators",
    scope: ["keyword.operator", "punctuation.separator"],
    key: "syntax.operator",
  },
  {
    name: "Regular Expressions",
    scope: ["string.regexp", "constant.other.character-class"],
    key: "syntax.regexp",
  },
  {
    name: "Markup Tags",
    scope: ["entity.name.tag"],
    key: "syntax.tag",
  },
  {
    name: "Markup Attributes",
    scope: ["entity.other.attribute-name"],
    key: "syntax.attribute",
  },
];

const codeLines: CodeLine[] = [
  {
    number: 1,
    chunks: [
      { text: "import ", key: "syntax.keyword" },
      { text: "{ ", key: "syntax.punctuation" },
      { text: "readFile", key: "syntax.function" },
      { text: " } ", key: "syntax.punctuation" },
      { text: "from ", key: "syntax.keyword" },
      { text: '"node:fs/promises"', key: "syntax.string" },
      { text: ";", key: "syntax.punctuation" },
    ],
  },
  {
    number: 2,
    chunks: [
      { text: "import ", key: "syntax.keyword" },
      { text: "{ ", key: "syntax.punctuation" },
      { text: "z", key: "syntax.variable" },
      { text: " } ", key: "syntax.punctuation" },
      { text: "from ", key: "syntax.keyword" },
      { text: '"zod"', key: "syntax.string" },
      { text: ";", key: "syntax.punctuation" },
    ],
  },
  {
    number: 3,
    chunks: [
      { text: "import ", key: "syntax.keyword" },
      { text: "type ", key: "syntax.keyword" },
      { text: "{ ", key: "syntax.punctuation" },
      { text: "ThemeDefinition", key: "syntax.type" },
      { text: ", ", key: "syntax.punctuation" },
      { text: "TokenRule", key: "syntax.type" },
      { text: " } ", key: "syntax.punctuation" },
      { text: "from ", key: "syntax.keyword" },
      { text: '"@/lib/theme/types"', key: "syntax.string" },
      { text: ";", key: "syntax.punctuation" },
    ],
  },
  { number: 4, chunks: [{ text: "" }] },
  {
    number: 5,
    chunks: [
      { text: "@cacheTheme", key: "syntax.decorator" },
      { text: "()", key: "syntax.punctuation" },
    ],
  },
  {
    number: 6,
    chunks: [
      { text: "export ", key: "syntax.keyword" },
      { text: "class ", key: "syntax.keyword" },
      { text: "ThemeBuilder", key: "syntax.class" },
      { text: "<", key: "syntax.punctuation" },
      { text: "TTheme", key: "syntax.type" },
      { text: " ", key: "syntax.punctuation" },
      { text: "extends", key: "syntax.keyword" },
      { text: " ", key: "syntax.punctuation" },
      { text: "ThemeDefinition", key: "syntax.type" },
      { text: ">", key: "syntax.punctuation" },
      { text: " {", key: "syntax.punctuation" },
    ],
  },
  {
    number: 7,
    chunks: [
      { text: "  constructor", key: "syntax.function" },
      { text: "(", key: "syntax.punctuation" },
      { text: "private", key: "syntax.keyword" },
      { text: " ", key: "syntax.punctuation" },
      { text: "readonly", key: "syntax.keyword" },
      { text: " ", key: "syntax.punctuation" },
      { text: "source", key: "syntax.parameter" },
      { text: ": ", key: "syntax.punctuation" },
      { text: "TTheme", key: "syntax.type" },
      { text: ") {}", key: "syntax.punctuation" },
    ],
  },
  { number: 8, chunks: [{ text: "" }] },
  {
    number: 9,
    chunks: [
      { text: "  public ", key: "syntax.keyword" },
      { text: "compile", key: "syntax.function" },
      { text: "(", key: "syntax.punctuation" },
      { text: "options", key: "syntax.parameter" },
      { text: ": ", key: "syntax.punctuation" },
      { text: "CompileOptions", key: "syntax.type" },
      { text: "): ", key: "syntax.punctuation" },
      { text: "TokenRule", key: "syntax.type" },
      { text: "[] {", key: "syntax.punctuation" },
    ],
  },
  {
    number: 10,
    chunks: [
      { text: "    const ", key: "syntax.keyword" },
      { text: "hexMatcher", key: "syntax.variable" },
      { text: " = ", key: "syntax.operator" },
      { text: "/#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{8})/g", key: "syntax.regexp" },
      { text: ";", key: "syntax.punctuation" },
    ],
  },
  {
    number: 11,
    active: true,
    chunks: [
      { text: "    const ", key: "syntax.keyword" },
      { text: "accent", key: "syntax.variable" },
      { text: " = ", key: "syntax.operator" },
      { text: "options", key: "syntax.variable", selection: "secondary" },
      { text: ".", key: "syntax.punctuation", selection: "secondary" },
      { text: "palette", key: "syntax.property", selection: "secondary" },
      { text: "?.", key: "syntax.operator", selection: "secondary" },
      { text: "accent", key: "syntax.property", selection: "primary" },
      { text: " ?? ", key: "syntax.operator" },
      { text: '"#4FC1FF"', key: "syntax.string" },
      { text: ";", key: "syntax.punctuation" },
    ],
  },
  {
    number: 12,
    chunks: [
      { text: "    const ", key: "syntax.keyword" },
      { text: "fallback", key: "syntax.variable" },
      { text: " = ", key: "syntax.operator" },
      { text: "this", key: "syntax.keyword" },
      { text: ".", key: "syntax.punctuation" },
      { text: "source", key: "syntax.property" },
      { text: ".", key: "syntax.punctuation" },
      { text: "meta", key: "syntax.property" },
      { text: "?.", key: "syntax.operator" },
      { text: "defaults", key: "syntax.property" },
      { text: "?.", key: "syntax.operator" },
      { text: "foreground", key: "syntax.property" },
      { text: " ?? ", key: "syntax.operator" },
      { text: "accent", key: "syntax.variable" },
      { text: ";", key: "syntax.punctuation" },
    ],
  },
  {
    number: 13,
    chunks: [
      { text: "    return ", key: "syntax.keyword" },
      { text: "this", key: "syntax.keyword" },
      { text: ".", key: "syntax.punctuation" },
      { text: "source", key: "syntax.property" },
      { text: ".", key: "syntax.punctuation" },
      { text: "tokens", key: "syntax.property" },
    ],
  },
  {
    number: 14,
    chunks: [
      { text: "      .", key: "syntax.punctuation" },
      { text: "filter", key: "syntax.function" },
      { text: "((", key: "syntax.punctuation" },
      { text: "token", key: "syntax.parameter" },
      { text: ") => ", key: "syntax.operator" },
      { text: "token", key: "syntax.variable" },
      { text: ".", key: "syntax.punctuation" },
      { text: "enabled", key: "syntax.property" },
      { text: " && ", key: "syntax.operator" },
      { text: "!", key: "syntax.operator" },
      { text: "token", key: "syntax.variable" },
      { text: ".", key: "syntax.punctuation" },
      { text: "deprecated", key: "syntax.property" },
      { text: ")", key: "syntax.punctuation" },
    ],
  },
  {
    number: 15,
    chunks: [
      { text: "      .", key: "syntax.punctuation" },
      { text: "map", key: "syntax.function" },
      { text: "((", key: "syntax.punctuation" },
      { text: "token", key: "syntax.parameter" },
      { text: ", ", key: "syntax.punctuation" },
      { text: "index", key: "syntax.parameter" },
      { text: ") => ({", key: "syntax.punctuation" },
    ],
  },
  {
    number: 16,
    chunks: [
      { text: "        ", key: "syntax.punctuation" },
      { text: "name", key: "syntax.property" },
      { text: ": ", key: "syntax.punctuation" },
      { text: "token", key: "syntax.variable" },
      { text: ".", key: "syntax.punctuation" },
      { text: "name", key: "syntax.property" },
      { text: ",", key: "syntax.punctuation" },
    ],
  },
  {
    number: 17,
    chunks: [
      { text: "        ", key: "syntax.punctuation" },
      { text: "scope", key: "syntax.property" },
      { text: ": ", key: "syntax.punctuation" },
      { text: "`meta.${", key: "syntax.string" },
      { text: "token", key: "syntax.variable" },
      { text: ".", key: "syntax.punctuation" },
      { text: "scope", key: "syntax.property" },
      { text: "}`", key: "syntax.string" },
      { text: ",", key: "syntax.punctuation" },
    ],
  },
  {
    number: 18,
    chunks: [
      { text: "        ", key: "syntax.punctuation" },
      { text: "settings", key: "syntax.property" },
      { text: ": { ", key: "syntax.punctuation" },
      { text: "foreground", key: "syntax.property" },
      { text: ": ", key: "syntax.punctuation" },
      { text: "token", key: "syntax.variable" },
      { text: ".", key: "syntax.punctuation" },
      { text: "color", key: "syntax.property", selection: "secondary" },
      { text: " ?? ", key: "syntax.operator" },
      { text: "fallback", key: "syntax.variable" },
      { text: ", ", key: "syntax.punctuation" },
      { text: "fontStyle", key: "syntax.property" },
      { text: ": ", key: "syntax.punctuation" },
      { text: "token", key: "syntax.variable" },
      { text: ".", key: "syntax.punctuation" },
      { text: "italic", key: "syntax.property" },
      { text: " ? ", key: "syntax.operator" },
      { text: '"italic"', key: "syntax.string" },
      { text: " : ", key: "syntax.operator" },
      { text: '""', key: "syntax.string" },
      { text: " },", key: "syntax.punctuation" },
    ],
  },
  { number: 19, chunks: [{ text: "      }));", key: "syntax.punctuation" }] },
  { number: 20, chunks: [{ text: "  }", key: "syntax.punctuation" }] },
  { number: 21, chunks: [{ text: "}", key: "syntax.punctuation" }] },
  { number: 22, chunks: [{ text: "" }] },
  {
    number: 23,
    chunks: [
      { text: "const ", key: "syntax.keyword" },
      { text: "preview", key: "syntax.variable" },
      { text: " = ", key: "syntax.operator" },
      { text: "<", key: "syntax.punctuation" },
      { text: "ThemePreview", key: "syntax.tag" },
      { text: " ", key: "syntax.punctuation" },
      { text: "variant", key: "syntax.attribute" },
      { text: "=", key: "syntax.operator" },
      { text: '"dark"', key: "syntax.string" },
      { text: " ", key: "syntax.punctuation" },
      { text: "data-count", key: "syntax.attribute" },
      { text: "=", key: "syntax.operator" },
      { text: "{", key: "syntax.punctuation" },
      { text: "42", key: "syntax.number" },
      { text: "}", key: "syntax.punctuation" },
      { text: " />", key: "syntax.punctuation" },
      { text: ";", key: "syntax.punctuation" },
    ],
  },
  {
    number: 24,
    chunks: [
      { text: "export default ", key: "syntax.keyword" },
      { text: "preview", key: "syntax.variable" },
      { text: ";", key: "syntax.punctuation" },
      { text: "  ", key: "editorWhitespace.foreground" },
      { text: "··", key: "editorWhitespace.foreground" },
    ],
  },
];

const editorFontFamily = "Consolas, 'Courier New', monospace";

export default function Home() {
  const [themeName, setThemeName] = useState("Dark Modern Remix");
  const [tokens, setTokens] = useState<ThemeTokens>(defaultTokens);

  const themeJson = useMemo(() => {
    const colorEntries = (Object.keys(tokens) as TokenKey[])
      .filter((key) => !key.startsWith("syntax."))
      .map((key) => [key, tokens[key]]);

    const colors = Object.fromEntries(colorEntries);

    const semanticTokenColors = {
      variable: tokens["syntax.variable"],
      parameter: tokens["syntax.parameter"],
      property: tokens["syntax.property"],
      class: tokens["syntax.class"],
      type: tokens["syntax.type"],
      function: tokens["syntax.function"],
      keyword: tokens["syntax.keyword"],
      decorator: tokens["syntax.decorator"],
    };

    return JSON.stringify(
      {
        name: themeName || "My Theme",
        type: "dark",
        semanticHighlighting: true,
        colors,
        tokenColors: tokenColorRules.map((rule) => ({
          name: rule.name,
          scope: rule.scope,
          settings: { foreground: tokens[rule.key] },
        })),
        semanticTokenColors,
      },
      null,
      2,
    );
  }, [themeName, tokens]);

  const updateToken = (key: TokenKey, value: string) => {
    setTokens((current) => ({ ...current, [key]: value }));
  };

  const exportTheme = () => {
    const blob = new Blob([themeJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${themeName || "my-vscode-theme"}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-slate-900" />
            <div>
              <p className="text-sm font-semibold tracking-wide">Theme Dream</p>
              <p className="text-xs text-slate-500">
                VS Code theme builder with expanded token coverage
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={themeName}
              onChange={(event) => setThemeName(event.target.value)}
              className="w-56 border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none ring-blue-500 transition focus:ring-2"
              placeholder="Theme name"
            />
            <button
              type="button"
              onClick={() => setTokens(defaultTokens)}
              className="border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={exportTheme}
              className="bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Export JSON
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto grid max-w-[1600px] grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_420px]">
        <section className="bg-white p-3">
          <div
            className="overflow-hidden border border-slate-300"
            style={{ fontFamily: "Segoe WPC, Segoe UI, sans-serif" }}
          >
            <div
              className="flex h-8 items-center justify-between px-2 text-[11px]"
              style={{
                background: tokens["titleBar.activeBackground"],
                color: tokens["titleBar.activeForeground"],
              }}
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 bg-[#28c840]" />
                <span className="ml-2 opacity-80">File</span>
                <span className="opacity-80">Edit</span>
                <span className="opacity-80">Selection</span>
                <span className="opacity-80">View</span>
                <span className="opacity-80">Go</span>
                <span className="opacity-80">Run</span>
                <span className="opacity-80">Terminal</span>
                <span className="opacity-80">Help</span>
              </div>
              <span className="opacity-90">
                {themeName || "My Theme"} - Visual Studio Code
              </span>
              <div className="flex items-center gap-2 opacity-80">
                <span className="codicon codicon-layout" />
                <span className="codicon codicon-bell" />
              </div>
            </div>

            <div className="grid min-h-[720px] grid-cols-[48px_270px_1fr]">
              <aside
                className="flex flex-col items-center"
                style={{
                  background: tokens["activityBar.background"],
                  color: tokens["activityBar.foreground"],
                }}
              >
                <div className="relative mt-2 flex h-11 w-full items-center justify-center">
                  <span
                    className="absolute left-0 top-0 h-full w-0.5"
                    style={{ background: tokens["activityBar.activeBorder"] }}
                  />
                  <span className="codicon codicon-files text-[22px]" />
                </div>
                <span className="codicon codicon-search mt-4 text-[22px] opacity-70" />
                <span className="codicon codicon-source-control mt-4 text-[22px] opacity-70" />
                <span className="codicon codicon-debug-alt mt-4 text-[22px] opacity-70" />
                <span className="codicon codicon-extensions mt-4 text-[22px] opacity-70" />
                <span className="codicon codicon-account mt-auto mb-4 text-[20px] opacity-75" />
              </aside>

              <aside
                className="border-r text-[12px]"
                style={{
                  background: tokens["sideBar.background"],
                  color: tokens["sideBar.foreground"],
                  borderColor: tokens["sideBar.border"],
                }}
              >
                <div
                  className="flex h-9 items-center justify-between border-b px-3 text-[11px]"
                  style={{
                    borderColor: tokens["sideBar.border"],
                    background: tokens["sideBarSectionHeader.background"],
                    color: tokens["sideBarSectionHeader.foreground"],
                  }}
                >
                  <span
                    className="font-semibold uppercase tracking-[0.12em]"
                    style={{ color: tokens["sideBarTitle.foreground"] }}
                  >
                    Explorer
                  </span>
                  <div className="flex items-center gap-2 opacity-70">
                    <span className="codicon codicon-new-file" />
                    <span className="codicon codicon-new-folder" />
                    <span className="codicon codicon-collapse-all" />
                  </div>
                </div>
                <div className="px-2 py-2">
                  <p className="mb-1 text-[11px] uppercase opacity-60">
                    Open Editors
                  </p>
                  <div
                    className="mb-1 flex items-center gap-2 px-2 py-1 text-[12px]"
                    style={{
                      background: tokens["list.activeSelectionBackground"],
                      color: tokens["list.activeSelectionForeground"],
                    }}
                  >
                    <span className="codicon codicon-file-code" />
                    <span>theme-preview.tsx</span>
                  </div>
                  <div
                    className="mb-2 flex items-center gap-2 px-2 py-1 text-[12px]"
                    style={{
                      background: tokens["list.inactiveSelectionBackground"],
                    }}
                  >
                    <span className="codicon codicon-file-code" />
                    <span>tokens.ts</span>
                  </div>
                  <p className="mb-1 mt-3 text-[11px] uppercase opacity-60">
                    Theme Dream
                  </p>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 px-2 py-1">
                      <span className="codicon codicon-chevron-down text-[10px] opacity-70" />
                      <span className="codicon codicon-folder text-[14px]" />
                      <span>src</span>
                    </div>
                    <div
                      className="flex items-center gap-2 px-2 py-1"
                      style={{ background: tokens["list.hoverBackground"] }}
                    >
                      <span className="ml-4 codicon codicon-chevron-down text-[10px] opacity-70" />
                      <span className="codicon codicon-folder text-[14px]" />
                      <span>app</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1">
                      <span className="ml-8 codicon codicon-file-code text-[14px]" />
                      <span>page.tsx</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 opacity-75">
                      <span className="ml-8 codicon codicon-file text-[14px]" />
                      <span>globals.css</span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1 opacity-75">
                      <span className="ml-8 codicon codicon-file text-[14px]" />
                      <span>layout.tsx</span>
                    </div>
                  </div>
                </div>
              </aside>

              <section
                className="grid grid-rows-[35px_28px_1fr_132px]"
                style={{
                  background: tokens["editor.background"],
                  color: tokens["editor.foreground"],
                }}
              >
                <div
                  className="flex border-b"
                  style={{
                    borderColor: tokens["sideBar.border"],
                    background: tokens["editorGroupHeader.tabsBackground"],
                  }}
                >
                  <div
                    className="flex h-full items-center gap-2 border-r px-3 text-[12px]"
                    style={{
                      background: tokens["tab.activeBackground"],
                      color: tokens["tab.activeForeground"],
                      borderColor: tokens["sideBar.border"],
                    }}
                  >
                    <span className="codicon codicon-file-code text-[14px]" />
                    <span>theme-preview.tsx</span>
                    <span className="opacity-50">*</span>
                  </div>
                  <div
                    className="flex h-full items-center gap-2 border-r px-3 text-[12px]"
                    style={{
                      background: tokens["tab.inactiveBackground"],
                      color: tokens["tab.inactiveForeground"],
                      borderColor: tokens["sideBar.border"],
                    }}
                  >
                    <span className="codicon codicon-file-code text-[14px]" />
                    <span>tokens.ts</span>
                  </div>
                </div>

                <div
                  className="flex items-center gap-1 border-b px-3 text-[11px] opacity-80"
                  style={{ borderColor: tokens["sideBar.border"] }}
                >
                  <span className="codicon codicon-home" />
                  <span className="codicon codicon-chevron-right text-[10px]" />
                  <span>src</span>
                  <span className="codicon codicon-chevron-right text-[10px]" />
                  <span>app</span>
                  <span className="codicon codicon-chevron-right text-[10px]" />
                  <span className="opacity-100">theme-preview.tsx</span>
                </div>

                <div className="grid grid-cols-[56px_1fr]">
                  <div
                    className="border-r py-2 pr-2 text-right text-[12px] leading-6"
                    style={{
                      borderColor: tokens["sideBar.border"],
                      background: tokens["editorGutter.background"],
                    }}
                  >
                    {codeLines.map((line) => (
                      <p
                        key={line.number}
                        style={{
                          color: line.active
                            ? tokens["editorLineNumber.activeForeground"]
                            : tokens["editorLineNumber.foreground"],
                        }}
                      >
                        {line.number}
                      </p>
                    ))}
                  </div>

                  <div
                    className="relative py-2 pr-2 text-[13px] leading-6"
                    style={{ fontFamily: editorFontFamily }}
                  >
                    <span
                      className="pointer-events-none absolute bottom-2 left-[32px] top-2 w-px opacity-50"
                      style={{
                        background: tokens["editorIndentGuide.background1"],
                      }}
                    />
                    <span
                      className="pointer-events-none absolute bottom-2 left-[64px] top-2 w-px opacity-30"
                      style={{
                        background: tokens["editorIndentGuide.background1"],
                      }}
                    />

                    {codeLines.map((line) => (
                      <div
                        key={line.number}
                        className="relative flex h-6 items-center whitespace-pre px-3"
                        style={{
                          background: line.active
                            ? tokens["editor.lineHighlightBackground"]
                            : "transparent",
                        }}
                      >
                        {line.chunks.map((chunk, index) => (
                          <span
                            key={`${line.number}-${index}`}
                            style={{
                              color: chunk.key
                                ? tokens[chunk.key]
                                : tokens["editor.foreground"],
                              background:
                                chunk.selection === "primary"
                                  ? tokens["editor.selectionBackground"]
                                  : chunk.selection === "secondary"
                                    ? tokens[
                                        "editor.selectionHighlightBackground"
                                      ]
                                    : "transparent",
                            }}
                          >
                            {chunk.text}
                          </span>
                        ))}
                        {line.active ? (
                          <span
                            className="ml-0.5 h-4 border-l-2"
                            style={{
                              borderColor: tokens["editorCursor.foreground"],
                            }}
                          />
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="border-t"
                  style={{
                    background: tokens["panel.background"],
                    borderColor: tokens["panel.border"],
                  }}
                >
                  <div
                    className="flex h-8 items-center gap-4 border-b px-3 text-[11px] uppercase"
                    style={{ borderColor: tokens["panel.border"] }}
                  >
                    <span
                      style={{ color: tokens["panelTitle.activeForeground"] }}
                    >
                      Problems
                    </span>
                    <span
                      className="opacity-90"
                      style={{ color: tokens["panelTitle.inactiveForeground"] }}
                    >
                      Output
                    </span>
                    <span
                      className="opacity-90"
                      style={{ color: tokens["panelTitle.inactiveForeground"] }}
                    >
                      Terminal
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 px-3 py-2 text-[12px]">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="codicon codicon-error"
                          style={{ color: tokens["editorError.foreground"] }}
                        />
                        <span>
                          Type 'ThemeToken' is not assignable to type 'string'.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="codicon codicon-warning"
                          style={{ color: tokens["editorWarning.foreground"] }}
                        />
                        <span>Unused import: readFile</span>
                      </div>
                    </div>
                    <div
                      className="space-y-1"
                      style={{ fontFamily: editorFontFamily }}
                    >
                      <p>
                        <span style={{ color: tokens["terminal.ansiBlue"] }}>
                          $ pnpm
                        </span>{" "}
                        <span style={{ color: tokens["terminal.ansiGreen"] }}>
                          lint
                        </span>
                      </p>
                      <p style={{ color: tokens["terminal.ansiGreen"] }}>
                        Checked 8 files in 7ms. No fixes applied.
                      </p>
                      <p style={{ color: tokens["terminal.ansiYellow"] }}>
                        warning TS6133: 'readFile' is declared but never read.
                      </p>
                      <p style={{ color: tokens["terminal.ansiRed"] }}>
                        error TS2322: Type 'ThemeToken' is not assignable to
                        type 'string'.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div
              className="flex h-6 items-center justify-between px-2 text-[11px]"
              style={{
                background: tokens["statusBar.background"],
                color: tokens["statusBar.foreground"],
              }}
            >
              <div className="flex items-center gap-3">
                <span className="codicon codicon-source-control" />
                <span>main*</span>
                <span
                  className="inline-flex items-center gap-1 px-1"
                  style={{
                    background: tokens["badge.background"],
                    color: tokens["badge.foreground"],
                  }}
                >
                  <span className="codicon codicon-bell-dot" />3
                </span>
                <span className="codicon codicon-error text-[10px]" />
                <span>1</span>
                <span className="codicon codicon-warning text-[10px]" />
                <span>1</span>
              </div>
              <div className="flex items-center gap-3">
                <span>TypeScript React</span>
                <span>UTF-8</span>
                <span>Ln 11, Col 35</span>
              </div>
            </div>
          </div>
        </section>

        <aside className="max-h-[calc(100vh-96px)] overflow-auto bg-white p-4">
          <h2 className="text-lg font-semibold">Properties</h2>
          <p className="mb-2 text-sm text-slate-600">
            Expanded coverage for workbench, editor UI, diagnostics, terminal,
            and syntax scopes.
          </p>
          <p className="mb-4 text-xs text-slate-500">
            {Object.keys(tokens).length} color tokens currently represented in
            preview + export.
          </p>

          <div className="space-y-5">
            {groups.map((group) => (
              <div key={group.title}>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {group.title}
                </p>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-2 bg-slate-50 px-2 py-2"
                    >
                      <span className="w-40 text-[11px] font-medium text-slate-700">
                        {item.label}
                      </span>
                      <input
                        type="color"
                        value={tokens[item.key]}
                        onChange={(event) =>
                          updateToken(item.key, event.target.value)
                        }
                        className="h-8 w-10 cursor-pointer border border-slate-300 bg-transparent"
                      />
                      <input
                        type="text"
                        value={tokens[item.key]}
                        onChange={(event) =>
                          updateToken(item.key, event.target.value)
                        }
                        className="min-w-0 flex-1 border border-slate-300 bg-white px-2 py-1 text-xs font-mono text-slate-700 outline-none ring-blue-500 transition focus:ring-2"
                      />
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}
