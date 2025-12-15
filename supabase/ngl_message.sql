-- Tabel untuk pesan
CREATE TABLE ngl_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  subject VARCHAR(100) DEFAULT 'Anonim',
  category VARCHAR(50) DEFAULT 'all',
  emoji VARCHAR(10),
  likes INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  ip_address VARCHAR(45),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabel untuk rate limiting
CREATE TABLE rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address VARCHAR(45) NOT NULL,
  action VARCHAR(50) NOT NULL, -- 'SUBMIT', 'SUBMIT_ATTEMPT'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX idx_ngl_messages_created_at ON ngl_messages(created_at DESC);
CREATE INDEX idx_ngl_messages_category ON ngl_messages(category);
CREATE INDEX idx_rate_limits_ip_action ON rate_limits(ip_address, action, created_at);

-- Enable RLS
ALTER TABLE ngl_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- Policy untuk read access (anon)
CREATE POLICY "Allow public read access to messages" ON ngl_messages
  FOR SELECT USING (is_approved = true);

-- Policy untuk rate_limits (hanya service role)
CREATE POLICY "Allow service role full access" ON rate_limits
  USING (auth.jwt() ->> 'role' = 'service_role');

INSERT INTO "public"."ngl_messages" ("id", "message", "subject", "category", "likes", "emoji", "created_at", "ip_address", "is_approved") VALUES ('232509d6-6f18-49ea-807d-46d5ad837a15', 'Senang pernah berbagi cerita dan membuat cerita bersama kalian! 
Semoga masa depan berpihak kepada kita, segala lelah sekarang akan berubah manis dimasa yang akan datang 
Waktu tak bisa di ulang tapi "kita" akan selalu terkenang 
Semangat semua!! 
Pejalanan panjang kita sudah dimulai!! 
Dimanapun garis finish kita, semoga hal hal baik selalu menyertai 🫂', 'Mimell imup lucu gemas', 'kenangan', '1', '😊', '2025-12-12 19:04:13.245343+00', null, 'true'), ('2f89eb3f-5e1f-44a5-975b-af239923c62a', 'Terima kasih sudah bertahan, bahkan ketika semuanya terasa berat. Dari kebingungan ngoding sampai begadang demi tugas, kita tetap jalan bareng. Semua tawa, panik, dan cerita di lab itu sekarang jadi kenangan berharga. Semoga apa yang sudah kita mulai di sana jadi pijakan buat masa depan yang lebih cerah.', 'Hai untuk kami dimasa lalu!!!', 'all', '2', '✨', '2025-12-12 14:12:33.570255+00', null, 'true'), ('4e40f1e4-7c2d-437b-95a3-5c49e0477f5e', 'kalo diungkapin disini ga cukup buat ekspresiin semuanya, intinya aku senang bisa 1 ruang sama org seseru kalian. sejauh apapun jalan hidup yg kita ambil, semoga nanti pas ngumpul lagi rasanya ttp sehangat kemarin ya? 

#angkatan2025🤙🏻🤙🏻', 'opung gacorr🤙🏻', 'semangat', '1', '💫', '2025-12-14 14:23:51.247924+00', null, 'true'), ('d21c788e-cc6c-4b17-8576-ec9beab39d5b', 'aku bersyukur karena pernah berbagi waktu dengan kalian. semoga kita semua selalu diberikan kesehatan, kebahagiaan, dan kesuksesan di masa depan aamiin.

nb:ecek" nya lagunya forever young ya we🙆🏻‍♀️', 'kakak deswita🧚‍♀️', 'harapan', '1', '🤝', '2025-12-14 14:00:36.232982+00', null, 'true');


-- Jalankan di SQL Editor Supabase
ALTER TABLE ngl_messages 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Buat trigger untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_ngl_messages_updated_at 
    BEFORE UPDATE ON ngl_messages
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();