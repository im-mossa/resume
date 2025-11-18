// src/ui/components/search/SearchResultsHeader.tsx
export default function SearchResultsHeader({ query }: { query: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-xl font-bold">
        نتایج جستجو برای: <span className="text-blue-600">{query}</span>
      </h1>
    </div>
  );
}
