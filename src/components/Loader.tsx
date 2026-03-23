export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-4">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium animate-pulse">Finding best mechanics near you...</p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card animate-pulse">
      <div className="flex gap-4">
        <div className="w-20 h-20 bg-gray-200 rounded-xl"></div>
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-8 bg-gray-200 rounded flex-1"></div>
        <div className="h-8 bg-gray-200 rounded flex-1"></div>
      </div>
    </div>
  );
}
