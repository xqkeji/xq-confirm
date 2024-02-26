/*!
 * xq-confirm v1.0.10 (https://xqkeji.cn/demo/xq-confirm)
 * Author xqkeji.cn
 * LICENSE SSPL-1.0
 * Copyright 2024 xqkeji.cn
 */
 import { append } from 'xq-util';

const template = '<div id="xq-bs-modal" class="modal" tabindex="-1" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h5 class="modal-title"><i></i><span>title</span></h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body"><p>Modal content.</p></div><div class="modal-footer"></div></div></div></div>';
const DEFAULT_OPTIONS = {
  id: "xq-bs-modal",
  type: "alert",
  size: "modal-sm",
  position: "modal-dialog-centered",
  template,
  title: "\u63D0\u793A\u4FE1\u606F",
  content: "\u60A8\u786E\u8BA4\u8981\u8FDB\u884C\u64CD\u4F5C\u5417?",
  icon: "info",
  confirmButton: "\u786E\u8BA4",
  cancelButton: "\u53D6\u6D88",
  confirmButtonClass: "btn-primary",
  cancelButtonClass: "btn-secondary",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  confirm: () => {
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  cancel: () => {
  },
  backgroundDismiss: true,
  autoClose: false
  // confirm|3000表示3秒后自动确认，cancel|3000表示3秒后自动取消
};
let confirmOptions = {};
const setOption = (options = {}) => {
  confirmOptions = Object.assign({}, DEFAULT_OPTIONS);
  if (options) {
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(confirmOptions, option)) {
        confirmOptions[option] = options[option];
      }
    }
  }
};
const getOption = (key) => {
  if (key in confirmOptions) {
    return confirmOptions[key];
  }
  const id = confirmOptions["id"];
  const modal = document.querySelector("#" + id);
  if (modal.hasAttribute(key)) {
    return String(modal.getAttribute(key));
  }
  return "";
};

const ICONS = {
  info: "bi bi-info-circle-fill link-primary",
  warn: "bi bi-info-circle-fill link-warning",
  error: "bi bi-info-circle-fill link-danger"
};
const getIcon = (icon) => {
  if (Object.prototype.hasOwnProperty.call(ICONS, icon)) {
    return ICONS[icon];
  } else {
    return icon;
  }
};
const build = (options = {}) => {
  setOption(options);
  const template = getOption("template");
  append(document.body, template);
  const id = getOption("id");
  const xq_bs_modal = document.querySelector("#" + id);
  if (xq_bs_modal) {
    const xq_modal_dialog = xq_bs_modal.querySelector(".modal-dialog");
    const size = getOption("size");
    const position = getOption("position");
    xq_modal_dialog.classList.add(size);
    xq_modal_dialog.classList.add(position);
    const title_icon = xq_bs_modal.querySelector(".modal-title>i");
    const title_content = xq_bs_modal.querySelector(".modal-title>span");
    const body_content = xq_bs_modal.querySelector(".modal-body>p");
    if (title_icon) {
      const icon = getOption("icon");
      const iconClass = getIcon(icon);
      title_icon.className = iconClass;
    }
    if (title_content) {
      const title = getOption("title");
      title_content.innerHTML = title;
    }
    if (body_content) {
      const content = getOption("content");
      body_content.innerHTML = content;
    }
    if (typeof bootstrap !== void 0 && typeof bootstrap.Modal !== void 0) {
      const xqModal = new bootstrap.Modal(xq_bs_modal);
      const footer = document.querySelector(".modal-footer");
      if (footer) {
        const type = getOption("type");
        if (type !== "alert") {
          const cancelButtonClass = getOption("cancelButtonClass");
          const cancelButton = getOption("cancelButton");
          append(footer, '<button id="xq-bs-modal-cancel" type="button" class="btn ' + cancelButtonClass + '" data-bs-dismiss="modal">' + cancelButton + "</button>");
          const cancel = footer.querySelector("#xq-bs-modal-cancel");
          cancel?.addEventListener("click", (event) => {
            event.preventDefault();
            xqModal.hide();
            const cancel2 = getOption("cancel");
            if (cancel2 !== null) {
              cancel2();
            }
          });
        }
        const confirmButtonClass = getOption("confirmButtonClass");
        const confirmButton = getOption("confirmButton");
        append(footer, '<button id="xq-bs-modal-confirm" type="button" class="btn ' + confirmButtonClass + '">' + confirmButton + "</button>");
        const confirm = footer.querySelector("#xq-bs-modal-confirm");
        confirm?.addEventListener("click", (event) => {
          event.preventDefault();
          xqModal.hide();
          const confirm2 = getOption("confirm");
          if (confirm2 !== null) {
            confirm2();
          }
        });
      }
      xq_bs_modal.addEventListener("hidden.bs.modal", () => {
        xqModal.dispose();
        xq_bs_modal.remove();
      });
      const autoClose = getOption("autoClose");
      if (autoClose) {
        const close = autoClose;
        if (close.indexOf("|")) {
          const closeArr = close.split("|");
          const btn = closeArr[0];
          const timer = Number.parseInt(closeArr[1], 10);
          let autoCloseInterval;
          let autoCloseBtn;
          let seconds = Math.ceil(timer / 1e3);
          const countdown = '<span class="countdown"> (' + seconds + ")</span>";
          if (btn === "confirm") {
            autoCloseBtn = footer.querySelector("#xq-bs-modal-confirm");
            append(autoCloseBtn, countdown);
          } else {
            autoCloseBtn = footer.querySelector("#xq-bs-modal-cancel");
            append(autoCloseBtn, countdown);
          }
          xq_bs_modal.addEventListener("show.bs.modal", () => {
            autoCloseInterval = setInterval(function() {
              const countdown2 = autoCloseBtn.querySelector(".countdown");
              seconds = seconds - 1;
              countdown2.innerHTML = " (" + seconds + ") ";
              if (seconds <= 0) {
                clearInterval(autoCloseInterval);
                autoCloseBtn.click();
              }
            }, 1e3);
          });
        }
      }
      xqModal.show();
    } else {
      console.log("error", "the bootstrap not loaded!");
    }
  }
};

const xqConfirm = (options = {}) => {
  build(options);
};
window.xqConfirm = xqConfirm;

export { xqConfirm as default };
