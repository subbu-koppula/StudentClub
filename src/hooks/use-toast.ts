type ToastVariant = "default" | "destructive"

interface ToastProps {
  title: string
  description: string
  variant?: ToastVariant
}

// Simple mock implementation
export function toast(props: ToastProps) {
  console.log(`Toast: ${props.title} - ${props.description}`)
  alert(`${props.title}\n${props.description}`)
  return { id: Date.now() }
}

function useToast() {
  return {
    toast,
  }
}

export { useToast }

