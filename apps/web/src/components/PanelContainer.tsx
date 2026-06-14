interface PanelContainerProps {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}

export default function PanelContainer({ title, action, children }: PanelContainerProps) {
  return (
    <div className="bg-white rounded shadow-md mb-6 overflow-hidden">
      <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
        <span className="font-medium">{title}</span>
        {action && <div>{action}</div>}
      </div>
      <div className="px-4 py-3">{children || <p className="text-gray-400">No slot content defined</p>}</div>
    </div>
  )
}
