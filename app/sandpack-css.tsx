"use client"

import { getSandpackCssText } from "@codesandbox/sandpack-react"
import { useServerInsertedHTML } from "next/navigation"

export const SandPackCSS = () => {
  const css = `
    .cm-scroller {
      padding: var(--post-padding) 0 !important;
    }
    .cm-content {
      padding: 0 var(--post-padding) !important;
    }
    .sp-pre-placeholder {
      padding: var(--post-padding) 0 !important;
      margin-left: var(--post-padding) !important;
    }
    .cm-line {
      padding-left: 0 !important;
    }
    .sp-wrapper {
      margin: 1.25rem calc(var(--post-padding) * -1);
      grid-column: 1 / -1 !important;
      --sp-transitions-default: none;
      /* GitHub Light */
      --keyword: #d73a49;
      --property: #005cc5;
      --plain: #24292e;
      --static: #032f62;
      --string: #032f62;
      --definition: #6f42c1;
      --punctuation: #24292e;
      --tag: #22863a;
      --comment: #6a737d;
      /* Grubber */
      @media (prefers-color-scheme: dark) {
        --keyword: #ffdd33;
        --tag: #ffdd33;
        --punctuation: #94b0a6;
        --definition: #949bb0;
        --property: #d4d4d4;
        --static: #d4d4d4;
        --string: #79bf46;
        --plain: #d4d4d4;
        --comment: #757575;
      }
    }
    .sp-layout {
      border-radius: 0;
      border: 0;
    }
    .sp-preview {
      border-width: 1px 1px 1px 0;
      border-color: hsl(var(--codeblock-background));
    }
    a[title^="Open in CodeSandbox"] {
      padding: 0 !important;
      width: 28px;
      height: 28px;
      & > span {
        display: none;
      }
    }
  `

  useServerInsertedHTML(() => {
    return (
      <style
        dangerouslySetInnerHTML={{ __html: getSandpackCssText() + css }}
        id="sandpack"
      />
    )
  })
  return null
}
