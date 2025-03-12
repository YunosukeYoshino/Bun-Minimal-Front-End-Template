import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import { Window, Document } from "happy-dom";
import {
  addButtonClass,
  toggleElementVisibility,
  handleClickEvent,
} from "../scripts/domUtils";

// DOM環境のセットアップ
const window = new Window();
const document = window.document;

describe("DOM操作ユーティリティテスト", () => {
  let testElement: HTMLElement;

  beforeEach(() => {
    testElement = document.createElement("div");
    document.body.appendChild(testElement);
  });

  afterEach(() => {
    document.body.removeChild(testElement);
  });

  test("addButtonClassでクラスが追加される", () => {
    addButtonClass(testElement, "active");
    expect(testElement.classList.contains("active")).toBe(true);
  });

  test("toggleElementVisibilityで表示状態が切り替わる", () => {
    toggleElementVisibility(testElement);
    expect(testElement.style.display).toBe("none");

    toggleElementVisibility(testElement);
    expect(testElement.style.display).toBe("block");
  });

  test("handleClickEventでクリックイベントが発火する", () => {
    let clicked = false;
    handleClickEvent(testElement, () => {
      clicked = true;
    });

    testElement.click();
    expect(clicked).toBe(true);
  });
});
