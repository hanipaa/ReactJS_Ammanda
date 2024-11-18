import { useState, useEffect } from "react";
import getAllProducts from "../../services/getAllProducts";
import CardList from "../../components/CardList/CardList";
import Navbar from "../../components/Navbar/Navbar";
import RadioButton from "../../components/RadioButton/RadioButton";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Ambil data produk
  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
  }, []);

  const RadioButtonOpts = [
    { label: "All", value: "all" },
    { label: "Lightstick", value: "lightstick" },
    { label: "Album", value: "album" },
    { label: "Merchandise", value: "merchandise" },
  ];

  // Filter produk berdasarkan kategori dan pencarian
  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "all" || product.category.toLowerCase() === selectedCategory
    )
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter berdasarkan nama
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) // Filter berdasarkan kategori
    );

  return (
    <>
      <Navbar onSearch={setSearchQuery} /> {/* Kirim callback ke Navbar */}
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton
            options={RadioButtonOpts}
            defaultValue={"all"}
            onChange={(value) => setSelectedCategory(value)} // Perbarui kategori
          />
        </div>
      </div>
      <section className="container px-24 py-4">
        <main className="grid grid-cols-3 gap-5">
          <CardList products={filteredProducts} /> {/* Tampilkan produk yang sudah difilter */}
        </main>
      </section>
    </>
  );
}
