import { getOption,setOption } from "./xq-option"
import { append } from "xq-util"
const ICONS={
  info:'bi bi-info-circle-fill link-primary',
  warn:'bi bi-info-circle-fill link-warning',
  error:'bi bi-info-circle-fill link-danger'
}
const getIcon=(icon:string):string=>{
  
  if(Object.prototype.hasOwnProperty.call(ICONS,icon))
  {
    // @ts-ignore
    return ICONS[icon]
  }
  else
  {
    return icon
  }
}
const build= (options = {}) => {
    setOption(options)
    const template=getOption('template')
    append(document.body, template)
    const id=getOption('id')
    const xq_bs_modal = document.querySelector('#'+id)
    if (xq_bs_modal) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const xq_modal_dialog = xq_bs_modal.querySelector('.modal-dialog')!
      const size=getOption('size')
      const position=getOption('position')
      xq_modal_dialog.classList.add(size)
      xq_modal_dialog.classList.add(position)
      const title_icon = xq_bs_modal.querySelector('.modal-title>i')
      const title_content = xq_bs_modal.querySelector('.modal-title>span')
      const body_content = xq_bs_modal.querySelector('.modal-body>p') 
      if (title_icon) {
        const icon=getOption('icon')
        const iconClass=getIcon(icon)
        title_icon.className = iconClass
      }
  
      if (title_content) {
        const title=getOption('title')
        title_content.innerHTML = title
      }
  
      if (body_content) {
        const content=getOption('content')
        body_content.innerHTML = content
      }
      // @ts-expect-error
      if(typeof bootstrap!==undefined&& typeof bootstrap.Modal!==undefined)
      {
            // @ts-expect-error
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            const xqModal = new bootstrap.Modal(xq_bs_modal)
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const footer = document.querySelector('.modal-footer')!
            if (footer) {
                const type=getOption('type')
                if (type !== 'alert') {
                    const cancelButtonClass=getOption('cancelButtonClass')
                    const cancelButton=getOption('cancelButton')
                    append(footer, '<button id="xq-bs-modal-cancel" type="button" class="btn ' + cancelButtonClass + '" data-bs-dismiss="modal">' + cancelButton + '</button>')
                    const cancel = footer.querySelector('#xq-bs-modal-cancel')
                    cancel?.addEventListener('click', event => {
                        event.preventDefault()
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
                        xqModal.hide()
                        const cancel=getOption('cancel')
                        if (cancel !== null) {
                            cancel()
                        }
                    })
                }
                const confirmButtonClass=getOption('confirmButtonClass')
                const confirmButton=getOption('confirmButton')
                append(footer, '<button id="xq-bs-modal-confirm" type="button" class="btn ' + confirmButtonClass + '">' + confirmButton + '</button>')
                const confirm = footer.querySelector('#xq-bs-modal-confirm')
                confirm?.addEventListener('click', event => {
                    event.preventDefault()
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
                    xqModal.hide()
                    const confirm=getOption('confirm')
                    if (confirm !== null) {
                        confirm()
                    }
                })
            }
            xq_bs_modal.addEventListener('hidden.bs.modal', () => {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
              xqModal.dispose()
              xq_bs_modal.remove()
            })

            const autoClose=getOption('autoClose')
            if(autoClose)
            {
              const close=autoClose as string
              if(close.indexOf('|'))
              {
                const closeArr=close.split('|')
                const btn=closeArr[0]
                const timer=Number.parseInt(closeArr[1],10)
                let autoCloseInterval:any
                let autoCloseBtn:HTMLElement
                let seconds = Math.ceil(timer / 1000);
                const countdown='<span class="countdown"> ('+ seconds + ')</span>'
                if(btn==='confirm')
                {
                  autoCloseBtn= footer.querySelector('#xq-bs-modal-confirm') as HTMLElement
                  append(autoCloseBtn,countdown)
                }
                else
                {
                  autoCloseBtn= footer.querySelector('#xq-bs-modal-cancel') as HTMLElement
                  append(autoCloseBtn,countdown)
                }
                xq_bs_modal.addEventListener('show.bs.modal', () => {
                  autoCloseInterval = setInterval(function(){
                    const countdown:any=autoCloseBtn.querySelector('.countdown')
                    seconds=seconds-1
                    countdown.innerHTML=' (' + seconds + ') '
                    if(seconds<=0)
                    {
                      clearInterval(autoCloseInterval)
                      autoCloseBtn.click()
                    }
                  }, 1000);

                })
                
              }
              
            }
            xqModal.show()
        
            
      }
      else
      {
        console.log('error','the bootstrap not loaded!')
      }
    }
}
export {build}