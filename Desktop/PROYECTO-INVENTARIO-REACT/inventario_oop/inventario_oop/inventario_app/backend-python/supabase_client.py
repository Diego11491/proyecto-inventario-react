from supabase import create_client, Client

url = "https://gzwdnjmgcokkagxahazu.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6d2Ruam1nY29ra2FneGFoYXp1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDM5MDMyOSwiZXhwIjoyMDY1OTY2MzI5fQ.QdusUmT7oQvmbOZ-NU_gwdYUQaJCWmsntErvQQRKLIk"

supabase: Client = create_client(url, key)
