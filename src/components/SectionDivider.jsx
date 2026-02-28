export const SectionDivider = () => (
  <div className="relative py-8 flex items-center justify-center">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
    <div className="relative w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
  </div>
);
