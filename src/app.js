document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Teh Herbal", img: "7.jpg", price: 30000 },
      { id: 2, name: "Teh Tubruk", img: "7.jpg", price: 20000 },
      { id: 3, name: "Teh Rempah", img: "7.jpg", price: 10000 },
      { id: 4, name: "Teh Hijau", img: "7.jpg", price: 35000 },
      { id: 5, name: "Teh Wangi", img: "7.jpg", price: 50000 },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      console.log(cartItem);
      // jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada, tambah quantity dan sub total
            item.quantity++;
            item.total = item.quantity * item.price;
            this.total += newItem.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      //   temukan id item berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      //   jika item quantity item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            // jika barang ditemukan, kurangi quantity dan sub total
            item.quantity--;
            item.total = item.quantity * item.price;
            this.total -= item.price;
            return item;
          }
        });
      } else {
        // jika sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
  });
});

// form validation
const form = document.querySelector("#checkout-form");
const checkoutButton = document.querySelector(".checkout-button");

// checkoutButton.classList.add("disabled");
// checkoutButton.disabled = true;

// console.log(form.elements);

// form.addEventListener("keyup", function () {
//   for (let i = 0; i < form.elements.length; i++) {
//     if (form.elements[i].value.length !== 0) {
//       checkoutButton.classList.remove("disabled");
//       checkoutButton.classList.add("disabled");
//     } else {
//       return false;
//     }
//     console.log(form.elements);
//   }
//   alert("oke");
//   checkoutButton.disabled = false;
//   checkoutButton.classList.remove("disabled");
// });

form.addEventListener("keyup", function () {
  let allFilled = true;
  let cekvalue;
  // Cek semua input kecuali hidden
  for (let i = 0; i < form.elements.length; i++) {
    let el = form.elements[i];

    if (el.type !== "hidden" && el.value.trim() === "") {
      allFilled = false;
      break;
    }
    console.log(el.value);
  }
  console.log(allFilled);
  // Atur tombol
  checkoutButton.disabled = !allFilled;

  if (allFilled) {
    checkoutButton.classList.remove("disabled");
  } else {
    checkoutButton.classList.add("disabled");
  }
});

// kirim data jika tombol checkout button d klik
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();

  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  const message = formatMessage(objData);
  // console.log(objData);
  // console.log(message);
  // alert("oke");

  // window.open("http://wa.me/6283835300189?text=" + encodeURIComponent(message));

  // minta transaction token menggunakan ajax atau fetch

  try {
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data,
    });

    const token = await response.text();
    // console.log(token);
    window.snap.pay(token);
  } catch (err) {
    console.log(err.message);
  }
});

// format pesan Whatsapp
const formatMessage = (obj) => {
  return `Data customer
  Nama : ${obj.name}
  Email : ${obj.email}
  No HP : ${obj.phone}
  Data pesanan :
  ${JSON.parse(obj.items).map(
    (item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n
  `
  )}
  Total : ${obj.total}
  Terima kasih.
  `;
};

// konversi ke rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
