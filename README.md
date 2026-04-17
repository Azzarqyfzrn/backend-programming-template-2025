## Author

Nama: Azzarqy Fizran M Nasrun
NIM: 535250161

# Backend Programming - Gacha System

## Base URL

```
http://localhost:5000/api
```

---

## Endpoint

### 1. Melakukan Undian (Draw)

**Endpoint:**

```

POST /draw

```

**Deskripsi:**
Digunakan untuk melakukan gacha/undian. Sistem akan:

- Mengecek limit 5x per hari per user
- Menentukan hasil menang/kalah secara acak
- Memberikan hadiah jika menang dan kuota masih tersedia
- Menyimpan histori percobaan ke database

**Request Body:**

```json
{
  "userId": 1
}
```

**Response (Menang):**

```json
{
  "message": "Selamat kamu menang!",
  "data": {
    "win": true,
    "prize": "Voucher Rp100.000"
  }
}
```

**Response (Tidak Menang):**

```json
{
  "message": "Belum beruntung",
  "data": {
    "win": false,
    "prize": null
  }
}
```

**Response (Limit Tercapai):**

```json
{
  "message": "Limit 5x per hari tercapai"
}
```

---

## Data Hadiah

Hadiah disimpan di database MongoDB dengan struktur:

```json
{
  "name": "Voucher Rp100.000",
  "quota": 100,
  "winners": 0
}
```

**Keterangan:**

- `quota` = jumlah maksimal pemenang
- `winners` = jumlah pemenang saat ini
- Hadiah hanya diberikan jika `winners < quota`

---

## ⚙️ Mekanisme Sistem

1. User mengirim request ke endpoint `/draw`
2. Sistem mengecek jumlah percobaan user hari ini
3. Jika belum mencapai 5 kali:

   - Sistem melakukan random (probabilitas menang)
   - Jika menang:

     - Sistem memilih hadiah yang masih tersedia
     - Menambahkan jumlah pemenang

4. Semua percobaan disimpan ke database

---

## 🗄️ Database

Menggunakan MongoDB dengan collection:

- `draws` → menyimpan histori percobaan user
- `prizes` → menyimpan daftar hadiah dan kuota

---

## Teknologi

- Node.js
- Express.js
- MongoDB
- Mongoose

---

## Fitur Utama

- Limit 5x percobaan per hari
- Sistem gacha (random win/lose)
- Validasi kuota hadiah
- Penyimpanan histori ke database

---
