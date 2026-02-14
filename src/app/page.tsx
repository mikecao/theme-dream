"use client";

import { useMemo, useState } from "react";

const defaultTokens = {
  foreground: "#cccccc",
  descriptionForeground: "#9d9d9d",
  errorForeground: "#f48771",
  focusBorder: "#007fd4",
  "menu.foreground": "#cccccc",
  "menu.separatorBackground": "#606060",
  "actionBar.toggledBackground": "#383a49",
  "textBlockQuote.background": "#222222",
  "textBlockQuote.border": "#444444",
  "textLink.foreground": "#3794ff",
  "textPreformat.foreground": "#d7ba7d",
  "walkThrough.embeddedEditorBackground": "#00000050",
  "settings.headerForeground": "#e7e7e7",
  "settings.focusedRowBackground": "#073655",
  "welcomePage.buttonHoverBackground": "#1177bb",
  "titleBar.activeBackground": "#181818",
  "titleBar.activeForeground": "#cccccc",
  "titleBar.inactiveBackground": "#1a1a1a",
  "titleBar.inactiveForeground": "#9d9d9d",
  "statusBar.background": "#007acc",
  "statusBar.foreground": "#ffffff",
  "statusBar.debuggingBackground": "#cc6633",
  "statusBar.debuggingForeground": "#ffffff",
  "statusBar.debuggingBorder": "#00000000",
  "statusBar.noFolderBackground": "#68217a",
  "statusBar.border": "#2b2b2b",
  "statusBarItem.remoteBackground": "#16825d",
  "statusBarItem.remoteForeground": "#ffffff",
  "badge.background": "#4d4d4d",
  "badge.foreground": "#ffffff",
  "activityBar.background": "#181818",
  "activityBar.foreground": "#d4d4d4",
  "activityBar.activeBorder": "#0078d4",
  "activityBarBadge.background": "#007acc",
  "activityBarBadge.foreground": "#ffffff",
  "sideBar.background": "#1f1f1f",
  "sideBar.foreground": "#cccccc",
  "sideBar.border": "#2b2b2b",
  "sideBar.dropBackground": "#383b3d",
  "sideBarTitle.foreground": "#cccccc",
  "sideBarSectionHeader.background": "#252526",
  "sideBarSectionHeader.foreground": "#cccccc",
  "sideBarSectionHeader.border": "#3b3b3b",
  "list.activeSelectionBackground": "#04395e",
  "list.activeSelectionForeground": "#ffffff",
  "list.inactiveSelectionBackground": "#37373d",
  "list.inactiveSelectionForeground": "#cccccc",
  "list.hoverBackground": "#2a2d2e",
  "list.hoverForeground": "#ffffff",
  "list.focusBackground": "#073655",
  "list.focusForeground": "#ffffff",
  "list.highlightForeground": "#2aaaff",
  "list.warningForeground": "#cca700",
  "list.dropBackground": "#383b3d",
  "tree.indentGuidesStroke": "#585858",
  "editorGroupHeader.tabsBackground": "#1f1f1f",
  "editorGroup.border": "#444444",
  "editorGroup.background": "#1e1e1e",
  "tab.activeBackground": "#1e1e1e",
  "tab.activeForeground": "#ffffff",
  "tab.activeBorder": "#0078d4",
  "tab.border": "#252526",
  "tab.inactiveBackground": "#2d2d2d",
  "tab.inactiveForeground": "#969696",
  "tab.hoverBackground": "#1f1f1f",
  "tab.unfocusedHoverBackground": "#2a2d2e",
  "tab.lastPinnedBorder": "#3b3b3b",
  "panel.background": "#181818",
  "panel.border": "#3c3c3c",
  "panelSectionHeader.background": "#181818",
  "panelInput.border": "#80808059",
  "panelTitle.activeBorder": "#0078d4",
  "panelTitle.activeForeground": "#e7e7e7",
  "panelTitle.inactiveForeground": "#969696",
  "peekViewEditor.background": "#001f33",
  "peekViewEditor.matchHighlightBackground": "#ff8f0099",
  "peekViewResult.background": "#252526",
  "diffEditor.insertedTextBackground": "#9ccc2c33",
  "multiDiffEditor.headerBackground": "#2d2d30",
  "gitDecoration.ignoredResourceForeground": "#8c8c8c",
  "debugToolBar.background": "#333333",
  "breadcrumbPicker.background": "#252526",
  "editorWidget.background": "#252526",
  "editorHoverWidget.background": "#252526",
  "editorHoverWidget.border": "#454545",
  "editorHoverWidget.highlightForeground": "#2aaaff",
  "editorSuggestWidget.background": "#252526",
  "editorSuggestWidget.border": "#454545",
  "editorSuggestWidget.selectedBackground": "#04395e",
  "editorMarkerNavigation.background": "#2d2d30",
  "editorInlayHint.background": "#2e2e2e",
  "editorInlayHint.foreground": "#969696",
  "editor.background": "#1e1e1e",
  "editor.foreground": "#d4d4d4",
  "editor.inactiveSelectionBackground": "#3a3d41",
  "editorGutter.background": "#1e1e1e",
  "editorGutter.addedBackground": "#487e02",
  "editorGutter.deletedBackground": "#f14c4c",
  "editorGutter.modifiedBackground": "#0c7d9d",
  "editorLineNumber.foreground": "#858585",
  "editorLineNumber.activeForeground": "#c6c6c6",
  "editorCursor.background": "#000000",
  "editorCursor.foreground": "#aeafad",
  "editor.selectionBackground": "#264f78",
  "editor.selectionHighlightBorder": "#add6ff66",
  "editor.selectionHighlightBackground": "#add6ff26",
  "editor.findMatchBackground": "#515c6a",
  "editor.findMatchHighlightBackground": "#ea5c0055",
  "editor.findMatchBorder": "#457dff",
  "editor.wordHighlightBackground": "#575757b8",
  "editor.wordHighlightStrongBackground": "#004972b8",
  "editor.wordHighlightBorder": "#c8c8c859",
  "editor.wordHighlightStrongBorder": "#c8c8c859",
  "editor.lineHighlightBackground": "#2a2d2e66",
  "editorIndentGuide.background1": "#404040",
  "editorIndentGuide.activeBackground1": "#707070",
  "editorBracketHighlight.foreground1": "#ffd700",
  "editorBracketHighlight.foreground2": "#da70d6",
  "editorBracketHighlight.foreground3": "#179fff",
  "editorBracketMatch.background": "#0064001a",
  "editorBracketMatch.border": "#888888",
  "editorOverviewRuler.border": "#7f7f7f4d",
  "editorOverviewRuler.addedBackground": "#81b88b",
  "editorOverviewRuler.deletedBackground": "#c74e39",
  "editorOverviewRuler.modifiedBackground": "#1b81a8",
  "editorRuler.foreground": "#5a5a5a",
  "editorWhitespace.foreground": "#40404080",
  "editorError.foreground": "#f14c4c",
  "editorWarning.foreground": "#cca700",
  "terminal.background": "#1e1e1e",
  "terminal.foreground": "#cccccc",
  "terminal.border": "#80808059",
  "terminal.selectionBackground": "#264f78",
  "terminal.ansiBlack": "#000000",
  "terminal.ansiBlue": "#569cd6",
  "terminal.ansiCyan": "#29b8db",
  "terminal.ansiGreen": "#6a9955",
  "terminal.ansiMagenta": "#d670d6",
  "terminal.ansiWhite": "#e5e5e5",
  "terminal.ansiYellow": "#dcdcaa",
  "terminal.ansiRed": "#f44747",
  "terminal.ansiBrightBlack": "#666666",
  "terminal.ansiBrightBlue": "#4fc1ff",
  "terminal.ansiBrightCyan": "#4cd1e0",
  "terminal.ansiBrightGreen": "#b5cea8",
  "terminal.ansiBrightMagenta": "#c586c0",
  "terminal.ansiBrightWhite": "#ffffff",
  "terminal.ansiBrightYellow": "#f9f1a5",
  "terminal.ansiBrightRed": "#ff6a6a",
  "minimapGutter.addedBackground": "#81b88b",
  "minimapGutter.deletedBackground": "#c74e39",
  "minimapGutter.modifiedBackground": "#1b81a8",
  "scrollbar.shadow": "#000000",
  "scrollbarSlider.background": "#79797966",
  "scrollbarSlider.hoverBackground": "#646464b3",
  "scrollbarSlider.activeBackground": "#bfbfbf66",
  "input.background": "#3c3c3c",
  "input.foreground": "#cccccc",
  "input.placeholderForeground": "#989898",
  "dropdown.background": "#3c3c3c",
  "dropdown.border": "#3c3c3c",
  "checkbox.border": "#6b6b6b",
  "button.background": "#0e639c",
  "button.secondaryBackground": "#3a3d41",
  "button.secondaryForeground": "#ffffff",
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
    title: "Global, Menu & Text",
    items: [
      { key: "foreground", label: "Foreground" },
      { key: "descriptionForeground", label: "Description" },
      { key: "errorForeground", label: "Error Text" },
      { key: "focusBorder", label: "Focus Border" },
      { key: "menu.foreground", label: "Menu Text" },
      { key: "menu.separatorBackground", label: "Menu Separator" },
      { key: "actionBar.toggledBackground", label: "Action Toggled" },
      { key: "textBlockQuote.background", label: "Quote BG" },
      { key: "textBlockQuote.border", label: "Quote Border" },
      { key: "textLink.foreground", label: "Text Link" },
      { key: "textPreformat.foreground", label: "Preformat" },
      {
        key: "walkThrough.embeddedEditorBackground",
        label: "Walkthrough BG",
      },
      { key: "settings.headerForeground", label: "Settings Header" },
      { key: "settings.focusedRowBackground", label: "Settings Focus" },
      { key: "welcomePage.buttonHoverBackground", label: "Welcome Hover" },
    ],
  },
  {
    title: "Window & Status",
    items: [
      { key: "titleBar.activeBackground", label: "Title Bar BG" },
      { key: "titleBar.activeForeground", label: "Title Bar FG" },
      { key: "titleBar.inactiveBackground", label: "Title Inactive BG" },
      { key: "titleBar.inactiveForeground", label: "Title Inactive FG" },
      { key: "statusBar.background", label: "Status Bar BG" },
      { key: "statusBar.foreground", label: "Status Bar FG" },
      {
        key: "statusBar.debuggingBackground",
        label: "Status Debug BG",
      },
      {
        key: "statusBar.debuggingForeground",
        label: "Status Debug FG",
      },
      { key: "statusBar.debuggingBorder", label: "Status Debug Border" },
      { key: "statusBar.noFolderBackground", label: "Status NoFolder" },
      { key: "statusBar.border", label: "Status Border" },
      { key: "statusBarItem.remoteBackground", label: "Remote BG" },
      { key: "statusBarItem.remoteForeground", label: "Remote FG" },
      { key: "badge.background", label: "Badge BG" },
      { key: "badge.foreground", label: "Badge FG" },
      { key: "activityBarBadge.background", label: "Activity Badge BG" },
      { key: "activityBarBadge.foreground", label: "Activity Badge FG" },
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
      { key: "sideBar.dropBackground", label: "Sidebar Drop" },
      { key: "sideBarTitle.foreground", label: "Sidebar Title" },
      {
        key: "sideBarSectionHeader.background",
        label: "Section Header BG",
      },
      {
        key: "sideBarSectionHeader.foreground",
        label: "Section Header FG",
      },
      {
        key: "sideBarSectionHeader.border",
        label: "Section Header Border",
      },
      { key: "tree.indentGuidesStroke", label: "Tree Indent" },
    ],
  },
  {
    title: "List States",
    items: [
      { key: "list.activeSelectionBackground", label: "List Active BG" },
      { key: "list.activeSelectionForeground", label: "List Active FG" },
      {
        key: "list.inactiveSelectionBackground",
        label: "List Inactive BG",
      },
      {
        key: "list.inactiveSelectionForeground",
        label: "List Inactive FG",
      },
      { key: "list.hoverBackground", label: "List Hover BG" },
      { key: "list.hoverForeground", label: "List Hover FG" },
      { key: "list.focusBackground", label: "List Focus BG" },
      { key: "list.focusForeground", label: "List Focus FG" },
      { key: "list.highlightForeground", label: "List Highlight" },
      { key: "list.warningForeground", label: "List Warning" },
      { key: "list.dropBackground", label: "List Drop" },
    ],
  },
  {
    title: "Tabs & Editor Groups",
    items: [
      {
        key: "editorGroupHeader.tabsBackground",
        label: "Tabs Strip BG",
      },
      { key: "editorGroup.border", label: "Group Border" },
      { key: "editorGroup.background", label: "Group BG" },
      { key: "tab.activeBackground", label: "Active Tab BG" },
      { key: "tab.activeForeground", label: "Active Tab FG" },
      { key: "tab.activeBorder", label: "Active Tab Border" },
      { key: "tab.border", label: "Tab Border" },
      { key: "tab.inactiveBackground", label: "Inactive Tab BG" },
      { key: "tab.inactiveForeground", label: "Inactive Tab FG" },
      { key: "tab.hoverBackground", label: "Tab Hover BG" },
      { key: "tab.unfocusedHoverBackground", label: "Tab Unfocused Hover" },
      { key: "tab.lastPinnedBorder", label: "Last Pinned Border" },
    ],
  },
  {
    title: "Panel, Peek & Diff",
    items: [
      { key: "panel.background", label: "Panel BG" },
      { key: "panel.border", label: "Panel Border" },
      { key: "panelSectionHeader.background", label: "Section Header BG" },
      { key: "panelInput.border", label: "Panel Input Border" },
      { key: "panelTitle.activeBorder", label: "Active Title Border" },
      { key: "panelTitle.activeForeground", label: "Panel Active Title" },
      {
        key: "panelTitle.inactiveForeground",
        label: "Panel Inactive Title",
      },
      { key: "peekViewEditor.background", label: "Peek Editor BG" },
      {
        key: "peekViewEditor.matchHighlightBackground",
        label: "Peek Match",
      },
      { key: "peekViewResult.background", label: "Peek Result BG" },
      { key: "diffEditor.insertedTextBackground", label: "Diff Inserted" },
      { key: "multiDiffEditor.headerBackground", label: "MultiDiff Header" },
      {
        key: "gitDecoration.ignoredResourceForeground",
        label: "Git Ignored",
      },
      { key: "debugToolBar.background", label: "Debug Toolbar" },
      { key: "breadcrumbPicker.background", label: "Breadcrumb Picker" },
    ],
  },
  {
    title: "Editor Core",
    items: [
      { key: "editor.background", label: "Editor BG" },
      { key: "editor.foreground", label: "Editor FG" },
      {
        key: "editor.inactiveSelectionBackground",
        label: "Inactive Selection",
      },
      { key: "editorGutter.background", label: "Gutter BG" },
      { key: "editorGutter.addedBackground", label: "Gutter Added" },
      { key: "editorGutter.deletedBackground", label: "Gutter Deleted" },
      { key: "editorGutter.modifiedBackground", label: "Gutter Modified" },
      { key: "editorLineNumber.foreground", label: "Line Number" },
      { key: "editorLineNumber.activeForeground", label: "Active Line #" },
      { key: "editorCursor.background", label: "Cursor BG" },
      { key: "editorCursor.foreground", label: "Cursor" },
      { key: "editor.selectionBackground", label: "Selection BG" },
      {
        key: "editor.selectionHighlightBackground",
        label: "Selection Match",
      },
      {
        key: "editor.selectionHighlightBorder",
        label: "Selection Border",
      },
      { key: "editor.lineHighlightBackground", label: "Line Highlight" },
      {
        key: "editorIndentGuide.background1",
        label: "Indent Guides",
      },
      {
        key: "editorIndentGuide.activeBackground1",
        label: "Active Indent",
      },
      { key: "editorRuler.foreground", label: "Ruler" },
      { key: "editorWhitespace.foreground", label: "Whitespace" },
    ],
  },
  {
    title: "Editor Search, Brackets & Overview",
    items: [
      { key: "editor.findMatchBackground", label: "Find Match" },
      { key: "editor.findMatchHighlightBackground", label: "Find Others" },
      { key: "editor.findMatchBorder", label: "Find Border" },
      { key: "editor.wordHighlightBackground", label: "Word Highlight" },
      {
        key: "editor.wordHighlightStrongBackground",
        label: "Word Highlight Strong",
      },
      { key: "editor.wordHighlightBorder", label: "Word Border" },
      {
        key: "editor.wordHighlightStrongBorder",
        label: "Word Strong Border",
      },
      {
        key: "editorBracketHighlight.foreground1",
        label: "Bracket Color 1",
      },
      {
        key: "editorBracketHighlight.foreground2",
        label: "Bracket Color 2",
      },
      {
        key: "editorBracketHighlight.foreground3",
        label: "Bracket Color 3",
      },
      { key: "editorBracketMatch.background", label: "Bracket Match BG" },
      { key: "editorBracketMatch.border", label: "Bracket Match Border" },
      {
        key: "editorOverviewRuler.addedBackground",
        label: "Overview Added",
      },
      {
        key: "editorOverviewRuler.deletedBackground",
        label: "Overview Deleted",
      },
      {
        key: "editorOverviewRuler.modifiedBackground",
        label: "Overview Modified",
      },
      { key: "editorOverviewRuler.border", label: "Overview Border" },
      {
        key: "minimapGutter.addedBackground",
        label: "Minimap Added",
      },
      {
        key: "minimapGutter.deletedBackground",
        label: "Minimap Deleted",
      },
      {
        key: "minimapGutter.modifiedBackground",
        label: "Minimap Modified",
      },
      { key: "editorError.foreground", label: "Error" },
      { key: "editorWarning.foreground", label: "Warning" },
    ],
  },
  {
    title: "Widgets & Inputs",
    items: [
      { key: "editorWidget.background", label: "Editor Widget" },
      { key: "editorHoverWidget.background", label: "Hover BG" },
      { key: "editorHoverWidget.border", label: "Hover Border" },
      {
        key: "editorHoverWidget.highlightForeground",
        label: "Hover Highlight",
      },
      { key: "editorSuggestWidget.background", label: "Suggest BG" },
      { key: "editorSuggestWidget.border", label: "Suggest Border" },
      {
        key: "editorSuggestWidget.selectedBackground",
        label: "Suggest Selected",
      },
      { key: "editorMarkerNavigation.background", label: "Marker Nav BG" },
      { key: "editorInlayHint.background", label: "Inlay Hint BG" },
      { key: "editorInlayHint.foreground", label: "Inlay Hint FG" },
      { key: "input.background", label: "Input BG" },
      { key: "input.foreground", label: "Input FG" },
      { key: "input.placeholderForeground", label: "Input Placeholder" },
      { key: "dropdown.background", label: "Dropdown BG" },
      { key: "dropdown.border", label: "Dropdown Border" },
      { key: "checkbox.border", label: "Checkbox Border" },
      { key: "button.background", label: "Button BG" },
      { key: "button.secondaryBackground", label: "Secondary Button BG" },
      { key: "button.secondaryForeground", label: "Secondary Button FG" },
    ],
  },
  {
    title: "Terminal & Scrollbars",
    items: [
      { key: "terminal.background", label: "Terminal BG" },
      { key: "terminal.foreground", label: "Terminal FG" },
      { key: "terminal.border", label: "Terminal Border" },
      { key: "terminal.selectionBackground", label: "Terminal Selection" },
      { key: "terminal.ansiBlack", label: "ANSI Black" },
      { key: "terminal.ansiBlue", label: "Terminal Blue" },
      { key: "terminal.ansiCyan", label: "ANSI Cyan" },
      { key: "terminal.ansiGreen", label: "Terminal Green" },
      { key: "terminal.ansiMagenta", label: "ANSI Magenta" },
      { key: "terminal.ansiWhite", label: "ANSI White" },
      { key: "terminal.ansiYellow", label: "Terminal Yellow" },
      { key: "terminal.ansiRed", label: "Terminal Red" },
      { key: "terminal.ansiBrightBlack", label: "Bright Black" },
      { key: "terminal.ansiBrightBlue", label: "Bright Blue" },
      { key: "terminal.ansiBrightCyan", label: "Bright Cyan" },
      { key: "terminal.ansiBrightGreen", label: "Bright Green" },
      { key: "terminal.ansiBrightMagenta", label: "Bright Magenta" },
      { key: "terminal.ansiBrightWhite", label: "Bright White" },
      { key: "terminal.ansiBrightYellow", label: "Bright Yellow" },
      { key: "terminal.ansiBrightRed", label: "Bright Red" },
      { key: "scrollbar.shadow", label: "Scrollbar Shadow" },
      { key: "scrollbarSlider.background", label: "Slider BG" },
      { key: "scrollbarSlider.hoverBackground", label: "Slider Hover" },
      { key: "scrollbarSlider.activeBackground", label: "Slider Active" },
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
      <nav className="sticky top-0 z-20 rounded-sm border-b border-slate-200 bg-white px-4 py-3">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-sm border border-slate-300 bg-[linear-gradient(135deg,#1f2937_0%,#334155_60%,#0f172a_100%)] text-[11px] font-semibold text-white">
              <span className="relative z-10">TD</span>
              <span className="absolute -right-1 -top-1 h-3 w-3 bg-sky-400/70 blur-[2px]" />
            </div>
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
              className="w-56 rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none ring-blue-500 transition focus:ring-2"
              placeholder="Theme name"
            />
            <button
              type="button"
              onClick={() => setTokens(defaultTokens)}
              className="rounded-sm border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={exportTheme}
              className="rounded-sm bg-slate-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Export JSON
            </button>
          </div>
        </div>
      </nav>

      <main className="grid w-full grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_320px] lg:gap-0 lg:p-0">
        <section className="w-full max-w-[1400px] rounded-sm p-4 lg:justify-self-center lg:p-6">
          <div
            className="overflow-hidden rounded-sm [&_*]:rounded-none"
            style={{ fontFamily: "Segoe WPC, Segoe UI, sans-serif" }}
          >
            <div
              className="flex h-8 items-center justify-between px-2 text-[11px]"
              style={{
                background: tokens["titleBar.activeBackground"],
                color: tokens["titleBar.activeForeground"],
              }}
            >
              <div
                className="flex items-center gap-2"
                style={{ color: tokens["menu.foreground"] }}
              >
                <span className="inline-block h-2.5 w-2.5 !rounded-full bg-[#ff5f57]" />
                <span className="inline-block h-2.5 w-2.5 !rounded-full bg-[#febc2e]" />
                <span className="inline-block h-2.5 w-2.5 !rounded-full bg-[#28c840]" />
                <span className="ml-2 opacity-80">File</span>
                <span
                  className="h-3 w-px"
                  style={{ background: tokens["menu.separatorBackground"] }}
                />
                <span className="opacity-80">Edit</span>
                <span className="opacity-80">Selection</span>
                <span
                  className="h-3 w-px"
                  style={{ background: tokens["menu.separatorBackground"] }}
                />
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
                <div className="relative mt-4">
                  <span className="codicon codicon-extensions text-[22px] opacity-70" />
                  <span
                    className="absolute -right-1 -top-1 inline-flex h-3 min-w-3 items-center justify-center px-0.5 text-[9px]"
                    style={{
                      background: tokens["activityBarBadge.background"],
                      color: tokens["activityBarBadge.foreground"],
                    }}
                  >
                    2
                  </span>
                </div>
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
                      color: tokens["list.inactiveSelectionForeground"],
                    }}
                  >
                    <span className="codicon codicon-file-code" />
                    <span>tokens.ts</span>
                  </div>
                  <p className="mb-1 mt-3 text-[11px] uppercase opacity-60">
                    Theme Dream
                  </p>
                  <div className="space-y-0.5">
                    <div
                      className="flex items-center gap-2 px-2 py-1"
                      style={{
                        background: tokens["list.focusBackground"],
                        color: tokens["list.focusForeground"],
                      }}
                    >
                      <span className="codicon codicon-chevron-down text-[10px] opacity-70" />
                      <span className="codicon codicon-folder text-[14px]" />
                      <span>src</span>
                    </div>
                    <div
                      className="flex items-center gap-2 px-2 py-1"
                      style={{
                        background: tokens["list.hoverBackground"],
                        color: tokens["list.hoverForeground"],
                      }}
                    >
                      <span
                        className="ml-4 border-l pl-1 codicon codicon-chevron-down text-[10px] opacity-70"
                        style={{
                          borderColor: tokens["tree.indentGuidesStroke"],
                        }}
                      />
                      <span className="codicon codicon-folder text-[14px]" />
                      <span>app</span>
                    </div>
                    <div
                      className="flex items-center gap-2 px-2 py-1"
                      style={{ color: tokens["list.highlightForeground"] }}
                    >
                      <span
                        className="ml-8 border-l pl-1 codicon codicon-file-code text-[14px]"
                        style={{
                          borderColor: tokens["tree.indentGuidesStroke"],
                        }}
                      />
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
                    <div
                      className="mt-1 flex items-center gap-2 px-2 py-1"
                      style={{ background: tokens["list.dropBackground"] }}
                    >
                      <span
                        className="codicon codicon-warning"
                        style={{ color: tokens["list.warningForeground"] }}
                      />
                      <span>drop target</span>
                    </div>
                  </div>
                </div>
              </aside>

              <section
                className="grid grid-rows-[35px_28px_1fr_176px]"
                style={{
                  background: tokens["editorGroup.background"],
                  color: tokens["editor.foreground"],
                }}
              >
                <div
                  className="flex border-b"
                  style={{
                    borderColor: tokens["editorGroup.border"],
                    background: tokens["editorGroupHeader.tabsBackground"],
                  }}
                >
                  <div
                    className="flex h-full items-center gap-2 border-r border-t-2 px-3 text-[12px]"
                    style={{
                      background: tokens["tab.activeBackground"],
                      color: tokens["tab.activeForeground"],
                      borderColor: tokens["tab.border"],
                      borderTopColor: tokens["tab.activeBorder"],
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
                      borderColor: tokens["tab.border"],
                    }}
                  >
                    <span className="codicon codicon-file-code text-[14px]" />
                    <span>tokens.ts</span>
                  </div>
                  <div
                    className="flex h-full items-center border-r px-3 text-[12px]"
                    style={{
                      background: tokens["tab.hoverBackground"],
                      borderColor: tokens["tab.lastPinnedBorder"],
                    }}
                  >
                    hover.ts
                  </div>
                  <div
                    className="flex h-full items-center px-3 text-[12px]"
                    style={{
                      background: tokens["tab.unfocusedHoverBackground"],
                    }}
                  >
                    unfocused.ts
                  </div>
                </div>

                <div
                  className="flex items-center gap-1 border-b px-3 text-[11px] opacity-80"
                  style={{ borderColor: tokens["editorGroup.border"] }}
                >
                  <span className="codicon codicon-home" />
                  <span className="codicon codicon-chevron-right text-[10px]" />
                  <span>src</span>
                  <span className="codicon codicon-chevron-right text-[10px]" />
                  <span>app</span>
                  <span className="codicon codicon-chevron-right text-[10px]" />
                  <span className="opacity-100">theme-preview.tsx</span>
                  <span
                    className="ml-2 px-1 py-0.5 text-[10px]"
                    style={{
                      background: tokens["breadcrumbPicker.background"],
                    }}
                  >
                    picker
                  </span>
                </div>

                <div className="grid grid-cols-[56px_1fr]">
                  <div
                    className="border-r py-2 pr-2 text-right text-[12px] leading-6"
                    style={{
                      borderColor: tokens["editorGroup.border"],
                      background: tokens["editorGutter.background"],
                    }}
                  >
                    {codeLines.map((line) => (
                      <div
                        key={line.number}
                        className="relative"
                        style={{
                          color: line.active
                            ? tokens["editorLineNumber.activeForeground"]
                            : tokens["editorLineNumber.foreground"],
                        }}
                      >
                        {line.number === 9 ? (
                          <span
                            className="absolute left-0 top-1.5 h-3 w-0.5"
                            style={{
                              background:
                                tokens["editorGutter.addedBackground"],
                            }}
                          />
                        ) : null}
                        {line.number === 10 ? (
                          <span
                            className="absolute left-0 top-1.5 h-3 w-0.5"
                            style={{
                              background:
                                tokens["editorGutter.modifiedBackground"],
                            }}
                          />
                        ) : null}
                        {line.number === 11 ? (
                          <span
                            className="absolute left-0 top-1.5 h-3 w-0.5"
                            style={{
                              background:
                                tokens["editorGutter.deletedBackground"],
                            }}
                          />
                        ) : null}
                        <p>{line.number}</p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="relative py-2 pr-2 text-[13px] leading-6"
                    style={{
                      fontFamily: editorFontFamily,
                      background: tokens["editor.background"],
                    }}
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
                            : line.number === 10
                              ? tokens["editor.findMatchBackground"]
                              : line.number === 12
                                ? tokens["editor.findMatchHighlightBackground"]
                                : line.number === 14
                                  ? tokens["editor.wordHighlightBackground"]
                                  : line.number === 15
                                    ? tokens[
                                        "editor.wordHighlightStrongBackground"
                                      ]
                                    : "transparent",
                          border:
                            line.number === 10
                              ? `1px solid ${tokens["editor.findMatchBorder"]}`
                              : line.number === 14
                                ? `1px solid ${tokens["editor.wordHighlightBorder"]}`
                                : line.number === 15
                                  ? `1px solid ${tokens["editor.wordHighlightStrongBorder"]}`
                                  : "none",
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

                    <div className="mt-1 flex items-center gap-1 px-3 text-[11px]">
                      <span
                        style={{
                          color: tokens["editorBracketHighlight.foreground1"],
                        }}
                      >
                        (
                      </span>
                      <span
                        style={{
                          color: tokens["editorBracketHighlight.foreground2"],
                        }}
                      >
                        [
                      </span>
                      <span
                        style={{
                          color: tokens["editorBracketHighlight.foreground3"],
                        }}
                      >
                        {"{"}
                      </span>
                      <span
                        className="px-1"
                        style={{
                          background: tokens["editorBracketMatch.background"],
                          border: `1px solid ${tokens["editorBracketMatch.border"]}`,
                        }}
                      >
                        matched pair
                      </span>
                      <span
                        style={{
                          color: tokens["editorBracketHighlight.foreground3"],
                        }}
                      >
                        {"}"}
                      </span>
                      <span
                        style={{
                          color: tokens["editorBracketHighlight.foreground2"],
                        }}
                      >
                        ]
                      </span>
                      <span
                        style={{
                          color: tokens["editorBracketHighlight.foreground1"],
                        }}
                      >
                        )
                      </span>
                    </div>

                    <div
                      className="pointer-events-none absolute bottom-2 right-0.5 top-2 w-2 border-l"
                      style={{
                        borderColor: tokens["editorOverviewRuler.border"],
                        background: tokens["scrollbar.shadow"],
                      }}
                    >
                      <span
                        className="absolute left-0 top-8 h-1 w-full"
                        style={{
                          background:
                            tokens["editorOverviewRuler.addedBackground"],
                        }}
                      />
                      <span
                        className="absolute left-0 top-14 h-1 w-full"
                        style={{
                          background:
                            tokens["editorOverviewRuler.modifiedBackground"],
                        }}
                      />
                      <span
                        className="absolute left-0 top-20 h-1 w-full"
                        style={{
                          background:
                            tokens["editorOverviewRuler.deletedBackground"],
                        }}
                      />
                      <span
                        className="absolute left-0 top-11 h-1 w-full"
                        style={{
                          background: tokens["minimapGutter.addedBackground"],
                        }}
                      />
                      <span
                        className="absolute left-0 top-[68px] h-1 w-full"
                        style={{
                          background:
                            tokens["minimapGutter.modifiedBackground"],
                        }}
                      />
                      <span
                        className="absolute left-0 top-[92px] h-1 w-full"
                        style={{
                          background: tokens["minimapGutter.deletedBackground"],
                        }}
                      />
                      <span
                        className="absolute left-0 right-0 top-4 h-8"
                        style={{
                          background: tokens["scrollbarSlider.background"],
                        }}
                      />
                      <span
                        className="absolute left-0 right-0 top-14 h-8"
                        style={{
                          background: tokens["scrollbarSlider.hoverBackground"],
                        }}
                      />
                      <span
                        className="absolute left-0 right-0 top-24 h-8"
                        style={{
                          background:
                            tokens["scrollbarSlider.activeBackground"],
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="overflow-hidden border-t"
                  style={{
                    background: tokens["panel.background"],
                    borderColor: tokens["panel.border"],
                  }}
                >
                  <div
                    className="flex h-8 items-center gap-4 border-b px-3 text-[11px] uppercase"
                    style={{
                      borderColor: tokens["panel.border"],
                      background: tokens["panelSectionHeader.background"],
                    }}
                  >
                    <span
                      className="border-b pb-0.5"
                      style={{
                        color: tokens["panelTitle.activeForeground"],
                        borderColor: tokens["panelTitle.activeBorder"],
                      }}
                    >
                      Problems
                    </span>
                    <span
                      className="opacity-90"
                      style={{ color: tokens["panelTitle.activeForeground"] }}
                    >
                      Peek
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
                  <div className="grid grid-cols-1 gap-3 overflow-hidden px-3 py-2 text-[12px] md:grid-cols-3">
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
                      <div
                        className="mt-2 border px-2 py-1"
                        style={{
                          background: tokens["peekViewEditor.background"],
                          borderColor: tokens["panel.border"],
                        }}
                      >
                        <p
                          className="inline-block px-1"
                          style={{
                            background:
                              tokens["peekViewEditor.matchHighlightBackground"],
                          }}
                        >
                          match token
                        </p>
                        <p
                          className="mt-1"
                          style={{
                            color:
                              tokens["gitDecoration.ignoredResourceForeground"],
                          }}
                        >
                          ignored: .cache/theme.tmp
                        </p>
                      </div>
                      <div
                        className="px-2 py-1"
                        style={{
                          background: tokens["peekViewResult.background"],
                        }}
                      >
                        peek result list
                      </div>
                      <div
                        className="px-2 py-1"
                        style={{
                          background:
                            tokens["diffEditor.insertedTextBackground"],
                        }}
                      >
                        + inserted color mapping
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
                      <p>
                        <span style={{ color: tokens["terminal.ansiMagenta"] }}>
                          magenta
                        </span>{" "}
                        <span style={{ color: tokens["terminal.ansiCyan"] }}>
                          cyan
                        </span>{" "}
                        <span style={{ color: tokens["terminal.ansiWhite"] }}>
                          white
                        </span>{" "}
                        <span
                          style={{ color: tokens["terminal.ansiBrightYellow"] }}
                        >
                          bright-yellow
                        </span>
                      </p>
                    </div>
                    <div
                      className="space-y-2 border p-2"
                      style={{
                        background: tokens["editorWidget.background"],
                        borderColor: tokens["panelInput.border"],
                      }}
                    >
                      <p style={{ color: tokens["settings.headerForeground"] }}>
                        Widget Surface
                      </p>
                      <div
                        className="border-l-2 px-2 py-1"
                        style={{
                          background: tokens["textBlockQuote.background"],
                          borderColor: tokens["textBlockQuote.border"],
                        }}
                      >
                        <span
                          style={{ color: tokens["textPreformat.foreground"] }}
                        >
                          --watch
                        </span>{" "}
                        <span style={{ color: tokens["textLink.foreground"] }}>
                          docs link
                        </span>
                      </div>
                      <div
                        className="border px-2 py-1"
                        style={{
                          background: tokens["input.background"],
                          borderColor: tokens.focusBorder,
                          color: tokens["input.foreground"],
                        }}
                      >
                        {tokens["input.placeholderForeground"]} placeholder
                      </div>
                      <div
                        className="border px-2 py-1"
                        style={{
                          background: tokens["dropdown.background"],
                          borderColor: tokens["dropdown.border"],
                        }}
                      >
                        Dropdown
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="px-2 py-1 text-[11px]"
                          style={{
                            background: tokens["button.background"],
                            color: tokens.foreground,
                          }}
                        >
                          Primary
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 text-[11px]"
                          style={{
                            background: tokens["button.secondaryBackground"],
                            color: tokens["button.secondaryForeground"],
                          }}
                        >
                          Secondary
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 border"
                          style={{ borderColor: tokens["checkbox.border"] }}
                        />
                        <span
                          className="px-1 py-0.5"
                          style={{
                            background: tokens["actionBar.toggledBackground"],
                            color: tokens.descriptionForeground,
                          }}
                        >
                          toggled action
                        </span>
                      </div>
                      <p
                        style={{
                          background:
                            tokens["welcomePage.buttonHoverBackground"],
                          color: tokens.foreground,
                        }}
                        className="inline-block px-2 py-0.5"
                      >
                        hover preview
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div
              className="relative z-10 flex h-6 items-center justify-between border-t px-2 text-[11px]"
              style={{
                background: tokens["statusBar.background"],
                color: tokens["statusBar.foreground"],
                borderColor: tokens["statusBar.border"],
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
                <span
                  className="px-1"
                  style={{
                    background: tokens["statusBarItem.remoteBackground"],
                    color: tokens["statusBarItem.remoteForeground"],
                  }}
                >
                  SSH: theme-dev
                </span>
                <span
                  className="px-1"
                  style={{
                    background: tokens["statusBar.debuggingBackground"],
                    color: tokens["statusBar.debuggingForeground"],
                    border: `1px solid ${tokens["statusBar.debuggingBorder"]}`,
                  }}
                >
                  debug
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="px-1"
                  style={{ background: tokens["statusBar.noFolderBackground"] }}
                >
                  no-folder mode
                </span>
                <span>TypeScript React</span>
                <span>UTF-8</span>
                <span>Ln 11, Col 35</span>
              </div>
            </div>
          </div>
        </section>

        <aside className="h-[calc(100vh-61px)] overflow-auto border-l border-slate-200 bg-slate-50 p-4">
          <h2 className="text-lg font-semibold">Properties</h2>
          <p className="mb-2 text-sm text-slate-600">
            Expanded coverage for workbench, editor UI, diagnostics, terminal,
            and syntax scopes.
          </p>
          <p className="mb-4 text-xs text-slate-500">
            {Object.keys(tokens).length} color tokens currently available for
            customization + export.
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
                      className="flex items-center gap-2 rounded-sm px-2 py-2"
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
                        className="h-8 w-10 cursor-pointer rounded-sm bg-transparent"
                      />
                      <input
                        type="text"
                        value={tokens[item.key]}
                        onChange={(event) =>
                          updateToken(item.key, event.target.value)
                        }
                        className="min-w-0 flex-1 rounded-sm border border-slate-300 bg-white px-2 py-1 text-xs font-mono text-slate-700 outline-none ring-blue-500 transition focus:ring-2"
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
