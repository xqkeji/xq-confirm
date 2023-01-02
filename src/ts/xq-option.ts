const template=
'<div id="xq-bs-modal" class="modal" tabindex="-1" aria-hidden="true">'+
    '<div class="modal-dialog">'+
        '<div class="modal-content">'+
            '<div class="modal-header">'+
                '<h5 class="modal-title"><i></i><span>title</span></h5>'+
                '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
            '</div>'+
            '<div class="modal-body"><p>Modal content.</p></div>'+
            '<div class="modal-footer"></div>'+
        '</div>'+
    '</div>'+
'</div>'

const DEFAULT_OPTIONS = {
    id:'xq-bs-modal',
    type: 'alert',
    size: 'modal-sm',
    position: 'modal-dialog-centered',
    template: template,
    title: '提示信息',
    content: '您确认要进行操作吗?',
    icon: 'info',
    confirmButton: '确认',
    cancelButton: '取消',
    confirmButtonClass: 'btn-primary',
    cancelButtonClass: 'btn-secondary',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    confirm:()=> {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    cancel:()=> {},
    backgroundDismiss: true,
    autoClose: false// confirm|3000表示3秒后自动确认，cancel|3000表示3秒后自动取消
}
let confirmOptions={}
const setOption=(options={})=>{
    confirmOptions=Object.assign({}, DEFAULT_OPTIONS);
    if (options) {
        for (const option in options) {
            
            if(Object.prototype.hasOwnProperty.call(confirmOptions,option))
            {
                // @ts-ignore
                confirmOptions[option] = options[option]
            }
        }
    }
}

const getOption=(key:string):any=>{
    if (key in confirmOptions) {
        // @ts-ignore
        return confirmOptions[key]
    }
    // @ts-ignore
    const id=confirmOptions['id']
    const modal:any = document.querySelector('#'+id)
    if (modal.hasAttribute(key)) {
      return String(modal.getAttribute(key))
    }

    return ''
}

export {setOption,getOption}
