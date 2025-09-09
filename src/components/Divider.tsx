export default function Divider({
  colorHex,
}: {
  colorHex: string | undefined;
}) {
  return (
    <hr
      style={{
        borderColor: colorHex,
      }}
      className="border border-neutral-700"
    />
  );
}
