import clsx from "clsx";

export function Button({ className, ...props }: any) {
  return (
    <div className="relative inline-flex group">
      <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt" />
      <button
        className={clsx(
          "relative inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm font-semibold outline-offset-2 transition active:transition-none",
          "bg-gray-900 text-white hover:bg-gray-800 active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900",
          "px-8 py-4 text-lg rounded-xl",
          className
        )}
        {...props}
      />
    </div>
  );
}
