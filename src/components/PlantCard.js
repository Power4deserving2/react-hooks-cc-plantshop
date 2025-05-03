function PlantCard({ plant }) {
  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState(plant.price);

  function toggleStock() {
    setInStock(!inStock);
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  function updatePrice(e) {
    if (e.key === "Enter") {
      fetch(`http://localhost:6001/plants/${plant.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ price: parseFloat(price) })
      });
    }
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <input
        type="number"
        value={price}
        onChange={handlePriceChange}
        onKeyDown={updatePrice}
      />
      <button onClick={toggleStock}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

function PlantCard({ plant, onDelete }) {
  // ... existing code ...

  function handleDelete() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE"
    }).then(() => onDelete(plant.id));
  }

  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: ${plant.price}</p>
      <button onClick={toggleStock}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
      <button onClick={handleDelete} style={{ color: "red" }}>Delete</button>
    </li>
  );
}