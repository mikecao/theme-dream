"use client";

import { useMemo, useState } from "react";

type TokenKey =
  | "editor.background"
  | "editor.foreground"
  | "activityBar.background"
  | "activityBar.foreground"
  | "sideBar.background"
  | "sideBar.foreground"
  | "titleBar.activeBackground"
  | "titleBar.activeForeground"
  | "statusBar.background"
  | "statusBar.foreground"
  | "terminal.ansiGreen"
  | "terminal.ansiBlue"
  | "syntax.keyword"
  | "syntax.string"
  | "syntax.comment"
  | "syntax.function"
  | "syntax.number"
  | "syntax.variable";

type ThemeTokens = Record<TokenKey, string>;

const defaultTokens: ThemeTokens = {
  "editor.background": "#141922",
  "editor.foreground": "#e8edf8",
  "activityBar.background": "#0f1420",
  "activityBar.foreground": "#8ec5ff",
  "sideBar.background": "#1b2230",
  "sideBar.foreground": "#aeb9d0",
  "titleBar.activeBackground": "#20293b",
  "titleBar.activeForeground": "#f2f6ff",
  "statusBar.background": "#4a8cff",
  "statusBar.foreground": "#ffffff",
  "terminal.ansiGreen": "#89d185",
  "terminal.ansiBlue": "#82c8ff",
  "syntax.keyword": "#ff7ab8",
  "syntax.string": "#f8d76f",
  "syntax.comment": "#7182a8",
  "syntax.function": "#82c8ff",
  "syntax.number": "#ffb86b",
  "syntax.variable": "#d7e1ff",
};

const groups: {
  title: string;
  items: Array<{ key: TokenKey; label: string }>;
}[] = [
  {
    title: "Workbench",
    items: [
      { key: "titleBar.activeBackground", label: "Title Bar" },
      { key: "titleBar.activeForeground", label: "Title Text" },
      { key: "activityBar.background", label: "Activity Bar" },
      { key: "activityBar.foreground", label: "Activity Icon" },
      { key: "sideBar.background", label: "Sidebar" },
      { key: "sideBar.foreground", label: "Sidebar Text" },
      { key: "statusBar.background", label: "Status Bar" },
      { key: "statusBar.foreground", label: "Status Text" },
    ],
  },
  {
    title: "Editor",
    items: [
      { key: "editor.background", label: "Editor BG" },
      { key: "editor.foreground", label: "Editor Text" },
      { key: "terminal.ansiBlue", label: "Selection Accent" },
      { key: "terminal.ansiGreen", label: "Line Highlight" },
    ],
  },
  {
    title: "Syntax",
    items: [
      { key: "syntax.keyword", label: "Keyword" },
      { key: "syntax.string", label: "String" },
      { key: "syntax.comment", label: "Comment" },
      { key: "syntax.function", label: "Function" },
      { key: "syntax.number", label: "Number" },
      { key: "syntax.variable", label: "Variable" },
    ],
  },
];

export default function Home() {
  const [themeName, setThemeName] = useState("Dreamwave");
  const [tokens, setTokens] = useState<ThemeTokens>(defaultTokens);

  const themeJson = useMemo(
    () =>
      JSON.stringify(
        {
          name: themeName || "My Theme",
          type: "dark",
          colors: {
            "editor.background": tokens["editor.background"],
            "editor.foreground": tokens["editor.foreground"],
            "activityBar.background": tokens["activityBar.background"],
            "activityBar.foreground": tokens["activityBar.foreground"],
            "sideBar.background": tokens["sideBar.background"],
            "sideBar.foreground": tokens["sideBar.foreground"],
            "titleBar.activeBackground": tokens["titleBar.activeBackground"],
            "titleBar.activeForeground": tokens["titleBar.activeForeground"],
            "statusBar.background": tokens["statusBar.background"],
            "statusBar.foreground": tokens["statusBar.foreground"],
          },
          tokenColors: [
            {
              name: "Comments",
              scope: ["comment", "punctuation.definition.comment"],
              settings: { foreground: tokens["syntax.comment"] },
            },
            {
              name: "Keywords",
              scope: ["keyword", "storage.type"],
              settings: { foreground: tokens["syntax.keyword"] },
            },
            {
              name: "Strings",
              scope: ["string"],
              settings: { foreground: tokens["syntax.string"] },
            },
            {
              name: "Functions",
              scope: ["entity.name.function", "support.function"],
              settings: { foreground: tokens["syntax.function"] },
            },
            {
              name: "Numbers",
              scope: ["constant.numeric"],
              settings: { foreground: tokens["syntax.number"] },
            },
            {
              name: "Variables",
              scope: ["variable", "identifier"],
              settings: { foreground: tokens["syntax.variable"] },
            },
          ],
        },
        null,
        2,
      ),
    [themeName, tokens],
  );

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
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-slate-900" />
            <div>
              <p className="text-sm font-semibold tracking-wide">Theme Dream</p>
              <p className="text-xs text-slate-500">
                Visual VS Code theme builder
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={themeName}
              onChange={(event) => setThemeName(event.target.value)}
              className="w-44 border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none ring-blue-500 transition focus:ring-2"
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

      <main className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 p-4 lg:grid-cols-[1fr_320px]">
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
              </div>
              <span className="opacity-90">
                {themeName || "My Theme"} - Visual Studio Code
              </span>
              <div className="flex items-center gap-2 opacity-80">
                <span className="codicon codicon-layout" />
                <span className="codicon codicon-bell" />
              </div>
            </div>

            <div className="grid min-h-[620px] grid-cols-[48px_250px_1fr]">
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
                    style={{ background: tokens["activityBar.foreground"] }}
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
                  borderColor: `${tokens["activityBar.background"]}80`,
                }}
              >
                <div
                  className="flex h-9 items-center justify-between border-b px-3 text-[11px]"
                  style={{
                    borderColor: `${tokens["activityBar.background"]}80`,
                  }}
                >
                  <span className="font-semibold uppercase tracking-[0.12em]">
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
                    className="mb-2 flex items-center gap-2 px-2 py-1 text-[12px]"
                    style={{ background: `${tokens["terminal.ansiBlue"]}22` }}
                  >
                    <span className="codicon codicon-file-code" />
                    <span>page.tsx</span>
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
                    <div className="flex items-center gap-2 px-2 py-1">
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
                className="grid grid-rows-[35px_28px_1fr]"
                style={{
                  background: tokens["editor.background"],
                  color: tokens["editor.foreground"],
                }}
              >
                <div
                  className="flex border-b"
                  style={{ borderColor: `${tokens["sideBar.background"]}90` }}
                >
                  <div
                    className="flex h-full items-center gap-2 border-r px-3 text-[12px]"
                    style={{
                      background: `${tokens["activityBar.background"]}80`,
                      borderColor: `${tokens["sideBar.background"]}90`,
                    }}
                  >
                    <span className="codicon codicon-file-code text-[14px]" />
                    <span>page.tsx</span>
                    <span className="opacity-50">*</span>
                  </div>
                </div>

                <div
                  className="flex items-center gap-1 border-b px-3 text-[11px] opacity-75"
                  style={{ borderColor: `${tokens["sideBar.background"]}90` }}
                >
                  <span className="codicon codicon-home" />
                  <span className="codicon codicon-chevron-right text-[10px]" />
                  <span>src</span>
                  <span className="codicon codicon-chevron-right text-[10px]" />
                  <span>app</span>
                  <span className="codicon codicon-chevron-right text-[10px]" />
                  <span className="opacity-100">page.tsx</span>
                </div>

                <div className="grid grid-cols-[52px_1fr_90px]">
                  <div
                    className="border-r py-2 pr-2 text-right text-[12px] leading-6 opacity-50"
                    style={{ borderColor: `${tokens["sideBar.background"]}90` }}
                  >
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                  </div>

                  <div
                    className="py-2 pl-3 pr-2 text-[13px] leading-6"
                    style={{ fontFamily: "Consolas, 'Courier New', monospace" }}
                  >
                    <div>
                      <span style={{ color: tokens["syntax.keyword"] }}>
                        const
                      </span>{" "}
                      <span style={{ color: tokens["syntax.variable"] }}>
                        themeName
                      </span>{" "}
                      ={" "}
                      <span style={{ color: tokens["syntax.string"] }}>
                        &quot;{themeName || "My Theme"}&quot;
                      </span>
                      {";"}
                    </div>
                    <div>
                      <span style={{ color: tokens["syntax.keyword"] }}>
                        export
                      </span>{" "}
                      <span style={{ color: tokens["syntax.keyword"] }}>
                        function
                      </span>{" "}
                      <span style={{ color: tokens["syntax.function"] }}>
                        buildTheme
                      </span>
                      () {"{"}
                    </div>
                    <div style={{ color: tokens["syntax.comment"] }}>
                      {"  // Theme preview tuned to VS Code layout"}
                    </div>
                    <div
                      style={{
                        background: `${tokens["terminal.ansiGreen"]}1a`,
                      }}
                    >
                      <span style={{ color: tokens["syntax.keyword"] }}>
                        {"  return"}
                      </span>
                      <span>{" {"}</span>
                    </div>
                    <div>
                      <span>{"    editorBackground: "}</span>
                      <span style={{ color: tokens["syntax.string"] }}>
                        &quot;{tokens["editor.background"]}&quot;
                      </span>
                      <span>{","}</span>
                    </div>
                    <div>
                      <span>{"    editorForeground: "}</span>
                      <span style={{ color: tokens["syntax.string"] }}>
                        &quot;{tokens["editor.foreground"]}&quot;
                      </span>
                      <span>{","}</span>
                    </div>
                    <div>
                      <span>{"    version: "}</span>
                      <span style={{ color: tokens["syntax.number"] }}>1</span>
                      <span>{","}</span>
                    </div>
                    <div>{"  };"}</div>
                    <div>{"}"}</div>
                    <div>
                      <span style={{ color: tokens["syntax.keyword"] }}>
                        const
                      </span>{" "}
                      <span style={{ color: tokens["syntax.variable"] }}>
                        lineCount
                      </span>{" "}
                      ={" "}
                      <span style={{ color: tokens["syntax.number"] }}>12</span>
                      {";"}
                    </div>
                  </div>

                  <div
                    className="border-l px-3 py-2"
                    style={{ borderColor: `${tokens["sideBar.background"]}90` }}
                  >
                    <div className="space-y-1.5 opacity-70">
                      <div
                        className="h-2"
                        style={{
                          background: `${tokens["terminal.ansiBlue"]}3d`,
                        }}
                      />
                      <div
                        className="h-1.5"
                        style={{ background: `${tokens["syntax.keyword"]}40` }}
                      />
                      <div
                        className="h-1.5"
                        style={{ background: `${tokens["syntax.string"]}40` }}
                      />
                      <div
                        className="h-1.5"
                        style={{ background: `${tokens["syntax.comment"]}40` }}
                      />
                      <div
                        className="h-1.5"
                        style={{ background: `${tokens["syntax.function"]}40` }}
                      />
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
                <span className="codicon codicon-error text-[10px]" />
                <span>0</span>
                <span className="codicon codicon-warning text-[10px]" />
                <span>0</span>
              </div>
              <div className="flex items-center gap-3">
                <span>TypeScript React</span>
                <span>UTF-8</span>
                <span>Ln 8, Col 16</span>
              </div>
            </div>
          </div>
        </section>

        <aside className="max-h-[calc(100vh-96px)] overflow-auto bg-white p-4">
          <h2 className="text-lg font-semibold">Properties</h2>
          <p className="mb-4 text-sm text-slate-600">
            Adjust color tokens and see the preview update live.
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
                      <span className="w-24 text-xs font-medium text-slate-700">
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
