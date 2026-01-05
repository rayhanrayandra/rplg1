create table public.ngl_messages (
  id uuid not null default gen_random_uuid (),
  message text not null,
  subject text null,
  category text null default 'all'::text,
  emoji text null,
  likes integer null default 0,
  is_approved boolean null default true,
  ip_address text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint ngl_messages_pkey primary key (id)
) TABLESPACE pg_default;

create table public.ngl_messages (
  id uuid not null default gen_random_uuid (),
  message text not null,
  subject text null,
  category text null default 'all'::text,
  emoji text null,
  likes integer null default 0,
  is_approved boolean null default true,
  ip_address text null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  constraint ngl_messages_pkey primary key (id)
) TABLESPACE pg_default;

INSERT INTO "public"."ngl_messages" ("id", "message", "subject", "category", "emoji", "likes", "is_approved", "ip_address", "created_at", "updated_at") VALUES ('232509d6-6f18-49ea-807d-46d5ad837a15', 'Senang pernah berbagi cerita dan membuat cerita bersama kalian!
Semoga masa depan berpihak kepada kita, segala lelah sekarang akan berubah manis dimasa yang akan datang
Waktu tak bisa di ulang tapi "kita" akan selalu terkenang
Semangat semua!!
Pejalanan panjang kita sudah dimulai!!
Dimanapun garis finish kita, semoga hal hal baik selalu menyertai 🫂', 'Mimell imup lucu gemas', 'kenangan', '😊', '6', 'true', null, '2025-12-12 19:04:13.245343+00', '2026-01-05 03:23:54.741919+00'), ('2f89eb3f-5e1f-44a5-975b-af239923c62a', 'Terima kasih sudah bertahan, bahkan ketika semuanya terasa berat. Dari kebingungan ngoding sampai begadang demi tugas, kita tetap jalan bareng. Semua tawa, panik, dan cerita di lab itu sekarang jadi kenangan berharga. Semoga apa yang sudah kita mulai di sana jadi pijakan buat masa depan yang lebih cerah.', 'Hai untuk kami dimasa lalu!!!', 'all', '✨', '7', 'true', null, '2025-12-12 14:12:33.570255+00', '2026-01-05 03:23:54.741919+00'), ('4e40f1e4-7c2d-437b-95a3-5c49e0477f5e', 'kalo diungkapin disini ga cukup buat ekspresiin semuanya, intinya aku senang bisa 1 ruang sama org seseru kalian. sejauh apapun jalan hidup yg kita ambil, semoga nanti pas ngumpul lagi rasanya ttp sehangat kemarin ya?

#angkatan2025🤙🏻🤙🏻', 'opung gacorr🤙🏻', 'semangat', '💫', '7', 'true', null, '2025-12-14 14:23:51.247924+00', '2026-01-05 03:23:54.741919+00'), ('629c5159-48ae-44a7-ac10-f1987b06997d', 'Terima kasih buat teman-teman sekelas yang sudah nemenin perjalanan ini. Walaupun aku lebih sering diam dan jadi pendengar, kebersamaan kalian selalu punya arti. Dari hari-hari yang melelahkan, momen panik, sampai tawa kecil yang tiba-tiba muncul—semuanya jadi kenangan yang berharga. Semoga apa yang sudah kita lewati bareng bisa jadi bekal buat langkah kita masing-masing ke depan.', 'Oom', 'terimakasih', '😅', '4', 'true', null, '2025-12-19 16:04:30.52931+00', '2026-01-05 03:23:54.741919+00'), ('d21c788e-cc6c-4b17-8576-ec9beab39d5b', 'aku bersyukur karena pernah berbagi waktu dengan kalian. semoga kita semua selalu diberikan kesehatan, kebahagiaan, dan kesuksesan di masa depan aamiin.

nb:ecek" nya lagunya forever young ya we🙆🏻‍♀️', 'kakak deswita🧚‍♀️', 'harapan', '🤝', '11', 'true', null, '2025-12-14 14:00:36.232982+00', '2026-01-05 03:23:54.741919+00');

