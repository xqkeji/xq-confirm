const domReady = (callBack: () => void): void => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callBack)
    } else {
      callBack()
    }
}
const append = (element: Element, dom: string): void => {
    const node = document.createRange().createContextualFragment(dom) as Node
    element.append(node)
}

export {domReady,append}