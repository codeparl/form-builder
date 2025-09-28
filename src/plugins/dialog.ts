// src/utils/dialog.ts
import { createVNode, render, h } from 'vue'
import Dialog from '@/components/Dialog.vue'

interface DialogOptions {
  title?: string
  content: string
  type?: string
  positiveText?: string
  negativeText?: string
  onPositiveClick?: () => void
  onNegativeClick?: () => void
}

function mountDialog(options: DialogOptions) {
  const container = document.createElement('div')
  document.body.appendChild(container)

  const vnode = createVNode(Dialog)
  render(vnode, container)

  // @ts-ignore
  vnode.component?.exposed?.showDialog(options)
}

export const dialog = {
  warning(options: DialogOptions) {
    mountDialog({
      ...options,
      type: 'warning',
      positiveText: options.positiveText || 'Yes, delete',
      negativeText: options.negativeText || 'Cancel',
    })
  },
  info(options: DialogOptions) {
    mountDialog({
      ...options,
      type: 'info',
      positiveText: options.positiveText || 'OK',
      negativeText: options.negativeText || '',
    })
  },
}
