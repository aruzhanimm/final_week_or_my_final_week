CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  status TEXT NOT NULL DEFAULT 'created',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL
);

INSERT INTO users (username, password) VALUES ('demo', 'demo123') ON CONFLICT (username) DO NOTHING;
INSERT INTO products (name, price) VALUES ('Keyboard', 49.99), ('Mouse', 19.99), ('Monitor', 249.99) ON CONFLICT DO NOTHING;
INSERT INTO profiles (user_id, full_name, email) VALUES (1, 'Demo User', 'demo@example.com') ON CONFLICT (user_id) DO NOTHING;
