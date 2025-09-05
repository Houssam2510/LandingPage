export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="inline-flex items-center gap-2">
      <img
        src="/logo.svg"
        width={size}
        height={size}
        alt="StudyLumina"
        className="select-none"
      />
      <span className="font-medium">StudyLumina</span>
    </div>
  );
}
