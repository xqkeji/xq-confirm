import { build } from "./xq-build";

const xqConfirm = (options = {}): void => {
    build(options)
}
// @ts-expect-error
window.xqConfirm=xqConfirm
export default xqConfirm
