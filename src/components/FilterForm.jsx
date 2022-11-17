export default function FilterForm({ searchTerm, setSearchTerm }) {
  return (
    <form className="filter" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Filmtitel</label>
      <input
        id="search"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
