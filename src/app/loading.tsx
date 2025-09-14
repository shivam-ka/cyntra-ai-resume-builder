export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-row gap-2">
        <div className="h-4 w-4 animate-bounce rounded-full bg-accent-foreground"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-accent-foreground [animation-delay:-.3s]"></div>
        <div className="h-4 w-4 animate-bounce rounded-full bg-accent-foreground [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
}
