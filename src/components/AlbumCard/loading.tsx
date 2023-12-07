export function Loading() {
  return (
    <div className="h-96 flex flex-col items-center gap-10 bg-zinc-800 p-10 rounded-xl animate-pulse">
      <div className="w-52 h-52 bg-zinc-600 animate-pulse rounded-lg" />
      <div className="flex items-center justify-center mt-4 h-6 w-52 bg-zinc-600 animate-pulse rounded-lg" />
    </div>
  )
}
