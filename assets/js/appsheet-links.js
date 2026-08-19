/**
 * appsheet-links.js
 * -----------------------------------------------------------------------
 * DAFTAR 26 LINK APPSHEET INVENTARISASI KENDARAAN — PER OPD.
 *
 * Ini satu-satunya berkas yang perlu Anda ubah untuk memperbarui daftar:
 *   - "opd"   : nama Perangkat Daerah (tampil di kartu)
 *   - "singkatan" : singkatan resmi (tampil sebagai label kecil)
 *   - "url"   : tautan aplikasi AppSheet OPD tersebut.
 *               Placeholder saat ini "#" — ganti dengan URL asli,
 *               format umumnya: https://www.appsheet.com/start/xxxxxxxx-xxxx-...
 *
 * Nama OPD di bawah ini adalah DRAF berdasarkan struktur umum Perangkat
 * Daerah Kota Mojokerto — mohon dicocokkan/disesuaikan dengan daftar resmi
 * dari Bagian Organisasi Setda sebelum dipublikasikan.
 * -----------------------------------------------------------------------
 */
const APPSHEET_LINKS = [
  { opd: "Sekretariat Daerah",                                             singkatan: "Setda",      url: "#" },
  { opd: "Sekretariat DPRD",                                               singkatan: "Setwan",     url: "#" },
  { opd: "Inspektorat",                                                    singkatan: "Itda",       url: "#" },
  { opd: "Badan Perencanaan Pembangunan, Penelitian dan Pengembangan Daerah", singkatan: "Bapperida", url: "#" },
  { opd: "Badan Pengelolaan Keuangan dan Pendapatan Daerah",               singkatan: "BPKPD",      url: "#" },
  { opd: "Badan Kepegawaian dan Pengembangan Sumber Daya Manusia",         singkatan: "BKPSDM",     url: "#" },
  { opd: "Badan Kesatuan Bangsa dan Politik",                              singkatan: "Bakesbangpol", url: "#" },
  { opd: "Badan Penanggulangan Bencana Daerah",                            singkatan: "BPBD",       url: "#" },
  { opd: "Dinas Pendidikan dan Kebudayaan",                                singkatan: "Dindikbud",  url: "#" },
  { opd: "Dinas Kesehatan, Pengendalian Penduduk dan KB",                  singkatan: "Dinkes PPKB", url: "#" },
  { opd: "Dinas Pekerjaan Umum, Penataan Ruang dan Permukiman",            singkatan: "DPUPR Perakim", url: "#" },
  { opd: "Dinas Perhubungan",                                              singkatan: "Dishub",     url: "#" },
  { opd: "Dinas Lingkungan Hidup",                                         singkatan: "DLH",        url: "#" },
  { opd: "Dinas Kependudukan dan Pencatatan Sipil",                        singkatan: "Dispendukcapil", url: "#" },
  { opd: "Dinas Sosial, Pemberdayaan Perempuan dan Perlindungan Anak",     singkatan: "Dinsos P3A", url: "https://www.appsheet.com/start/877e4c7b-a582-4491-80b6-5eadb50c4c4f" },
  { opd: "Dinas Koperasi, UKM, Perindustrian dan Perdagangan",             singkatan: "Diskoperindag", url: "#" },
  { opd: "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu",         singkatan: "DPMPTSP",    url: "#" },
  { opd: "Dinas Pemuda, Olahraga dan Pariwisata",                          singkatan: "Disporapar", url: "#" },
  { opd: "Dinas Perpustakaan dan Kearsipan",                               singkatan: "Dispersip",  url: "#" },
  { opd: "Dinas Ketahanan Pangan dan Pertanian",                           singkatan: "DKPP",       url: "#" },
  { opd: "Dinas Komunikasi dan Informatika",                               singkatan: "Diskominfo", url: "#" },
  { opd: "Satuan Polisi Pamong Praja dan Pemadam Kebakaran",               singkatan: "Satpol PP & Damkar", url: "#" },
  { opd: "Rumah Sakit Umum Daerah dr. Wahidin Sudiro Husodo",              singkatan: "RSUD WSH",   url: "#" },
  { opd: "Kecamatan Prajurit Kulon",                                      singkatan: "Kec. Prajurit Kulon", url: "#" },
  { opd: "Kecamatan Magersari",                                           singkatan: "Kec. Magersari", url: "#" },
  { opd: "Kecamatan Kranggan",                                            singkatan: "Kec. Kranggan", url: "#" },
];
