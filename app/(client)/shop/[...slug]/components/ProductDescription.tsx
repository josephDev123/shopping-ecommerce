export default function ProductDescription({
  description,
}: {
  description: string;
}) {
  return (
    <section className="flex flex-col space-y-2">
      <p>{description}</p>
    </section>
  );
}
