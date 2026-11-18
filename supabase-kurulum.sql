-- YENİ SUPABASE PROJESİ İÇİN: SQL Editor > Run (bir kez).
-- Bu proje HER OKULUN AYRI Supabase projesi kullanacağı varsayımıyla hazırlanmıştır.
-- Yönetim erişimi: Authentication > Users bölümünden eklediğiniz kullanıcılar.
create table public.site_settings (
 id integer primary key default 1 check (id = 1),
 school_name text not null default 'Okul Adı',
 exhibition_title text not null default 'Sanal Sergi',
 logo_path text
);
insert into public.site_settings(id, school_name, exhibition_title) values (1, 'Okul Adı', 'Sanal Sergi');

create table public.categories (
 id uuid primary key default gen_random_uuid(),
 name text not null check (length(trim(name)) between 1 and 100),
 quota integer not null default 10 check (quota between 1 and 200),
 sort integer not null default 1,
 color text not null default '#2f6fb3' check (color ~ '^#[0-9a-fA-F]{6}$')
);
create table public.photos (
 id uuid primary key default gen_random_uuid(),
 category uuid not null references public.categories(id) on delete restrict,
 slot integer not null check (slot >= 0),
 title text, descr text, path text not null,
 created_at timestamptz not null default now(),
 unique(category, slot)
);
create function public.check_sergi_slot() returns trigger language plpgsql set search_path = '' as $$
begin
 if new.slot >= (select quota from public.categories where id = new.category) then
  raise exception 'Fotoğraf konumu bölümün kapasitesini aşıyor';
 end if;
 return new;
end $$;
create trigger check_sergi_slot_trigger before insert or update on public.photos
 for each row execute function public.check_sergi_slot();

alter table public.site_settings enable row level security;
alter table public.categories enable row level security;
alter table public.photos enable row level security;
create policy "Sergi ayarlarını herkes okuyabilir" on public.site_settings for select to anon, authenticated using (true);
create policy "Sergi bölümlerini herkes okuyabilir" on public.categories for select to anon, authenticated using (true);
create policy "Sergi fotoğraflarını herkes okuyabilir" on public.photos for select to anon, authenticated using (true);
create policy "Yönetici ayarları değiştirir" on public.site_settings for update to authenticated using (true) with check (id = 1);
create policy "Yönetici bölümleri ekler" on public.categories for insert to authenticated with check (true);
create policy "Yönetici bölümleri düzenler" on public.categories for update to authenticated using (true) with check (true);
create policy "Yönetici bölümleri siler" on public.categories for delete to authenticated using (true);
create policy "Yönetici fotoğrafları ekler" on public.photos for insert to authenticated with check (true);
create policy "Yönetici fotoğrafları düzenler" on public.photos for update to authenticated using (true) with check (true);
create policy "Yönetici fotoğrafları siler" on public.photos for delete to authenticated using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
 values ('photos', 'photos', true, 10485760, array['image/jpeg']) on conflict (id) do nothing;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
 values ('branding', 'branding', true, 5242880, array['image/png', 'image/jpeg', 'image/webp']) on conflict (id) do nothing;
create policy "Herkes fotoğrafları görebilir" on storage.objects for select to anon,authenticated using (bucket_id = 'photos');
create policy "Yönetici fotoğraf yükler" on storage.objects for insert to authenticated with check (bucket_id = 'photos');
create policy "Yönetici fotoğraf siler" on storage.objects for delete to authenticated using (bucket_id = 'photos');
create policy "Herkes logoyu görebilir" on storage.objects for select to anon,authenticated using (bucket_id = 'branding');
create policy "Yönetici logo yükler" on storage.objects for insert to authenticated with check (bucket_id = 'branding');
create policy "Yönetici logo siler" on storage.objects for delete to authenticated using (bucket_id = 'branding');

-- Bilerek örnek bölüm eklenmedi. Okul kendi bölümlerini yönetim ekranından ekler.
