
-- Create the users table if it does not exist
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    google_id TEXT UNIQUE NOT NULL, -- Google OAuth ID
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    profile_picture TEXT,
    created_at TIMESTAMP DEFAULT now(), -- First login timestamp
    updated_at TIMESTAMP DEFAULT now(), -- Last login timestamp
    login_count INT DEFAULT 1, -- Number of logins
    last_ip TEXT -- Last known IP address
);

-- Ensure updated_at column updates automatically
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and re-create the trigger to ensure it exists
DROP TRIGGER IF EXISTS update_users_timestamp ON users;
CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Idempotent upsert function for user login tracking
CREATE OR REPLACE FUNCTION record_login(
    p_google_id TEXT,
    p_email TEXT,
    p_name TEXT,
    p_profile_picture TEXT,
    p_ip TEXT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO users (google_id, email, name, profile_picture, created_at, updated_at, login_count, last_ip)
    VALUES (p_google_id, p_email, p_name, p_profile_picture, now(), now(), 1, p_ip)
    ON CONFLICT (google_id) DO UPDATE 
    SET 
        name = EXCLUDED.name,
        profile_picture = EXCLUDED.profile_picture,
        updated_at = now(),
        last_ip = EXCLUDED.last_ip,
        login_count = users.login_count + 1;
END;
$$ LANGUAGE plpgsql;
