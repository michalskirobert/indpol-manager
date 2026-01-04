import { ProductFormInput } from "./types";

const EXAMPLE_INGREDIENT_DETAILS_PL = `<h3>Schemat Składnik&oacute;w (Polski)</h3>
<ol>
<li><strong>Nazwa Składnika</strong>
<ul>
<li><strong>Ilość</strong>: (np. filiżanki, gramy, łyżki)</li>
<li><strong>Przygotowanie</strong>: (np. posiekane, pokrojone, całe)</li>
<li><strong>Uwagi</strong>: (np. opcjonalne, zamiennik, świeże vs. suszone)</li>
</ul>
</li>
</ol>
<h3>Przykład (Polski)</h3>
<ol>
<li>
<p><strong>Pomidory</strong></p>
<ul>
<li><strong>Ilość</strong>: 2 filiżanki, pokrojone</li>
<li><strong>Przygotowanie</strong>: Świeże</li>
<li><strong>Uwagi</strong>: Można zastąpić pomidorami z puszki.</li>
</ul>
</li>
<li>
<p><strong>Oliwa z Oliwek</strong></p>
<ul>
<li><strong>Ilość</strong>: 3 łyżki</li>
<li><strong>Przygotowanie</strong>: Extra virgin</li>
<li><strong>Uwagi</strong>: Używać do smażenia.</li>
</ul>
</li>
<li>
<p><strong>Czosnek</strong></p>
<ul>
<li><strong>Ilość</strong>: 4 ząbki, posiekane</li>
<li><strong>Przygotowanie</strong>: Świeży</li>
<li><strong>Uwagi</strong>: Dostosować według smaku.</li>
</ul>
</li>
<li>
<p><strong>Bazylia</strong></p>
<ul>
<li><strong>Ilość</strong>: 1/4 filiżanki, posiekana</li>
<li><strong>Przygotowanie</strong>: Świeża</li>
<li><strong>Uwagi</strong>: Suszona bazylia może być użyta, ale zmniejszyć ilość.</li>
</ul>
</li>
</ol>`;

const EXAMPLE_INGREDIENT_DETAILS_EN = `<h3>Sample Ingredients Schema</h3>
<ol>
<li><strong>Ingredient Name</strong>
<ul>
<li><strong>Quantity</strong>: (e.g., cups, grams, tablespoons)</li>
<li><strong>Preparation</strong>: (e.g., chopped, diced, whole)</li>
<li><strong>Notes</strong>: (e.g., optional, substitute, fresh vs. dried)</li>
</ul>
</li>
</ol>
<h3>Example</h3>
<ol>
<li>
<p><strong>Tomatoes</strong></p>
<ul>
<li><strong>Quantity</strong>: 2 cups, diced</li>
<li><strong>Preparation</strong>: Fresh</li>
<li><strong>Notes</strong>: Can substitute with canned tomatoes.</li>
</ul>
</li>
<li>
<p><strong>Olive Oil</strong></p>
<ul>
<li><strong>Quantity</strong>: 3 tablespoons</li>
<li><strong>Preparation</strong>: Extra virgin</li>
<li><strong>Notes</strong>: Use for saut&eacute;ing.</li>
</ul>
</li>
<li>
<p><strong>Garlic</strong></p>
<ul>
<li><strong>Quantity</strong>: 4 cloves, minced</li>
<li><strong>Preparation</strong>: Fresh</li>
<li><strong>Notes</strong>: Adjust based on taste.</li>
</ul>
</li>
<li>
<p><strong>Basil</strong></p>
<ul>
<li><strong>Quantity</strong>: 1/4 cup, chopped</li>
<li><strong>Preparation</strong>: Fresh</li>
<li><strong>Notes</strong>: Dried basil can be used, but reduce quantity.</li>
</ul>
</li>
</ol>`;

const EXAMPLE_INGREDIENT_DETAILS_ID = `<h3>Schema Bahan (Bahasa Indonesia)</h3>
<ol>
<li><strong>Nama Bahan</strong>
<ul>
<li><strong>Kuantitas</strong>: (misalnya, cangkir, gram, sendok)</li>
<li><strong>Persiapan</strong>: (misalnya, dicincang, dipotong, utuh)</li>
<li><strong>Catatan</strong>: (misalnya, opsional, pengganti, segar vs. kering)</li>
</ul>
</li>
</ol>
<h3>Contoh (Bahasa Indonesia)</h3>
<ol>
<li>
<p><strong>Tomat</strong></p>
<ul>
<li><strong>Kuantitas</strong>: 2 cangkir, dicincang</li>
<li><strong>Persiapan</strong>: Segar</li>
<li><strong>Catatan</strong>: Dapat diganti dengan tomat kalengan.</li>
</ul>
</li>
<li>
<p><strong>Minyak Zaitun</strong></p>
<ul>
<li><strong>Kuantitas</strong>: 3 sendok makan</li>
<li><strong>Persiapan</strong>: Ekstra virgin</li>
<li><strong>Catatan</strong>: Digunakan untuk menumis.</li>
</ul>
</li>
<li>
<p><strong>Bawang Putih</strong></p>
<ul>
<li><strong>Kuantitas</strong>: 4 siung, dicincang halus</li>
<li><strong>Persiapan</strong>: Segar</li>
<li><strong>Catatan</strong>: Sesuaikan berdasarkan selera.</li>
</ul>
</li>
<li>
<p><strong>Basil</strong></p>
<ul>
<li><strong>Kuantitas</strong>: 1/4 cangkir, dicincang</li>
<li><strong>Persiapan</strong>: Segar</li>
<li><strong>Catatan</strong>: Basil kering dapat digunakan, tetapi kurangi kuantitas.</li>
</ul>
</li>
</ol>`;

export const defaultValues: ProductFormInput = {
  brand: "",
  category: "",
  desc: { en: "", id: "", pl: "" },
  details: [
    {
      id: crypto.randomUUID(),
      title: { en: "Ingredients", pl: "Składniki", id: "Bahan" },
      detail: {
        en: EXAMPLE_INGREDIENT_DETAILS_EN,
        pl: EXAMPLE_INGREDIENT_DETAILS_PL,
        id: EXAMPLE_INGREDIENT_DETAILS_ID,
      },
    },
  ],
  images: [],
  name: "",
  price: 0,
  stockLimit: 0,
  discount: 0,
  variants: [],
};
