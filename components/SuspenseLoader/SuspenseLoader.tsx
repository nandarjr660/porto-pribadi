const SuspenseLoader = (): React.JSX.Element => {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="animate-pulse text-text-primary/60 text-[14px] font-body">
        Loading...
      </div>
    </div>
  );
};

export default SuspenseLoader;
